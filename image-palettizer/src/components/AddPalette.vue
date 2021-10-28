<template>
    <div class="add-palette">
        <h2>Add palette</h2>
        <v-color-picker
        dark
        mode='hexa'
        class="selection picker"
        :width="pickerWidth"
        hide-mode-switch
        v-model="pickedColor"
        ></v-color-picker>
        <v-row style="margin-top: 15px;">
            <v-spacer v-if="this.selectedColors.length < 50"></v-spacer>
            <v-btn 
            v-if="this.selectedColors.length < 50"
            @click="addColor"
            color='#8be9fd'
            light
            rounded
            style="width: 120px;"
            >
                Add color
            </v-btn>
            <v-spacer v-if="this.selectedColors.length > 0"></v-spacer>
            <v-btn 
            v-if="this.selectedColors.length > 0"
            @click="clearPalette"
            color='#ffb86c'
            light
            rounded
            style="width: 120px;"

            >
                Clear
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
        <v-text-field
        v-model="paletteName"
        style="margin-top: 30px;"
        label="Palette name"
        maxlength="25"
        color="pink"
        ></v-text-field>
        <PalettePreview 
        :colors="this.selectedColors"
        />
        <v-row style='margin-top: 5px'>
            <v-spacer></v-spacer>
            <v-btn 
            v-if="this.selectedColors.length > 0"
            @click="addPalette"
            color='#50fa7b'
            light
            large
            rounded
            style="width: 120px;"

            >
                Add palette
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>

<script>
import PalettePreview from './PalettePreview.vue'

export default {
    name: 'AddPalette',
    components: { PalettePreview },
    data: () => ({
        pickedColor: '#bd93f9',
        pickerWidth: 0,
        selectedColors: [],
        paletteName: "MyNewPalette",
    }),
    created(){
        this.paletteName = "MyPalette-" + (Object.keys(this.$store.state.palettes).length + 1)

        if (window.innerWidth * 0.45 > 500)
            this.pickerWidth = window.innerWidth * 0.45
        else
            this.pickerWidth = window.innerWidth * 0.9
    },
    methods: {
        addColor(){
            if (!this.selectedColors.includes(this.pickedColor))
                this.selectedColors.push(this.pickedColor)
        },
        clearPalette(){
            this.selectedColors = []
        },
        addPalette(){
            this.$store.commit('addPalette', {name: this.paletteName, colors: this.selectedColors})
            this.paletteName = "MyPalette-" + (Object.keys(this.$store.state.palettes).length + 1)
            this.selectedColors = []
        }
    }
}
</script>

<style>
    .add-palette{
        width: 90%;
    }
    .add-palette h2{
        margin-bottom: 10px;
        margin-top: 20px;
    }
    .add-palette .picker{
        margin: auto;
        border-radius: 10px;
    }
</style>