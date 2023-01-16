<template>
  <div class="palettes">
    <AddPalette />
    <BlockSpacer type="tdl-thin" />
    <div class="palettes-list">
      <h2 class="list-header">Your palettes</h2>
      <PaletteMigration style="margin-bottom: 50px; margin-top: 10px;" />
      <div class="palette-line" v-for="paletteName in paletteNames" :key="paletteName">
        <v-row style="width: 100%; margin-left: auto; margin-right: auto; margin-bottom: 5px;">
          <h3>{{paletteName}}</h3>
          <v-spacer></v-spacer>
          <v-btn 
          @click="removePalette(paletteName)" 
          v-if="!defaultPalettes.includes(paletteName)"
          color="red" 
          fab outlined x-small
          >
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-row>
        <PalettePreview :colors="$store.state.palettes[paletteName]"/>
      </div>
    </div>
  </div>
</template>

<script>
import PalettePreview from '../components/PalettePreview.vue'
import AddPalette from '../components/AddPalette.vue'
import PaletteMigration from '../components/PaletteMigration.vue'
import BlockSpacer from '../components/BlockSpacer.vue'


export default {
  name: "PalettesView",
  components: { PalettePreview, AddPalette, PaletteMigration, BlockSpacer },
  data: () => ({
    paletteNames: [],
    defaultPalettes: ["Dracula", "Nord", "Tokyo Night", "Solarized", "Retrowave", "Gruvbox", "Onedark", "Monokai"],
  }),
  created(){
    this.paletteNames = Object.keys(this.$store.state.palettes).reverse()
  },
  computed: {
    modifications(){
      return this.$store.state.modifications
    }
  },
  watch: {
    modifications: function() {
      this.paletteNames = Object.keys(this.$store.state.palettes).reverse()
    }
  },
  methods: {
    removePalette(paletteName){
      let palettes = this.$store.state.palettes
      delete palettes[paletteName]
      this.$store.commit('setPalettes', palettes)
      this.$store.commit('setPalette', Object.keys(this.$store.state.palettes).reverse()[0])
    },
  },
}
</script>

<style>
  .palettes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #f8f8f2;
    background-image: url('../assets/graphics/background.svg');
    background-position: top;
    background-repeat: repeat;
  }

  .palettes-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #44475a;
    color: #f8f8f2;
    width: 100%;
  }

  .palettes .list-header{
    margin-bottom: 20px;
  }

  .palette-line{
    width: 90%;
    margin-bottom: 10px;
  }
</style>