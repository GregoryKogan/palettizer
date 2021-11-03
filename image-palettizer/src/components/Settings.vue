<template>
    <div class="settings">
        <v-col>
            <PaletteSelect />
            <v-col>
                <v-row>
                    <v-switch
                    v-model="brightnessTweakVal"
                    @change="switchBrightnessTweak"
                    color="#50fa7b"
                    dark
                    inset
                    ></v-switch>
                    <span class="switch-label">Brightness tweaking</span>
                </v-row>
                <v-row>
                    <v-switch
                    :disabled="!brightnessTweakVal"
                    v-model="brightnessStepsVal"
                    @change="switchBrightnessSteps"
                    color="#50fa7b"
                    dark
                    inset
                    ></v-switch>
                    <span class="switch-label">Brightness steps</span>
                </v-row>
                <v-row>
                    <v-switch
                    v-model="quadraticColorDistVal"
                    @change="switchQuadraticColorDist"
                    color="#50fa7b"
                    dark
                    inset
                    ></v-switch>
                    <span class="switch-label">Quadratic color distance</span>
                </v-row>
                <v-row>
                    <v-switch
                    v-model="blurVal"
                    @change="switchBlur"
                    color="#50fa7b"
                    dark
                    inset
                    ></v-switch>
                    <span class="switch-label">Blur</span>
                </v-row>
                <v-row>
                    <span  v-if="blurVal" class="mr-5" style="font-size: large;">
                        Blur radius: {{blurRadiusVal}} pixels
                    </span>
                    <span  v-else class="mr-5" style="font-size: large;">
                        Blur won't be applied
                    </span>
                    <v-slider
                    v-model="blurRadiusVal"
                    @change="changeBlurRadius"
                    :disabled="!blurVal"
                    min="1"
                    max="60"
                    color="#50fa7b"
                    track-color="#6272a4"
                    ticks
                    dark
                    height="30"
                    style="width: 50vw;"
                    ></v-slider>
                </v-row>
            </v-col>
        </v-col>
    </div>
</template>

<script>
import PaletteSelect from './PaletteSelect.vue'

export default {
    name: "Settings",
    components: { PaletteSelect },
    data: () => ({
        brightnessTweakVal: null,
        brightnessStepsVal: null,
        quadraticColorDistVal: null,
        blurVal: null,
        blurRadiusVal: null,
    }),
    created(){
        this.brightnessTweakVal = this.$store.state.brightnessTweak;
        this.brightnessStepsVal = this.$store.state.brightnessSteps;
        this.quadraticColorDistVal = this.$store.state.quadraticColorDist;
        this.blurVal = this.$store.state.blur;
        this.blurRadiusVal = this.$store.state.blurRadius;
    },
    methods: {
        switchBrightnessTweak(val){
            if (!val)
                this.brightnessStepsVal = false
            this.$store.commit('setBrightnessTweak', val)
        },
        switchBrightnessSteps(val){
            this.$store.commit('setBrightnessSteps', val)
        },
        switchQuadraticColorDist(val){
            this.$store.commit('setQuadraticColorDist', val)
        },
        switchBlur(val){
            this.$store.commit('setBlur', val)
        },
        changeBlurRadius(val){
            this.$store.commit('setBlurRadius', val)
        }
    },
}
</script>

<style>
    .settings {
        margin-top: 20px;
        width: 90vw;
    }
    .settings .switch-label{
        margin-top: auto; 
        margin-bottom: auto;
        font-size: large;
        color: #f8f8f2;
    }
</style>