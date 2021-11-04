<template>
    <div class="block-spacer" :class="'spacer-' + type"></div>
</template>

<script>
export default {
    name: 'BlockSpacer',
    props: ['type'],
}
</script>

<style>
  .block-spacer{
    width: 100vw;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .spacer-bdl{
    height: calc(100vw / 960 * 250);
    background-image: url('../assets/graphics/bottom-dark-light.svg');
  }
  .spacer-bld{
    height: calc(100vw / 960 * 250);
    background-image: url('../assets/graphics/bottom-light-dark.svg');
  }
  .spacer-tdl{
    height: calc(100vw / 960 * 250);
    background-image: url('../assets/graphics/top-dark-light.svg');
  }
  .spacer-tdl-thin{
    height: calc(100vw / 960 * 100);
    background-image: url('../assets/graphics/top-dark-light-thin.svg');
  }
  .spacer-tld{
    height: calc(100vw / 960 * 250);
    background-image: url('../assets/graphics/top-light-dark.svg');
  }
</style>