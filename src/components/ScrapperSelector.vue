<template>
  <div>
    <loading
      :show="loading"
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
import loading from 'vue-full-loading';
import EventBus from '../event-bus';


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
  computed: {
    selected: {
      get() {
        return this.$store.state.uploadRom.selectedGame;
      }
    }
  },
  data() {
    return {
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
          dateOutputFormat: 'MMM Do YYYY',
        },
      ],
      games: [],
      loading: false
    };
  },
  methods: {
    fillGames(name) {
      if (name) {
        this.loading = true;
        this.$http.get(`http://localhost:8080/scrap/gameList?name=${name}`)
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
      this.$store.dispatch('selectGameData', params.row);
      const gameId = this.$store.state.uploadRom.selectedGame.id;
      this.loading = true;
      this.$http.get(`http://localhost:8080/scrap/game?id=${gameId}`)
        .then((response) => {
          this.$store.dispatch('getGameData', response.data);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        }
        );
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
