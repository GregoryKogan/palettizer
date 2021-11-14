<template>
  <div class="about">
    <div class="about-header">
      <h1>Palettizer</h1>
    </div>
    <BlockSpacer type="tdl"/>
    <div class="section light-section">
      <h2>Why?</h2>
      <p class="p-text">
        This summer I fully switched to GNU/Linux as my desktop OS. 
        <span>(</span>I use Arch btw<span>)</span>
        I was fascinated by its customizability. I set a goal for myself to build a 
        system that would function, feel, and look exactly the way I like it. I'm kind 
        of a perfectionist myself, I can't put up with any element on my screen being 
        out of order. I tried many Linux distributions, window managers, and color 
        themes, but nothing satisfied me. Wallpaper is usually the biggest element 
        on your screen. Turnes out, it's not easy to find wallpapers in the color 
        theme I need. Browsing 
        <a href="https://www.reddit.com/r/unixporn/">r/Unixporn</a>, I found out 
        about <a href="https://ign.schrodinger-hat.it/">ImageGoNord</a> utility. 
        Its purpose is exactly what I needed, but the results were a pure 
        disappointment. I believed, that I can create a better alternative. 
        This is how the <b>Palettizer</b> project has begun.
        <br>
        The <b>Palettizer</b> helped me put my whole system into a combination of the 
        <a href="https://draculatheme.com">Dracula</a> and the 
        <a href="https://www.nordtheme.com">Nord</a> themes. All my configuration and customization files 
        are on my
        <a href="https://github.com/GregoryKogan/Linux-Configs">Linux-Configs</a>
        repository. At the moment I'm incredibly happy with 
        my current setup!
      </p>
      <v-img 
      src="../assets/logo.png" 
      contain
      max-width="150"
      style="width: 40%; margin-left: auto; margin-right: auto; margin-bottom: 20px;"
      ></v-img>
    </div>
    <BlockSpacer type="bld"/>
    <div class="section dark-section">
      <h2>How it works?</h2>
      <v-img src="../assets/original.jpg" class="example-image" contain max-width="800">
        <span class="image-name">Original image</span>
      </v-img>
      <a href="https://i09.kanobu.ru/r/98337ae40ef114cf07c92cac8dbb9688/1040x700/u.kanobu.ru/editor/images/51/c48787a0-4259-47a3-b32a-ddb4f311c753.jpg">Source image</a>
      <p class="p-text">
        Let's take this image as an example and walk through the steps my algorithm 
        uses to convert any image to a particular color theme. In this example, 
        I will use the Dracula palette.
      </p>
      <h3 class="paragraph">1. Color matching</h3>
      <v-img src="../assets/color-matched.jpg" class="example-image" contain max-width="800"></v-img>
      <span style="font-weight: bold;">Dracula palette</span>
      <PalettePreview :colors="this.$store.state.palettes['Dracula']" style="margin-bottom: 5px;"/>
      <p class="p-text">
        For every pixel in the image, the algorithm cycles through all colors in of the 
        chosen palette and changes the colors of pixels to the closest ones from the palette. 
        There are various ways to calculate the distance between two colors. By default, 
        my algorithm uses linear color distance. If the original pixel color and color 
        from the palette in RGB are
        <vue-mathjax formula="$$\small{(r_1,g_1,b_1)\text{ - original},(r_2,g_2,b_2)\text{ - palette}}$$"></vue-mathjax>  
        then the distance between the colors is
        <vue-mathjax formula="$$\small{D=|r_1-r_2|+|g_1-g_2|+|b_1-b_2|}$$"></vue-mathjax>
        At this step, the image gets a cartoonishly rough look. And that is the only 
        transformation that 
        <a href="https://ign.schrodinger-hat.it/">ImageGoNord</a>
        does to the images. In some cases, this can be 
        the desired result, but <b>Palettizer</b> gives you an ability to go further.
      </p>
      <h3 class="paragraph">2. Blurring</h3>
      <v-img src="../assets/blur.jpg" class="example-image" contain max-width="800"></v-img>
      <p class="p-text">
        You can see sharp-looking pixels in several areas. Unfortunately, it is inevitable 
        in some cases. Technically, we just compressed our image because now it uses only (!) 
        colors from the palette instead of 16 million colors of RGB color space. But this 
        problem can be fixed with a little bit of blurring as it helps to smooth out 
        transitions between different color areas. <b>Palettizer</b> uses the 
        <a href="https://github.com/flozz/StackBlur">StackBlur</a> library 
        to do that. The tool gives results very similar to Gaussian blur but runs significantly 
        faster.
      </p>
      <h3 class="paragraph">3. Tweaking brightness</h3>
      <v-img src="../assets/final-result.jpg" class="example-image" contain max-width="800"></v-img>
      <p class="p-text">
        This is an extremely important step, somehow magical in my opinion. My algorithm 
        loops through pixels of the image from the previous step and original image 
        simultaneously and calculates their brightness. The most common way to do that 
        for an RGB pixel is
        <vue-mathjax formula="$$\small{B=\frac{r+g+b}{3}}$$"></vue-mathjax>
        But it is not appropriate in this case. Humans do not perceive brightness 
        like the computer does. <b>Palettizer</b> uses a formula optimized for human sight.
        <vue-mathjax formula="$$\small{B=r*0.2126+g*0.7152+b*0.0722}$$"></vue-mathjax>
        When original brightness and current brightness are calculated we can use these 
        values to alter the color of the current pixel so its brightness is exactly 
        the same as that of its origin pixel in the input image.
        <vue-mathjax formula="$$\small{B_1\text{ - original}, B_2\text{ - current}}$$"></vue-mathjax>
        We need to calculate their difference, this value will be used as a multiplication 
        factor for brightness tweaking
        <vue-mathjax formula="$$\small{F=\frac{B_1}{B_2}}$$"></vue-mathjax>
        Now we can calculate new RGB values for our pixel
        <vue-mathjax formula="$$\small{(r_n,g_n,b_n)\text{ - new values},(r_o,g_o,b_o)\text{ - old values}}$$"></vue-mathjax>
        <vue-mathjax formula="$$\small{r_n=\text{min}(255,r_o*F)}$$"></vue-mathjax>
        <vue-mathjax formula="$$\small{g_n=\text{min}(255,g_o*F)}$$"></vue-mathjax>
        <vue-mathjax formula="$$\small{b_n=\text{min}(255,b_o*F)}$$"></vue-mathjax>
        We need to clip max possible value at 255, because it's maximal possible value in RGB.
      </p>
    </div>
    <BlockSpacer type="tdl"/>
    <div class="section light-section">
      <h2>Options</h2>
      <div class="call-to-action">Move the line to see the difference</div>
      <img-comparison-slider>
        <figure slot="first" class="fig-left">
          <img src="../assets/bs-pre.png" width="100%"/>
          <figcaption>Normal</figcaption>
        </figure>
        <figure slot="second" class="fig-right">
          <img src="../assets/brightness-steps.png" width="100%"/>
          <figcaption>Stepping</figcaption>
        </figure>
      </img-comparison-slider>
      <p class="p-text">
        Brightness stepping gives the image a cartoonish look. This effect is 
        achieved by rounding the brightness multiplication factor to the first 
        decimal. After that the resulting pixel brightness is not always the same 
        as that of the original. It becomes an approximation of it, creating a 
        staircase-like pattern.
        <vue-mathjax formula="$$\small{F=\frac{\text{round}(F * 10)}{10}}$$"></vue-mathjax>
      </p>
      <img-comparison-slider>
        <figure slot="first" class="fig-left">
          <img src="../assets/lcd.jpg" width="100%"/>
          <figcaption>Linear</figcaption>
        </figure>
        <figure slot="second" class="fig-right">
          <img src="../assets/qcd.jpg" width="100%"/>
          <figcaption>Quadratic</figcaption>
        </figure>
      </img-comparison-slider>
      <p class="p-text">
        As I mentioned above, there are multiple ways of calculating the distance 
        between two colors. Although by default <b>Palettizer</b> uses linear formula, there 
        is an option to use the quadratic formula. It will change colors in some areas 
        in the image.
        <vue-mathjax formula="$$\small{D_L=|r_1-r_2|+|g_1-g_2|+|b_1-b_2|}$$"></vue-mathjax>
        <vue-mathjax formula="$$\small{D_Q=\sqrt{(r_1-r_2)^2+(g_1-g_2)^2+(b_1-b_2)^2}}$$"></vue-mathjax>
      </p>
      <img-comparison-slider>
        <figure slot="first" class="fig-left">
          <img src="../assets/no-blur.jpg" width="100%"/>
          <figcaption>No blur</figcaption>
        </figure>
        <figure slot="second" class="fig-right">
          <img src="../assets/strong-blur.jpg" width="100%"/>
          <figcaption>Blur 60px</figcaption>
        </figure>
      </img-comparison-slider>
      <p class="p-text">
        Blur radius controls the amount of applied blur. The more you blur it, 
        the smaller the number of sharp pixels. If brightness tweaking is on, 
        blur won't affect the detalization, but too much blur may cause 
        loss of color.
      </p>
    </div>
    <BlockSpacer type="bld"/>
    <div class="section dark-section">
      <h2>Examples</h2>
      <div class="call-to-action">Swipe to see more examples!</div>
      <div class="carousel-cap"></div>
      <carousel
      v-on:pageChange="slideChange"
      class="example-carousel"
      :perPage="1"
      :paginationEnabled="false"
      >
        <slide v-for="(example, i) in examples" :key="i" class="example-slide">
          <v-img :src="example.src" class="slide-image" contain></v-img>
        </slide>
      </carousel>
      <span class="slide-description">{{examples[currentIndex].theme}}</span>
    </div>
    <BlockSpacer type="tdl"/>
    <v-row justify="space-around" style="width: 100%; background-color: #44475a;">
      <GitHubButton style="margin-top: 20px;" />
    </v-row>
    <div style="height: 50px; width: 100%; background-color: #44475a;"></div>
  </div>
</template>

<script>
import GitHubButton from '../components/GitHubButton.vue'
import PalettePreview from '../components/PalettePreview.vue'
import BlockSpacer from '../components/BlockSpacer.vue'
import { Carousel, Slide } from 'vue-carousel';
import {VueMathjax} from 'vue-mathjax'

export default {
  name: "About",
  components: { 
    GitHubButton, 
    PalettePreview, 
    BlockSpacer,
    Carousel, 
    Slide,
    'vue-mathjax': VueMathjax,
  },
  data: () => ({
    currentIndex: 0,
    examples: [
      { src: require('../assets/examples/Dracula-Autumn.jpg'), theme: 'Dracula', },
      { src: require('../assets/examples/Tokyo Night-Tokyo2.jpg'), theme: 'Tokyo Night', },
      { src: require('../assets/examples/Custom1.jpg'), theme: 'Custom', },
      { src: require('../assets/examples/Nord1.jpg'), theme: 'Nord', },
      { src: require('../assets/examples/Gruvbox-red.png'), theme: 'Gruvbox', },
      { src: require('../assets/examples/Retro2.jpg'), theme: 'Retrowave', },
      { src: require('../assets/examples/Monokai-Ilu2.png'), theme: 'Monokai', },
      { src: require('../assets/examples/Tokyo Night-Tokyo.jpg'), theme: 'Tokyo Night', },
      { src: require('../assets/examples/Custom2.jpg'), theme: 'Custom', },
      { src: require('../assets/examples/Onedark-wave.jpg'), theme: 'Onedark', },
      { src: require('../assets/examples/Retro1.jpg'), theme: 'Retrowave', },
      { src: require('../assets/examples/Solarized-Ilu1.jpg'), theme: 'Solarized', },
      { src: require('../assets/examples/Tokyo Night-Iceberg.jpg'), theme: 'Tokyo Night', },
    ],
  }),
  methods: {
    slideChange(i){
      this.currentIndex = i;
    },
  },
}
</script>

<style>
  .about {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #f8f8f2;
  }

  .about img-comparison-slider {
    --divider-width: 2px;
    --divider-color: #ff79c6;
    --default-handle-opacity: 1;
    --default-handle-color: #ff79c6;
    --divider-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    display: block;
    width: min(800px, 100%);
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    transition: border 200ms ease-in-out;
    margin-bottom: 10px;
  }
  .about .dark-section img-comparison-slider{
    border: solid 3px #44475a;
  }
  .about .light-section img-comparison-slider{
    border: solid 3px #6272a4;
  }
  .about img-comparison-slider:focus {
    outline: none;
    box-shadow: 0px 0px 5px 2px #000;
    border: 3px dashed #ff79c6;
  }
  .about img-comparison-slider .fig-left,
  .about img-comparison-slider .fig-right{
    margin: 0;
  }
  .about img-comparison-slider .fig-left figcaption,
  .about img-comparison-slider .fig-right figcaption{
    position: absolute;
    top: 0;
    line-height: 100%;
    font-weight: 500;
    font-size: 17px;
    padding-top: 3px;
    padding-bottom: 3px;
    background: #282a36aa;
  } 
  .about img-comparison-slider .fig-left figcaption {
    left: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-left: 3px;
    padding-right: 7px;
  }
  .about img-comparison-slider .fig-right figcaption {
    right: 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-left: 7px;
    padding-right: 3px;
  }

  .about .about-header{
    padding-top: 10px;
    width: 100%;
    text-align: center; 
    font-size: 20px;
    background-image: url('../assets/graphics/background.svg');
    background-position: top;
    background-repeat: repeat;
  }

  .about .section{
    width: 100%;
    padding-left: max(5%, 50vw - 600px);
    padding-right: max(5%, 50vw - 600px);
  }
  .about .light-section{
    background-color: #44475a;
  }
  .about .dark-section{
    background-image: url('../assets/graphics/background.svg');
    background-position: top;
    background-repeat: repeat;
  }
  .about .section h2 {
    margin-right: auto;
    margin-bottom: 10px;
  }
  .about .section .example-image{
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }
  .about .light-section .example-image{
    border: solid 3px #282a36;
  }
  .about .dark-section .example-image{
    border: solid 3px #44475a;
  }
  .about .image-name{
    font-weight: 500;
    font-size: 17px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 3px;
    padding-right: 7px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #282a36aa;
  }
  .about .section .paragraph{
    margin-top: 15px;
  }
  .about .dark-section .p-text{
    background-color: #282a36;
  }

  .about .example-carousel{
    width: min(100%, 800px);
    height: calc(max(350px, min(90vw, 800px)) / 16 * 9);
    margin-left: auto;
    margin-right: auto;
    transition: border 200ms ease-in-out;
  }
  .about .example-carousel .example-slide{
    width: 100%;
  }
  .about .example-carousel .slide-image{
    height: calc(max(350px, min(90vw, 800px)) / 16 * 9);
  }
  .about .slide-description{
    display: block;
    width: min(100%, 800px);
    text-align: center;
    font-size: 17px;
    margin-top: 5px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 8px 4px -4px #ff79c6;
  }
  .about .carousel-cap{
    height: 8px;
    display: block;
    width: 100%;
  }

  .call-to-action{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: #6272a4;
    font-weight: bold;
    font-size: 18px;
  }

  .about .section a {
    color: #ff79c6;
    text-decoration: none;
  }
  .about .section a:hover{
    text-decoration: underline;
  }
  .about .section a:active{
    color: #8be9fd;
    text-decoration: underline;
  }
</style>