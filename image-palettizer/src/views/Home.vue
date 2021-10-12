<template>
  <div class="home">
      <h1>Image Palettizer</h1>
      <DropZone filetype="image"/>
      <v-btn 
      @click="processImage"
      color='#bd93f9'
      large
      style="margin-top: 20px;"
      >Process</v-btn>
  </div>
</template>

<script>
import DropZone from '../components/DropZone.vue';
import { process } from "../palettizer";

export default {
  name: "Home",
  components: {DropZone},
  data: () => ({
  }),
  methods: {
    processImage(){
      process()
    }
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