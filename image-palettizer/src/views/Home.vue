<template>
  <div class="home">
      <h1>Image Palettizer</h1>
      <DropZone filetype="image"/>
      <ProgressBar/>
      <v-btn 
      @click="processImage"
      v-if="this.$store.state.status == 'Original'"
      color='#bd93f9'
      dark
      large
      rounded
      style="margin-top: 20px;"
      >
      Process
      </v-btn>
      <v-btn 
      @click="downloadImage"
      v-if="this.$store.state.status == 'Done!'"
      color='#bd93f9'
      dark
      large
      rounded
      style="margin-top: 20px;"
      >
      Download
      </v-btn>
  </div>
</template>

<script>
import DropZone from '../components/DropZone.vue';
import ProgressBar from '../components/ProgressBar.vue'
import { process } from "../palettizer";

export default {
  name: "Home",
  components: { DropZone, ProgressBar },
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
  },
}
</script>

<style>
    .home {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #282a36;
        color: #f8f8f2;
    }
    .home h1 {
        font-size: 40px;
        margin-bottom: 32px;
    }
</style> 