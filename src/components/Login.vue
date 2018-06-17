<template>
 <div>
   <nav><router-link to="/register">Sign Up</router-link></nav>
   <form class="login" @submit.prevent="login">
     <h1>Sign In</h1>
     <label>Username</label>
     <input required v-model="username" type="text" placeholder="Username"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
   <p v-if="error" class="error">Bad login information</p>
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
      this.$http.post('http://localhost:8080/login',{ login: username, password})
        .then((response) => {
          this.$store.dispatch('login', response);
          this.$router.push('/');
        }).catch(error => this.error = error);
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
