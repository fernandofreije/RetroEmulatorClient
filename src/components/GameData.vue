<template>
 <div id v-if="gameData">
    <h1>Game data</h1>
    <div id='images'>
      <div id="banner">
        <img  align='left' v-bind:src="gameData.clearLogo"/>
      </div>
      <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
        <div class="flipper">
          <div class="front">
            <img v-if="gameData.boxartFront" v-bind:src="gameData.boxartFront"/>
            <img v-else src="/static/images/no-boxart.png"/>
          </div>
          <div class="back">
            <img v-if="gameData.boxartBack" v-bind:src="gameData.boxartBack"/>
            <img v-else src="/static/images/no-boxart.png"/>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div>
        <label for=''>Title</label>
        <input
        required
        size="50"
        v-model="gameData.title"
        type="text"
        v-bind:placeholder="gameData.title"/>
      </div>
      <div>
        <label for=''>Platform</label>
        <span>{{gameData.platform}}</span>
      </div>
      <div>
        <label for=''>Release Date</label>
        <span>{{gameData.releaseDate | moment('MMM Do YYYY')}}</span>
      </div>
      <div>
        <label for=''>Publisher</label>
        <span>{{gameData.publisher}}</span>
      </div>
      <div>
        <label for=''>Developer</label>
        <span>{{gameData.developer}}</span>
      </div>
      <div>
        <label for=''>ESRB</label>
        <span>{{gameData.ESRB}}</span>
      </div>
      <div>
        <label for=''>Genres</label>
        <div v-for="(genre, index) in gameData.genres" :key="index">
          <input
          required
          v-model="gameData.genres[index]"
          type="text"
          v-bind:placeholder="genre"/>
        </div>
        <button @click="addGenre">New genre</button>
        <button @click="removeGenre">Delete last genre</button>
      </div>
      <div>
        <label>Overview</label>
        <textarea
        required
        v-model="gameData.overview"
        type="text"
        v-bind:placeholder="gameData.overview"/>
      </div>
    </div>
  </div>
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

h1 {
  text-align: left;
  padding-left: 38%;
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
  max-height: 100%;
  max-width: 100%;
}


.flip-container {
	perspective: 1000px;
}
/* flip the pane when hovered */
.flip-container:hover .flipper, .flip-container.hover .flipper {
  transform: rotateY(180deg);
}

.flip-container, .front, .back {
	width: 300px;
	height: 374px;

}

.flip-container img {
  margin-left: auto;
	margin-right: auto;
  max-height: 100%;
  max-width: 100%;
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

@media (max-width: 830px) {
  #images {
    margin-top: 10px;
    float: none;
  }

  .container {
    padding-left: 0;
  }

  #banner {
    margin-top: 30%;
  }

  input {
    margin: 5%;
  }

}

</style>
