<template>
    <div class="home">
        <h1>Image Palettizer</h1>
        <DropZone v-if="!dropzoneFile" @drop.prevent="drop" @change="selectedFile"/>
        <span class="file-info">File: {{dropzoneFile.name}}</span>
    </div>
</template>

<script>
import DropZone from '../components/DropZone.vue';
import { ref } from 'vue';

export default {
    name: "Home",
    components: {
        DropZone,
    },
    setup(){
        let dropzoneFile = ref("");

        const drop = (event) => {
            dropzoneFile.value = event.dataTransfer.files[0]
        }

        const selectedFile = () => {
            dropzoneFile.value = document.querySelector(".dropzoneFile").files[0]
        }

        return { dropzoneFile, drop, selectedFile };
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

    .home .file-info {
        margin-top: 32px;
    }
</style>