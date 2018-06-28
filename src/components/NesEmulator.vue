<template>
<div>
   <div class="images">
    <img v-bind:src="game.clearLogo"/>
    <h1>Controls</h1>
    <img src='/static/images/nes_controller_keys.jpg'/>
   </div>
  <div id="gameContainer">
    <canvas ref="gameCanvas" id="gameCanvas"></canvas>
  </div>
  <div id="gameData">
    <div>
        <span>{{game.title}}</span>
      </div>
      <div>
        <span>{{game.platform}}</span>
      </div>
      <div>
        <span>{{game.releaseDate | moment('MMM Do YYYY')}}</span>
      </div>
      <div>
        <span>{{game.publisher}}</span>
      </div>
      <div>
        <span>{{game.developer}}</span>
      </div>
      <div>
        <span>{{game.ESRB}}</span>
      </div>
  </div>
  <div id="gameOverview">
    <div id="scrollText">
      {{game.overview}}
    </div>
  </div>
</div>
</template>

<script>

import 'nes-js';

let nes;
export default {
  name: 'NesEmulator',
  computed: {
    game: {
      get() {
        return this.$store.state.gameData;
      }
    }
  },
  mounted() {
    /* global NesJs */
    this.$http.get(`roms/${this.game.id}/download`, { responseType: 'arraybuffer' })
      .then((response) => {
        nes = new NesJs.Nes();
        nes.setRom(new NesJs.Rom(response.data));
        nes.setDisplay(new NesJs.Display(this.$refs.gameCanvas));
        nes.setAudio(new NesJs.Audio());

        window.onkeydown = (e) => { nes.handleKeyDown(e); };
        window.onkeyup = (e) => { nes.handleKeyUp(e); };
        nes.bootup();
        nes.run();
      });
  },
  destroyed() {
    nes.stop();
    window.onkeydown = null;
    window.onkeyup = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.images {
  float:left;
  width: 30%;
  margin-top: 10%;
  margin-left: 10%;
}

h1 {
  padding: 5%;
}

img{
  margin-left: auto;
  margin-right: auto;
  display: block;
  float: none;
  max-height: 100%;
  max-width: 100%;
}

#gameData {
  width: 40%;
  display: inline-block;
}

#gameOverview {
  width: 40%;
  display: inline-block;
  max-height: 150px;
  overflow: hidden;
}

#scrollText {
  animation: floatText 30s infinite linear;
}
#scrollText:hover {
  animation-play-state: paused;
}
@keyframes floatText {
  to {
    transform: translateY(-100%);
  }
}

/* If you want text inside of the container */
#gameCanvas {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 42.1875%;
    width: 45%;
    padding-top:3%;
    padding-bottom:3%;
}

@media (max-width: 700px) {
  .images {
    float: none;
  }
}

</style>
