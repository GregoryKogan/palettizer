<template>
  <div class="about">
    <h1 style="margin-top: 10px; font-size: 40px;">Palettizer</h1>
    <div class="section">
      <h2>Why?</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non praesentium expedita voluptas nulla recusandae dicta cumque hic reprehenderit tenetur culpa sint qui aliquid quis repudiandae, omnis odio aperiam repellat fugiat, quae delectus aliquam quam veritatis laborum. Nulla fugit cum, iste fugiat perspiciatis, voluptate, neque vel a ut itaque dolore explicabo dolorem alias recusandae officia accusantium quidem earum suscipit sint! Et voluptatem laborum suscipit, excepturi asperiores eum? Earum a assumenda perferendis!</p>
      <v-img 
      src="../assets/logo.png" 
      contain
      max-width="150"
      style="width: 40%; margin-left: auto; margin-right: auto;"
      ></v-img>
    </div>
    <div class="section">
      <h2>How it works?</h2>
      <v-img src="../assets/original.jpg" class="example-image" contain max-width="800">
        <span class="image-name">Original image</span>
      </v-img>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur doloribus atque explicabo accusantium et tempora. Velit nobis sit tempore in.</p>
      <h3 class="paragraph">1. Color matching</h3>
      <v-img src="../assets/color-matched.jpg" class="example-image" contain max-width="800"></v-img>
      <span style="font-weight: bold;">Dracula palette</span>
      <PalettePreview :colors="this.$store.state.palettes['Dracula']" style="margin-bottom: 5px;"/>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam sed totam, est cum quam ipsum, libero repellat quibusdam enim ex, nemo labore non! Temporibus aspernatur recusandae cupiditate dolor aperiam iusto distinctio consequatur adipisci earum laudantium ut mollitia, unde totam voluptatum maiores! Maiores unde dolore harum esse ratione facere accusantium, molestias beatae voluptatem quam pariatur! Corrupti assumenda distinctio a omnis, impedit cupiditate quia? Laborum, modi. In voluptatibus optio aliquam eius voluptate?</p>
      <h3 class="paragraph">2. Blurring</h3>
      <v-img src="../assets/blur.jpg" class="example-image" contain max-width="800"></v-img>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore dolore odio voluptatum numquam consectetur itaque repudiandae, alias a eos architecto.</p>
      <h3 class="paragraph">3. Tweaking brightness</h3>
      <v-img src="../assets/final-result.jpg" class="example-image" contain max-width="800"></v-img>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus magnam officiis rerum maiores consequatur ab, laudantium quos recusandae corrupti laborum? Quidem facere, fugit labore laborum consequuntur numquam soluta iste earum nesciunt necessitatibus fugiat sit ipsa ea debitis similique illo assumenda expedita. Placeat ullam enim, dignissimos commodi necessitatibus recusandae repudiandae voluptatem iste iusto asperiores, minima molestiae nisi qui perspiciatis sequi maxime repellendus dolorem dolorum quia, explicabo officia nam tempore rerum. Minus.</p>
    </div>
    <div class="section">
      <h2>Options</h2>
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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem animi deleniti, ut reprehenderit numquam accusamus sequi aperiam, praesentium quidem officiis enim voluptatibus molestias assumenda doloremque minus, suscipit fuga architecto porro adipisci velit ullam culpa. Nulla, praesentium odio? Consectetur natus rerum dolor laboriosam quia eum veritatis illo ipsa, reprehenderit cupiditate optio.</p>
      <img-comparison-slider>
        <figure slot="first" class="fig-left">
          <img src="../assets/color-matched.jpg" width="100%"/>
          <figcaption>Linear</figcaption>
        </figure>
        <figure slot="second" class="fig-right">
          <img src="../assets/qcd.jpg" width="100%"/>
          <figcaption>Quadratic</figcaption>
        </figure>
      </img-comparison-slider>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem animi deleniti, ut reprehenderit numquam accusamus sequi aperiam, praesentium quidem officiis enim voluptatibus molestias assumenda doloremque minus, suscipit fuga architecto porro adipisci velit ullam culpa. Nulla, praesentium odio? Consectetur natus rerum dolor laboriosam quia eum veritatis illo ipsa, reprehenderit cupiditate optio.</p>
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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem animi deleniti, ut reprehenderit numquam accusamus sequi aperiam, praesentium quidem officiis enim voluptatibus molestias assumenda doloremque minus, suscipit fuga architecto porro adipisci velit ullam culpa. Nulla, praesentium odio? Consectetur natus rerum dolor laboriosam quia eum veritatis illo ipsa, reprehenderit cupiditate optio.</p>
    </div>
    <v-row justify="space-around" style="width: 100%;">
      <PatreonButton style="margin-top: 20px;" />
      <GitHubButton style="margin-top: 20px;" />
    </v-row>
    <div style="height: 30px"></div>
  </div>
</template>

<script>
import PatreonButton from '../components/PatreonButton.vue'
import GitHubButton from '../components/GitHubButton.vue'
import PalettePreview from '../components/PalettePreview.vue'

export default {
  name: "About",
  components: { PatreonButton, GitHubButton, PalettePreview },
  created(){
    console.log()
  }
}
</script>

<style>
  .about {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #282a36;
    color: #f8f8f2;
  }

  .about img-comparison-slider {
    --divider-width: 2px;
    --divider-color: #282a36;
    --default-handle-opacity: 1;
    --default-handle-color: #282a36;
    --divider-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    display: block;
    width: min(800px, 100%);
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    border: solid 3px #44475a;
    transition: border 200ms ease-in-out;
    margin-bottom: 10px;
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

  .about .section{
    width: 100%;
    margin-top: 20px;
  }
  .about .section h2 {
    margin-right: auto;
    margin-bottom: 10px;
  }
  .about .section .example-image{
    border-radius: 8px;
    border: solid 3px #44475a;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }
  .about .section .example-image .image-name{
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
</style>