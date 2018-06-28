<template>
  <div>
    <loading
      :show="loading"
      :label="label">
    </loading>
    <div id="search-other-game" >
      <span>Search other game</span>
      <input v-model="gameToSearch"/>
      <button v-on:click="fillGames(gameToSearch)">Search</button>
    </div>
    <div id="show-selected" v-if="selected">You have selected: <strong>{{selected.title}} </strong></div>
    <vue-good-table
      @on-row-click="rowSelected"
      :columns="columns"
      :rows="games"
      :search-options="{
        enabled: true,
      }"
      :pagination-options="{
        enabled: true,
        perPage: 5,
      }"
      styleClass="vgt-table bordered">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'age'">
            <span style="font-weight: bold; color: blue;">{{props.row.age}}</span>
          </span>
          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
        </template>
    </vue-good-table>
  </div>
</template>

<script>
import loading from 'vue-full-loading';
import EventBus from '../event-bus';


export default {
  name: 'ScrapperSelector',
  components: {
    loading
  },
  created() {
    EventBus.$on('file-added', this.onFileAdded);
    EventBus.$on('file-removed', this.onFileRemoved);
  },
  destroyed(){
    EventBus.$off('file-added', this.onFileAdded);
    EventBus.$off('file-removed', this.onFileRemoved);
  },
  data(){
    return {
      label: 'Getting game candidates data...',
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
          dateOutputFormat: 'MMM Do YYYY',
        },
      ],
      games: [],
      loading: false
    }
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.uploadRom.selectedGame;
      }
    }
  },
  methods: {
    fillGames(name) {
      if (name) {
        this.loading = true;
        this.$http.get(`scrap/gameList?name=${name}`)
          .then((response) => {
            this.games = response.data;
            this.loading = false;
          })
          .catch(() => {
            this.games = ['An error ocurred requesting the games'];
            this.loading = false;
          }
          );
      } else this.games = ['No games uploaded'];
    },
    rowSelected(params) {
      console.log(params);
      this.$store.commit('selectGameData', params.row);
      const gameId = this.$store.state.uploadRom.selectedGame.id;
      this.loading = true;
      this.$http.get(`scrap/game?id=${gameId}`)
        .then((response) => {
          this.$store.dispatch('getGameData', response.data);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        }
        );
    },
    markSelected(event){
      event.target.add
    },
    onFileAdded(file){
      this.fillGames(file.name);
    },
    onFileRemoved(){
      this.games = [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#show-selected {
  text-align: left;
  padding: 5px;
}

strong {
  color: white;
}

#search-other-game {
  padding: 1em;
}

</style>
