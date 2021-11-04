<template>
    <img class="block-spacer" :class="'spacer-' + type" :src="sourceImg">
</template>

<script>
export default {
    name: 'BlockSpacer',
    props: ['type'],
    data: () => ({
      sourceImg: null,
    }),
    created(){
      console.log(this.type)
      if (this.type == 'bdl')
        this.sourceImg = require('../assets/graphics/bottom-dark-light.svg')
      else if (this.type == 'bld')
        this.sourceImg = require('../assets/graphics/bottom-light-dark.svg')
      else if (this.type == 'tdl')
        this.sourceImg = require('../assets/graphics/top-dark-light.svg')
      else if (this.type == 'tld')
        this.sourceImg = require('../assets/graphics/top-light-dark.svg')
      else if (this.type == 'tdl-thin')
        this.sourceImg = require('../assets/graphics/top-dark-light-thin.svg')
    },
}
</script>

<style>
  .block-spacer{
    width: 100vw;
  }

  .spacer-bdl{
    height: calc(100vw / 960 * 250);
  }
  .spacer-bld{
    height: calc(100vw / 960 * 250);
  }
  .spacer-tdl{
    height: calc(100vw / 960 * 250);
  }
  .spacer-tdl-thin{
    height: calc(100vw / 960 * 100);
  }
  .spacer-tld{
    height: calc(100vw / 960 * 250);
  }
</style>