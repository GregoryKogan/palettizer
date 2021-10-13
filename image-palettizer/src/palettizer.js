import store from './store'
import palettesData from './palettes.json'
import * as StackBlur from 'stackblur-canvas';


function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
     ] : null;
}


class Palettizer{
    constructor(){
        this.canvas = null
        this.ctx = null

        this.orginalImgString = null

        this.currentImage = null
        this.currentPixels = null
        this.originalPixels = null

        this.palette = null
        this.colors = null
        this.brightnessTweak = true
        this.brightnessSteps = false
        this.quadraticColorDist = false
        this.blur = true
        this.blurRadius = 3
    }

    updateProgress(progress, status){
        store.commit('setProgress', progress)
        store.commit('setStatus', status)
    }

    loadSettings(){
        this.orginalImgString = store.state.inputImage

        this.palette = store.state.palettes[store.state.palette]
        this.brightnessTweak = store.state.brightnessTweak
        this.brightnessSteps = store.state.brightnessSteps
        this.quadraticColorDist = store.state.quadraticColorDist
        this.blur = store.state.blur
        this.blurRadius = store.state.blurRadius

        this.colors = []
        for (let i = 0; i < this.palette.length; ++i){
            this.colors.push(hexToRgb(this.palette[i]));
        }
    }

    loadCanvas(){
        this.canvas = document.getElementById('main-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.currentImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height) 
        this.currentPixels = this.currentImage.data
    }

    getColor(sr, sg, sb){
        const colorDiffs = []
        for (let i = 0; i < this.colors.length; ++i){
            const dr = this.colors[i][0] 
            const dg = this.colors[i][1] 
            const db = this.colors[i][2]
            
            let distance = 0
            if (this.quadraticColorDist)
                distance = Math.pow(Math.abs(sr - dr), 2) + Math.pow(Math.abs(sg - dg), 2) + Math.pow(Math.abs(sb - db), 2)
            else
                distance = Math.abs(sr - dr) + Math.abs(sg - dg) + Math.abs(sb - db) 
            colorDiffs.push([distance, [dr, dg, db]])
        }
        const fitColor = colorDiffs.reduce((prev, current) => (prev[0] < current[0]) ? prev : current)[1]
        return fitColor
    }

    matchColors(){
        this.originalPixels = []
        for (let i = 0; i < this.currentPixels.length; i += 4){
            this.originalPixels.push(this.currentPixels[i])
            this.originalPixels.push(this.currentPixels[i + 1])
            this.originalPixels.push(this.currentPixels[i + 2])
            this.originalPixels.push(this.currentPixels[i + 3])

            const color = this.getColor(
                this.currentPixels[i],
                this.currentPixels[i + 1],
                this.currentPixels[i + 2],
            )
            this.currentPixels[i] = color[0]
            this.currentPixels[i + 1] = color[1]
            this.currentPixels[i + 2] = color[2]
        }
        this.ctx.putImageData(this.currentImage, 0, 0)
    }

    matchStepColors(step, stepsNum){
        const boundaries = this.countBoundariesForStep(step, stepsNum)
        const start = boundaries[0]
        const end = boundaries[1]
        if (step == 0)
            this.originalPixels = []
        for (let i = start; i < end; i += 4){
            this.originalPixels.push(this.currentPixels[i])
            this.originalPixels.push(this.currentPixels[i + 1])
            this.originalPixels.push(this.currentPixels[i + 2])
            this.originalPixels.push(this.currentPixels[i + 3])

            const color = this.getColor(
                this.currentPixels[i],
                this.currentPixels[i + 1],
                this.currentPixels[i + 2],
            )
            this.currentPixels[i] = color[0]
            this.currentPixels[i + 1] = color[1]
            this.currentPixels[i + 2] = color[2]
        }
        this.ctx.putImageData(this.currentImage, 0, 0)
    }

    getBrightness(r, g, b){
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    tweakPixelBrightness(sColor, rColor){
        const sBrightness = this.getBrightness(sColor[0], sColor[1], sColor[2])
        const rBrightness = Math.max(0.0001, this.getBrightness(rColor[0], rColor[1], rColor[2]))

        let factor = sBrightness / rBrightness
        if (this.brightnessSteps)
            factor = Math.round(factor, 1)
        let rr = rColor[0]
        let rg = rColor[1]
        let rb = rColor[2]
        rr = Math.round(rr * factor)
        rg = Math.round(rg * factor)
        rb = Math.round(rb * factor)
        rr = Math.min(255, (Math.max(0, rr)))
        rg = Math.min(255, (Math.max(0, rg)))
        rb = Math.min(255, (Math.max(0, rb)))
        return [rr, rg, rb]
    }

    tweakImageBrightness(){
        for (let i = 0; i < this.currentPixels.length; i += 4){
            const sColor = [
                this.originalPixels[i],
                this.originalPixels[i + 1],
                this.originalPixels[i + 2],
            ]
            const fColor = [
                this.currentPixels[i],
                this.currentPixels[i + 1],
                this.currentPixels[i + 2],
            ]
            const resColor = this.tweakPixelBrightness(sColor, fColor)
            this.currentPixels[i] = resColor[0]
            this.currentPixels[i + 1] = resColor[1]
            this.currentPixels[i + 2] = resColor[2]
        }
        this.ctx.putImageData(this.currentImage, 0, 0)
    }

    tweakImageStepBrightness(step, stepsNum){
        const boundaries = this.countBoundariesForStep(step, stepsNum)
        const start = boundaries[0]
        const end = boundaries[1]
        for (let i = start; i < end; i += 4){
            const sColor = [
                this.originalPixels[i],
                this.originalPixels[i + 1],
                this.originalPixels[i + 2],
            ]
            const fColor = [
                this.currentPixels[i],
                this.currentPixels[i + 1],
                this.currentPixels[i + 2],
            ]
            const resColor = this.tweakPixelBrightness(sColor, fColor)
            this.currentPixels[i] = resColor[0]
            this.currentPixels[i + 1] = resColor[1]
            this.currentPixels[i + 2] = resColor[2]
        }
        this.ctx.putImageData(this.currentImage, 0, 0)
    }

    applyBlur(){
        StackBlur.canvasRGBA(this.canvas, 0, 0, this.canvas.width, this.canvas.height, this.blurRadius)
        this.currentImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height) 
        this.currentPixels = this.currentImage.data
    }

    countBoundariesForStep(step, stepsNum){
        const pixelsPerStep = Math.ceil((this.currentPixels.length / 4) / stepsNum) * 4
        const start = pixelsPerStep * step
        const end = Math.min(start + pixelsPerStep, this.currentPixels.length)
        return [start, end]
    }
}

const palettizer = new Palettizer()
const delta = 200
const stepDelta = 1
const processingSteps = 100
let currentStep = 0


function loadEverything(){
    palettizer.loadSettings()
    palettizer.loadCanvas()
    palettizer.updateProgress(10, 'Matching colors')
    currentStep = 0
    setTimeout(startColorMatching, delta)
}

function startColorMatching(){
    if (currentStep < processingSteps){
        palettizer.matchStepColors(currentStep, processingSteps)
        currentStep++
        palettizer.updateProgress(10 + (currentStep / processingSteps) * 50, 'Matching colors')
        setTimeout(startColorMatching, stepDelta)
    }
    else{
        currentStep = 0
        if (palettizer.blur){
            palettizer.updateProgress(60, 'Blurring')
            setTimeout(startBlurring, delta)
        }
        else{
            palettizer.updateProgress(65, 'Tweaking brightness')
            setTimeout(startBrightnessTweaking, delta)
        }
    }
}

function startBlurring(){
    if (palettizer.blur){
        palettizer.applyBlur()
    }
    if (palettizer.brightnessTweak){
        palettizer.updateProgress(65, 'Tweaking brightness')
        setTimeout(startBrightnessTweaking, Math.min(delta, 500))
    }
    else{
        palettizer.updateProgress(100, 'Done!')
    }
}

function startBrightnessTweaking(){
    if (palettizer.brightnessTweak){
        if (currentStep < processingSteps){
            palettizer.tweakImageStepBrightness(currentStep, processingSteps)
            currentStep++
            palettizer.updateProgress(65 + (currentStep / processingSteps) * 35, 'Tweaking brightness')
            setTimeout(startBrightnessTweaking, stepDelta)
        }
        else{
            palettizer.updateProgress(100, 'Done!')
        }
    }
}    

function start(){
    palettizer.updateProgress(0, 'Loading environment')
    setTimeout(loadEverything, Math.min(delta, 500))
}

export async function process(){
    start()
}

export function loadPalettes(){
    store.commit('setPalettes', palettesData['palettes'])
    store.commit('setPalette', Object.keys(store.state.palettes)[0])
}
