<template>
  <b-navbar>
    <b-nav-item right>
      <b-link class='top-right-corner' v-on:click="logout" to="/login">Logout</b-link>
    </b-nav-item>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
