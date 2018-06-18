<template>
  <div>
    <loading
      :event-bus="eventBus"
      event-show="show-loading"
      event-hide="hide-loading"
      :label="label">
    </loading>
    <div>
      <span>Volver a buscar</span>
      <input v-model="gameToSearch"/>
      <button v-on:click="fillGames(gameToSearch)">Search</button>
    </div>
    <div v-if="selected">You have selected: {{selected.title}} {{selected.id}}</div>
    <vue-good-table
      @on-row-click="rowSelected"
      :columns="columns"
      :rows="games"
      :search-options="{
        enabled: true,
      }"
      :pagination-options="{
        enabled: true,
        perPage: 10,
      }"
      styleClass="vgt-table striped bordered"/>
  
  </div>
</template>

<script>
import EventBus from '../event-bus.js';
import loading from 'vue-full-loading';

export default {
  name: 'ScrapperSelector',
  components: {
    loading
  },
  mounted() {
    EventBus.$on('file-added', (file) => {
      this.fillGames(file.name);
    }
    );
    EventBus.$on('file-removed', () => {
      this.games = [];
      }
    );
  },
  computed:{
    selected:{
      get(){
        return this.$store.state.uploadRom.selectedGame;
      }
    }
  },
  data(){
    return {
      eventBus: EventBus,
      label: 'Getting rom data...',
      gameToSearch: '',
      columns: [
        {
          label: 'Title',
          field: 'title',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Platform',
          field: 'platform',
        },
        {
          label: 'Release Date',
          field: 'releaseDate',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMMMMMM Do YYYY',
        },
      ],
      games: []
    };
  },
  methods:{
    fillGames(name){
      if (name) {
        EventBus.$emit('show-loading');
        this.$http.get('http://localhost:8080/scrap/gameList?name='+name)
        .then(response => {
          this.games = response.data;
          EventBus.$emit('hide-loading');
        })
        .catch(err => {
          console.log(err);
          this.games = ['An error ocurred requesting the games'];
          EventBus.$emit('hide-loading');
          }
        );
      }
      else
        this.games = ['No games uploaded'];
    },
    rowSelected(params){
      this.$store.dispatch('selectGameData', params.row);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
