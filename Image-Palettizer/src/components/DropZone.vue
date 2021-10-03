<template>
    <div 
    @dragenter.prevent="toggleActive" 
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    :class="{ 'active-dropzone': active }"
    class="dropzone">
        <span>Drag and Drop File</span>
        <span>OR</span>
        <label for="dropzoneFile">Select File</label>
        <input type="file" id="dropzoneFile" class="dropzoneFile">
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "DropZone",
    setup(){
        const active = ref(false);

        const toggleActive = () => {
            active.value = !active.value;
        }

        return { active, toggleActive };
    }
}
</script>

<style>
    .dropzone {
        width: 40%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 16px;
        border: 2px dashed #bd93f9;
        background-color: #44475a;
        color: #f8f8f2;
        transition: .3 ease all;
        border-radius: 10px;
    }

    .dropzone label {
        padding: 8px 12px;
        color: #f8f8f2;
        background-color: #bd93f9;
        transition: 0.3 ease all;
        border-radius: 10px;
    }

    .dropzone input {
        display: none;
    }

    .active-dropzone {
        background-color: #bd93f9;
        border-color: #44475a;
        color: #44475a;
    }

    .active-dropzone label {
        background-color: #44475a;
        color: #f8f8f2;
    }
</style>