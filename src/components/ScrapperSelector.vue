<template>
  <ul>
    <li v-for="game in games">
      {{game}}
    </li>
  </ul>
</template>

<script>
import thegamesdb from 'thegamesdb';
export default {
  name: 'ScrapperSelector',
  data(){
    return {
      games: []
    }
  },
  methods:{
    fillGames(name){
      if (name) {
        thegamesdb.getGamesList({name})
        .then(response => this.games = response)
        .catch(err => {
          console.log(err);
          this.games = ['An error ocurred requesting the games']
          }
        );
      }
      else
        this.games = ['No games uploaded'];
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
