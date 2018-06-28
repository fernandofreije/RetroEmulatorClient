<template>
  <div id="app">
    <transition name="zoom">
      <router-view id="content"/>
    </transition>
    <footer><footer-component/></footer>
  </div>
</template>

<script>
import FooterComponent from './components/Footer';

export default {
  name: 'App',
  components: { FooterComponent }
};
</script>

<style>
@font-face {
    font-family: 'gamegirl';
    src: url('/static/fonts/gamegirl-webfont.woff2') format('woff2'),
         url('/static/fonts/gamegirl-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}
#app {
  font-family: 'gamegirl', 'Avenir', Helvetica, Arial, sans-serif, ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}

html {
  height: 100%;
}

body {
  font-family: 'gamegirl';
  background-color: black;
  color: white;
  height: 100%;
  margin: 0;
}

#content {
  flex: 1 0 auto;
}

footer{
   /* Like the header, the footer will have a static height - it shouldn't grow or shrink.  */
   /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
   flex: 0 0 auto;
}

a {
  color: white;
}

input {
    background: transparent;
    font-family: 'gamegirl';
    border: none;
    color: white;
    border-bottom: 1px solid white;
    font-size: 14px;
}

textarea {
    background: transparent;
    font-family: 'gamegirl';
    border: none;
    color: white;
    border-bottom: 1px solid white;
}

button {
  background-color: black;
  font-family: 'gamegirl';
  border: white;
  border-style: solid;
  border-width: 2px;
  color: white;
}

button:hover {
  background-color: white;
  color: black;
}

.top-right-corner {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
