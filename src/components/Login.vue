<template>
 <div>
   <img class='full-logo' src='/static/images/full-logo.png'/>
   <nav id='register'><router-link id='to-register' to="/register">Sign Up</router-link></nav>
   <form class="login" @submit.prevent="login">
     <h1>Sign In</h1>
     <label>Username</label>
     <input required id="user-input" v-model="username" type="text" placeholder="Username"/>
     <label>Password</label>
     <input required id="pass-input" v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button id="login-button" type="submit">Login</button>
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
      this.$http.post('login', { login: username, password })
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

.full-logo {
  max-width: 90%;
  margin-top: 60px;
}

@media (max-width: 600px) {
  .full-logo {
    margin-top: 10%;
  }

  input {
    margin: 5%;
  }

}
</style>
