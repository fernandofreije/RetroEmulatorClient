<template>
<div>
  <my-navbar/>
  <transition name="slide" enter-active-class="slideInLeft" leave-active-class="slideOutRight">
    <router-view id='main'/>
  </transition>
</div>
</template>

<script>
import RomList from './RomList';
import MyNavbar from './Navbar';


export default {
  name: 'Main',
  components: { RomList, MyNavbar }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
  animation-duration: 0.5s;
}
</style>
