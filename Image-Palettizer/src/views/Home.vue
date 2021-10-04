<template>
    <v-app>
        <v-main>
            <div class="home">
                <h1>Image Palettizer</h1>
                <DropZone v-if="!dropzoneFile" @drop.prevent="drop" @change="selectedFile"/>
                <img v-if="imgSource" :src="imgSource">
                <span v-if="dropzoneFile" class="file-info">File: {{dropzoneFile.name}}</span>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import DropZone from '../components/DropZone.vue';

export default {
    name: "Home",
    components: { DropZone, },
    data () {
        return {
            dropzoneFile: null,
            imgSource: null,
        }
    },
    methods: {
        drop(e){
            this.dropzoneFile = e.dataTransfer.files[0]
            this.getImgSource()
        },
        selectedFile() {
            this.dropzoneFile = document.querySelector(".dropzoneFile").files[0]
            this.getImgSource()
        },
        getImgSource(){
            this.imgSource = URL.createObjectURL(this.dropzoneFile)
        }
    }
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

    .home .file-info {
        margin-top: 32px;
    }
</style>