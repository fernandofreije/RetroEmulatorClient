<template>
  <div class="hello">
    <nav><router-link v-on:click="logout" to="/login">Logout</router-link></nav>
    <upload-rom></upload-rom>
    <button v-on:click="test">Test auth</button>
  </div>
</template>

<script>
import UploadRom from './UploadRom';

export default {
  name: 'Main',
  components: { UploadRom },
  methods: {
    logout() {
      this.$http.get('http://localhost:8080/logout')
        .then(() => {
          this.$store.dispatch('logout');
          this.$router.push('/login');
        })
        .catch(error => console.log(error));
    },
    test() {
      this.$http.get('http://localhost:8080/users')
        .then((response) => {
          console.log(response);
        })
        .catch(error => console.log(error));
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
