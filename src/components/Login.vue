<template>
 <div>
   <img src='../assets/images/full-logo.png'/>
   <nav class='top-right-corner'><b-link to="/register">Sign Up</b-link></nav>
   <form class="login" @submit.prevent="login">
     <h1>Sign In</h1>
     <label>Username</label>
     <b-form-input required v-model="username" type="text" placeholder="Username"/>
     <label>Password</label>
     <b-form-input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <b-button type="submit">Login</b-button>
   </form>
   <p v-if="error" class="error">Bad login information </p>
 </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    login() {
      const { username, password } = this;
      this.$http.post('http://localhost:8080/login', { login: username, password })
        .then(response => this.$store.dispatch('login', response.data.user))
        .catch((error) => { this.error = error; });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
    color: red;
  }
</style>
