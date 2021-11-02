import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputImageFile: null,
    inputImage: null,

    palette: null,
    brightnessTweak: true,
    brightnessSteps: false,
    quadraticColorDist: false,
    blur: true,
    blurRadius: 3,

    palettes: {},
    modifications: 0,

    progress: 0,
    status: 'Empty',

    cookieGranted: false,
    cookieGotResponse: false,
  },
  mutations: {
    setInputImageFile(state, file){
      state.inputImageFile = file
    },
    setInputImage(state, image){
      state.inputImage = image
    },
    setPalettes(state, palettes){
      state.palettes = palettes
      state.modifications += 1

      if (state.cookieGranted){
        Cookies.set('userPalettes', JSON.stringify(state.palettes), { expires: 365, SameSite: 'Strict' })
      }
    },
    setPalette(state, palette){
      state.palette = palette
    },
    setProgress(state, value){
      state.progress = value
    },
    setStatus(state, status){
      state.status = status
    },
    setBrightnessTweak(state, value){
      state.brightnessTweak = value
    },
    setBrightnessSteps(state, value){
      state.brightnessSteps = value
    },
    setQuadraticColorDist(state, value){
      state.quadraticColorDist = value
    },
    setBlur(state, value){
      state.blur = value
    },
    setBlurRadius(state, value){
      state.blurRadius = value
    },
    addPalette(state, palette){
      if (!(palette.name in state.palettes) && Object.keys(state.palettes).length < 100){
        state.palettes[palette.name] = palette.colors
        state.modifications += 1

        if (state.cookieGranted){
          Cookies.set('userPalettes', JSON.stringify(state.palettes), { expires: 365, SameSite: 'Strict' })
        }
      }
    },
    setCookieGranted(state, value){
      state.cookieGranted = value
    },
    setCookieGotResponse(state, value){
      state.cookieGotResponse = value
    },
  },
  actions: {
      updateInputImage(context, file){
        context.commit('setInputImageFile', file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          context.commit('setInputImage', reader.result)
        };
        reader.onerror = function (error) {
          console.alert('Error: ', error);
        };
      }
  },
  getters: {
  },
  modules: {
  },
})
