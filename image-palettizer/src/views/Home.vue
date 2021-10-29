<template>
  <div class="home">
      <h1>Palettizer</h1>
      <PatreonButton style="margin-bottom: 20px;"/>
      <DropZone filetype="image"/>
      <ProgressBar/>
      <v-btn 
      @click="processImage"
      v-if="this.$store.state.status == 'Original'"
      color='#50fa7b'
      light
      large
      rounded
      style="margin-top: 20px;"
      >
        Process
      </v-btn>
      <v-row v-if="this.$store.state.status == 'Done!'" style="margin-top: 20px; width: 90vw;">
        <v-spacer></v-spacer>
        <v-btn 
        @click="downloadImage"
        color='#8be9fd'
        light
        large
        rounded
        style="width: 120px;"
        >
          Download
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn 
        @click="undoPalettizing"
        color='#ffb86c'
        light
        large
        rounded
        style="width: 120px;"

        >
          Undo
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
      <Settings />
  </div>
</template>

<script>
import DropZone from '../components/DropZone.vue';
import ProgressBar from '../components/ProgressBar.vue'
import Settings from '../components/Settings.vue'
import PatreonButton from '../components/PatreonButton.vue'
import { process } from "../palettizer";

export default {
  name: "Home",
  components: { DropZone, ProgressBar, Settings, PatreonButton },
  data: () => ({
  }),
  methods: {
    processImage(){
      process()
    },
    downloadImage(){
      const filename = this.$store.state.inputImageFile['name']
      const filetype = this.$store.state.inputImageFile['type']
      const usedPalette = this.$store.state.palette
      const canvas = document.getElementById("main-canvas")
      const img = canvas.toDataURL(filetype)
      let a = document.createElement('a')
      a.href = img
      a.download = usedPalette + '-' + filename
      a.style.display = 'none'
      a.click()
      a.remove()
    },
    undoPalettizing(){
      this.$store.commit('setStatus', 'Original')
      const canvas = document.getElementById('main-canvas')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const loadedImage = new Image()
      loadedImage.src = this.$store.state.inputImage
      loadedImage.addEventListener('load', function(){
          ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height)
      })
    },
  }
}
</script>

<style>
    .home {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #282a36;
        color: #f8f8f2;
    }
    .home h1 {
        font-size: 40px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style> 