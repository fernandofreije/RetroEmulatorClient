<template>
<p>
  <canvas id="gameCanvas" width="256" height="240"></canvas>
</p>
</template>

<script>

import Nesjs from 'nes-js';

export default {
  name: 'NesEmulator',
  props: [gameId],
  mounted(){
    var url = `http://localhost:8080/roms/${this.gameId}/download`;
    var request = new XMLHttpRequest();
    request.responseType = 'arraybuffer';

    request.onload = () => {
      var buffer = request.response;
      var nes = new NesJs.Nes();

      nes.setRom(new NesJs.Rom(buffer));
      nes.setDisplay(new NesJs.Display(document.getElementById('gameCanvas')));
      nes.setAudio(new NesJs.Audio());

      window.onkeydown = function(e) { nes.handleKeyDown(e); };
      window.onkeyup = function(e) { nes.handleKeyUp(e); };

      nes.bootup();
      nes.run();
    };

    request.open('GET', url, true);
    request.send(null);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
