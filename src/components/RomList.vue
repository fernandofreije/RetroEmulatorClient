<template>
<div>
  <loading
      :show="loading"
      :label="label">
  </loading>
  <h1>My games</h1>
  <grid-layout v-if="userRoms.length > 0"
    :layout="layout"
    :is-draggable="true"
    :is-resizable="false"
    :vertical-compact="true"
    :margin="[10, 10]"
    :use-css-transforms="false"
    >
            <grid-item v-for="item in layout"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.id"
                :key="item.id">
            <div class='image-container'>
              <img :src="item.boxartFront">
              <div class="actions">
                <button @click="viewRom(item)">View</button>
                <button v-if="emulable.includes(item.platform)" @click="playRom(item)">Play</button>
                <button @click="downloadRom(item.id)">Download</button>
                <button @click="deleteRom(item.id)">Delete</button>
              </div>
            </div>
          </grid-item>
  </grid-layout>
  <div v-else>
    <router-link to="/uploadRom">No games? Upload one!</router-link>
  </div>
</div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout';
import loading from 'vue-full-loading';

export default {
  name: 'RomList',
  components: { GridLayout, GridItem, loading },
  mounted() {
    this.loading = true;
    this.$http.get('roms/')
      .then((response) => {
        this.$store.commit('setUserRoms', response.data);
        this.$store.commit('setLayout', this.generateLayout());
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  computed: {
    userRoms: {
      get() {
        return this.$store.state.userRoms;
      }
    },
    layout: {
      get() {
        if (!this.$store.state.user.layout) return [];
        return this.$store.state.user.layout;
      }
    }
  },
  data() {
    return {
      emulable: ['Nintendo Entertainment System (NES)'],
      loading: false,
      label: 'Loading your roms',
    };
  },
  methods: {
    generateLayout() {
      let x = 0;
      let y = 0;
      const layout = [];
      this.$store.state.userRoms.forEach((rom) => {
        rom.x = x;
        rom.y = y;
        rom.h = 2;
        rom.w = 2;
        layout.push(rom);
        x += 2;
        if (x > 10) {
          x = 0;
          y += 2;
        }
      });
      return layout;
    },
    deleteRom(id) {
      this.$http.delete(`roms/${id}`)
        .then(() => {
          this.$store.dispatch('deleteRom', id);
        });
    },
    downloadRom(id) {
      this.$http.get(`roms/${id}/download`)
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${this.$store.state.userRoms.find(x => x.id === id).title}.nes`;
          link.click();
        });
    },
    playRom(game) {
      this.$store.commit('addGameData', game);
      this.$router.push('/emulate');
    },
    viewRom(game) {
      this.$store.commit('addGameData', game);
      this.$router.push('/game');
    }
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vue-grid-layout {
  margin: 20px;
}

.vue-grid-item {
  background-color:grey;
  width: 250px;
  height: 310px;

}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Make the image responsive */
.image-container img {
  height: 100%;
}

/* Style the button and place it in the middle of the container/image */
.image-container button {
  font-size: 10px;
  padding: 4px 4px;
  border: none;
  cursor: pointer;
  display: none;
}


.image-container:hover button{
  display: block;
}

.image-container:hover .actions {
  position: absolute;
  top: 90%;
  left: 80%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>
