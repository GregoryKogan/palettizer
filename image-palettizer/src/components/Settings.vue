<template>
    <div class="settings">
        <PaletteSelect />
    </div>
</template>

<script>
import PaletteSelect from './PaletteSelect.vue'

export default {
    name: "Settings",
    components: { PaletteSelect },
    data: () => ({
    }),
    methods: {},
    created(){
        console.log(this.$store.palettes)
    }
}
</script>

<style>
    .settings {
        margin-top: 20px;
        width: 90vw;
    }
</style>