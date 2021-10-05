<template>
  <div class="home">
    <h1>Image Palettizer</h1>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    name: "Home",
    components: {
        vueDropzone: vue2Dropzone
    },
    data: () => ({
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 700,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
        }
    }),
    methods: {},
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