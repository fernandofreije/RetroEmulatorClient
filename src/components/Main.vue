<template>
<div>
  <my-navbar/>
  <router-view/>
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

</style>
