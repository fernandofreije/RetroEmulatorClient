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
      <router-link to="/uploadRom" v-on:click="logout">Upload</router-link>
    </li>
    <li class='logout'>
      <router-link to="/login" v-on:click="logout">Logout</router-link>
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
      this.$http.get('logout')
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
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  text-align: center;
  padding: 8px;
  text-decoration: none;
}

li img {
  display: block;
  height: 30px;
}

.logo {
  background-color:darkgray;
}

.logout {
  float: right;
}

@media (max-width: 600px) {

  li {
    float: none;
  }

  li a {
    display: block;
    text-align: center;
    padding: 16px;
    text-decoration: none;
  }

  li img {
    display: block;
    height: 30px;
  }

  .logout {
    float: none;
  }
}

</style>
