<template>
  <div class="palettes">
    <AddPalette />
    <h2 class="list-header">Your palettes</h2>
    <PaletteMigration style="margin-bottom: 30px; margin-top: 10px;" />
    <div class="palette-line" v-for="paletteName in paletteNames" :key="paletteName">
      <h3>{{paletteName}}</h3>
      <PalettePreview :colors="$store.state.palettes[paletteName]"/>
    </div>
    <PatreonButton style="margin-bottom: 20px;" />
  </div>
</template>

<script>
import PalettePreview from '../components/PalettePreview.vue'
import AddPalette from '../components/AddPalette.vue'
import PaletteMigration from '../components/PaletteMigration.vue'
import PatreonButton from '../components/PatreonButton.vue'


export default {
  name: "Palettes",
  components: { PalettePreview, AddPalette, PaletteMigration, PatreonButton },
  data: () => ({
    paletteNames: [],
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
  }
}
</script>

<style>
  .palettes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #282a36;
    color: #f8f8f2;
  }
  .palettes .list-header{
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .palette-line{
    width: 90%;
  }
</style>