import Vue from 'vue'
import Vuex from 'vuex'

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

    palettes: [],

    progress: 0,
    status: 'Empty',
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
          console.log('Error: ', error);
        };
      }
  },
  getters: {
  },
  modules: {
  },
})
