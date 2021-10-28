<template>
  <div class="palettes">
    <AddPalette />
    <h2 class="list-header">Your palettes</h2>
    <div class="palette-line" v-for="paletteName in paletteNames" :key="paletteName">
      <h3>{{paletteName}}</h3>
      <PalettePreview class="select-preview" :colors="$store.state.palettes[paletteName]"/>
    </div>
  </div>
</template>

<script>
import PalettePreview from '../components/PalettePreview.vue'
import AddPalette from '../components/AddPalette.vue'


export default {
  name: "Palettes",
  components: { PalettePreview, AddPalette },
  data: () => ({
    paletteNames: [],
  }),
  created(){
    this.paletteNames = Object.keys(this.$store.state.palettes).reverse()
  },
  computed: {
    lastAdded(){
      return this.$store.state.lastAdded
    }
  },
  watch: {
    lastAdded: function() {
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
    margin-top: 80px;
  }

  .palette-line{
    width: 90%;
  }
</style>