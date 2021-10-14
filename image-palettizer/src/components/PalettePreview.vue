<template>
    <div>
        <v-col class="palette-preview">
            <v-row class="color-row" justify="space-around">
                <div 
                v-for="color in colors" :key="color"
                v-bind:style="styles[color]"
                ></div>
            </v-row>
        </v-col>
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
                if (i == 0){
                    style += "border-top-left-radius: 7px;"
                    style += "border-bottom-left-radius: 7px;"
                }
                else if (i == this.colors.length - 1){
                    style += "border-top-right-radius: 7px;"
                    style += "border-bottom-right-radius: 7px;"
                }
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
        height: 80px;
        margin-left: auto;
        margin-right: auto;
    }
    .color-row{
        height: 100%;
        border: solid 3px #6272a4;
        border-radius:  10px;
    }
</style>