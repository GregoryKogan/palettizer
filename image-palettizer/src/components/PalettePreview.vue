<template>
    <div class="palette-preview">
        <v-row class="color-row" justify="space-around">
            <div 
            v-for="color in colors" :key="color"
            v-bind:style="styles[color]"
            ></div>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "PalettePreview",
    props: ["colors"],
    data: () => ({
        styles: {},
    }),
    methods: {
        updateStyles(){
            for (let i = 0; i < this.colors.length; ++i){
                let style = ""
                style += "background-color: " + this.colors[i] + ";"
                style += "width: " + 100 / this.colors.length + "%;"
                this.styles[this.colors[i]] = style
            }
        },
    },
    created(){
        this.updateStyles()
    },
    watch: {
        colors: function(){
            this.updateStyles()
        }
    }
}
</script>

<style>
    .palette-preview{
        height: 70px;
    }
    .color-row{
        height: 100%;
        border: solid 2px #6272a4;
    }
</style>