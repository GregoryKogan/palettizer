<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view/>
    </v-main>
    <CookieAccept />
  </v-app>
</template>

<script>
import { loadPalettes } from "./palettizer";
import NavBar from "./components/NavBar.vue"
import CookieAccept from "./components/CookieAccept.vue"

export default {
  name: 'App',
  components: { NavBar, CookieAccept },
  created(){
    document.title = "Palettizer"
    loadPalettes()
  }
};
</script>

<style>
  app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app{
    background-color: #282a36;
  }
  body {
    background-color: #282a36;
  }
</style>