<template>
 <form v-if="gameData">
    <h1>Game data</h1>
    <div id='images'>
      <div id="banner">
        <img  align='left' v-bind:src="gameData.clearLogo"/>
      </div>
      <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
        <div class="flipper">
          <div class="front">
            <img v-bind:src="gameData.boxartFront"/>
          </div>
          <div class="back">
            <img v-bind:src="gameData.boxartBack"/>
          </div>
        </div>
      </div>
    </div>
    <b-container>
      <b-row>
        <label for=''>Title</label>
        <b-input
        required
        size="50"
        v-model="gameData.title"
        type="text"
        v-bind:placeholder="gameData.title"/>
      </b-row>
      <b-row>
        <label for=''>Platform</label>
        <span>{{gameData.platform}}</span>
      </b-row>
      <b-row>
        <label for=''>Release Date</label>
        <span>{{gameData.releaseDate | moment('MMM Do YYYY')}}</span>
      </b-row>
      <b-row>
        <label for=''>Publisher</label>
        <span>{{gameData.publisher}}</span>
      </b-row>
      <b-row>
        <label for=''>Developer</label>
        <span>{{gameData.developer}}</span>
      </b-row>
      <b-row>
        <label for=''>ESRB</label>
        <span>{{gameData.ESRB}}</span>
      </b-row>
      <b-row>
        <label for=''>Genres</label>
        <div v-for="(genre, index) in gameData.genres" :key="index">
          <b-input
          required
          v-model="gameData.genres[index]"
          type="text"
          v-bind:placeholder="genre"/>
        </div>
        <button @click="addGenre">New genre</button>
        <button @click="removeGenre">Delete last genre</button>
      </b-row>
      <b-row>
        <label>Overview</label>
        <b-form-textarea
        required
        v-model="gameData.overview"
        type="text"
        v-bind:placeholder="gameData.overview"/>
      </b-row>
    </b-container>
  </form>
</template>

<script>

export default {
  name: 'GameData',
  props: {
    gameData: {
      required: true
    }
  },
  methods: {
    addGenre() {
      this.gameData.genres.push('');
    },
    removeGenre() {
      this.gameData.genres.splice(-1,1)
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


hr {
  padding-top: 10px;
}

.container {
   text-align: left;
   padding-left: 38%;
   padding-bottom: 5%;
}

span {
  color: white;
  border: none;
  color: white;
  border-bottom: 1px solid white;
  font-size: 14px;
}

input {
  width:50%;
}

row {
  padding: 1em;
  margin-left: 10%;
}

textarea {
  display:block;
  width: 80%;
  height: 250px;
  resize: none;
}

#images {
  float:left;
  margin-top: -85px;
  margin-left: 10%;
}

#banner {
  height: 160px;
  width: 320px;
}

#banner img{
  margin-left: auto;
	margin-right: auto;
	display: block;
  float: none;
  max-height: 100%;
  max-width: 100%;
}


.flip-container {
	perspective: 1000px;
  float:left;
}
/* flip the pane when hovered */
.flip-container:hover .flipper, .flip-container.hover .flipper {
  transform: rotateY(180deg);
}

.flip-container, .front, .back {
	width: 320px;
	height: 480px;

}

/* flip speed goes here */
.flipper {
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
}

/* hide back of pane during swap */
.front, .back {
	backface-visibility: hidden;

	position: absolute;
	top: 0;
	left: 0;
}

/* front pane, placed above back */
.front {
	z-index: 2;
	/* for firefox 31 */
	transform: rotateY(0deg);
}

/* back, initially hidden pane */
.back {
	transform: rotateY(180deg);
}
</style>
