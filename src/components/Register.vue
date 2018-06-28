<template>
  <div>
   <nav id='login' class="top-right-corner"><router-link to="/login">Back to Sign In</router-link></nav>
   <form class="register" @submit.prevent="validateBeforeSubmit()">
     <h1>Sign In</h1>
     <div class='input-container'>
      <label>Username</label>
      <input v-validate="'required'" v-model="username" name="username" type="text" placeholder="Username"/>
     </div>
     <div class='input-container'>
      <label>Email</label>
      <input v-validate="'required'" v-model="email" name="email" type="email" placeholder="Username"/>
     </div>
     <div class='input-container'>
      <label>Password</label>
      <input v-validate="'required'"
      name="password"
      type="password"
      placeholder="Password"/>
     </div>
     <div class='input-container'>
      <label>Confirm Password</label>
      <input v-validate="'confirmed:password'"
      name="password_confirmation"
      type="password"
      placeholder="Password, Again"
      data-vv-as="password">
     </div>
     <hr/>
     <button type="submit">Register</button>
   </form>
   <div class="error" v-show="errors.any()">
     <div v-if="errors.has('username')">
      {{ errors.first('username') }}
    </div>
    <div v-if="errors.has('email')">
      {{ errors.first('email') }}
    </div>
    <div v-if="errors.has('password')">
      {{ errors.first('password') }}
    </div>
    <div v-if="errors.has('password_confirmation')">
      {{ errors.first('password_confirmation') }}
    </div>
  </div>
   <p v-if="error" class="error">Sign in was not posible</p>
 </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      username: '',
      password1: '',
      password2: '',
      error: '',
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator
        .validateAll()
        .then(function(response) {
          const { username, email, password1, password2 } = this;
          this.$http.post('register', { username, email, password: password1})
            .then(response => this.$store.dispatch('login', response.data.user))
        })
        .catch(function(e) {
          this.error = error;
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
    color: red;
    padding: 10px;
  }

a {
  margin-top: 10px;
  margin-right: 10px;
}

.register {
  margin: auto;
  width: 50%;
}

.input-container {
  text-align: left;
  padding: 10px;
}


@media (max-width: 600px) {

  input {
    margin: 5%;
  }

}
</style>
