<template>
    <div>
        <div
        class="drop-zone"
        @dragenter.prevent="toggleActive" 
        @dragleave.prevent="toggleActive"
        @dragover.prevent
        @drop.prevent="onFileDrop"
        @click="selectFile"
        :class="{ 'active-dropzone': active }"
        >
            <h2 v-if="!$store.state.inputImageFile">Drop Image here</h2>
            <canvas v-else id="main-canvas">Your browser does not support Canvas.</canvas>
        </div>
        <input 
        type="file"  
        id="file-selector" 
        @change="onFileSelect"
        style="display: none"
        >
    </div>
</template>

<script>
export default {
    name: "DropZone",
    props: ["filetype"],
    data: () => ({
        file: null,
        active: false,
    }),
    computed: {
        image(){
            return this.$store.state.inputImage
        },
    },
    watch: {
        image: function(val){
            this.$store.commit('setStatus', 'Original')
            const canvas = document.getElementById('main-canvas')
            const ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const loadedImage = new Image()
            loadedImage.src = val
            loadedImage.addEventListener('load', function(){
                canvas.width = loadedImage.width
                canvas.height = loadedImage.height
                const ratio = canvas.width / canvas.height
                if (ratio > 16 / 9){
                    canvas.style.width = '100%'
                    canvas.style.height = 'auto'
                }
                else{
                    canvas.style.width = 'auto'
                    canvas.style.height = '100%'
                }
                ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height)
            })
        }
    },
    methods: {
        toggleActive(){
            this.active = !this.active
        },
        selectFile(){
            document.getElementById('file-selector').click()
        },
        onFileSelect(e){
            const data = e.target.files[0]
            if (data['type'].startsWith(this.filetype))
                this.file = data
            this.$store.dispatch('updateInputImage', this.file)
        },
        onFileDrop(e){
            const data = e.dataTransfer.files[0]
            if (data['type'].startsWith(this.filetype))
                this.file = data
            this.$store.dispatch('updateInputImage', this.file)
            this.toggleActive()
        },
    },
}
</script>

<style>
    .drop-zone {
        width: max(350px, min(90vw, 800px));
        height: calc(max(350px, min(90vw, 800px)) / 16 * 9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 16px;
        border: 4px dashed #bd93f9;
        background-color: #44475a;
        transition: .3 ease all;
        color: #6272a4;
        border-radius: 10px;
    }
    .drop-zone label {
        padding: 8px 12px;
        color: #f8f8f2;
        background-color: #bd93f9;
        transition: 0.3 ease all;
        border-radius: 10px;
    }
    .drop-zone .thubnail{
        width: 100%;
        height: 100%;
    }
    .active-dropzone {
        background-color: #bd93f9;
        border: 4px solid #44475a;
        color: #44475a;
    }
    .active-dropzone label {
        background-color: #44475a;
        color: #f8f8f2;
    }
</style>