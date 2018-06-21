<template>
<div>
  <my-navbar/>
  <transition id='main-transition' name="slide" enter-active-class="slideInLeft" leave-active-class="slideOutRight">
    <router-view/>
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
#main-transition {
  animation-duration: 5s;
}
</style>
