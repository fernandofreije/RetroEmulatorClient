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
                <button @click="playRom(item)">Play</button>
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
import {GridLayout, GridItem} from 'vue-grid-layout';
import loading from 'vue-full-loading';

export default {
  name: 'RomList',
  components: { GridLayout, GridItem, loading},
  mounted(){
    this.loading=true;
    this.$http.get('http://localhost:8080/roms/')
      .then((response) => {      
        this.$store.commit('setUserRoms', response.data);       
        this.$store.commit('setLayout', this.generateLayout());
        this.loading=false;
      })
      .catch((error) => {
        this.loading=false;
      })
  },
  computed: {
    userRoms: {
      get() {
        return this.$store.state.userRoms;
      }
    },
    layout: {
      get() {
        if (!this.$store.state.user.layout) return []
        return this.$store.state.user.layout;
       }
    }
  },
  data(){
    return {
      loading: false,
      label: 'Loading your roms',
    }
  },
  methods: {
    generateLayout() {
      let x=0;
      let y=0;
      let layout = []
      this.$store.state.userRoms.forEach((rom) => {
        rom['x']=x;
        rom['y']=y;
        rom['h']=2;
        rom['w']=2;
        layout.push(rom);
        x+=2;
        if (x>10){
          x=0;
          y+=2;
          }
      })
      return layout;
    },
    deleteRom(id) {
      console.log(id);
      this.$http.delete(`http://localhost:8080/roms/${id}`)
      .then ((response) => {
        this.$store.dispatch('deleteRom', id);
      })
    },
    downloadRom(id) {
      this.$http.get(`http://localhost:8080/roms/${id}/download`)
        .then((response) => {
          let blob = new Blob([response.data], { type: 'application/octet-stream' } )
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = `${this.$store.state.userRoms.find(x => x.id === id).title}.nes`
          link.click()
        })
        .catch(error => console.log(error));
    },
    playRom(game) {
      this.$store.commit('setGameEmulated', game)
      this.$router.push('/emulate');
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
