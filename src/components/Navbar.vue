<template>
<nav>
  <ul>
    <li class='logo'>
      <router-link to="/"><img src="/static/images/logo.png"/></router-link>
    </li>
    <li>
      <router-link to="">{{username}}</router-link>
    </li>
    <li>
      <router-link to="/login" v-on:click="logout">Logout</router-link>
    </li>
    <li>
      <router-link to="/uploadRom" v-on:click="logout">Upload a Rom</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    username: {
      get(){
        return this.$store.state.user.username;
      }
    }
  },
  methods: {
    logout() {
      this.$http.get('http://localhost:8080/logout')
        .then(() => {
          this.$store.dispatch('logout');
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

nav {
  background-color: #ED1B31;
}

ul {
  list-style-type: none;
}

img {
  height: 30px;
}

.logo{
  background-color:black;
  width:100%;
}

</style>
