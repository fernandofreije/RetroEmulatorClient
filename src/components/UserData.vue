<template>
  <div>
   <form class="userData" @submit.prevent="validateBeforeSubmit()">
     <h1>User Data</h1>
     <div class='input-container'>
      <label>Username</label>
      <input v-validate="'required'"
      v-model="user" name="username"
      type="text" placeholder="Username"/>
     </div>
     <div class='input-container'>
      <label>Email</label>
      <input v-validate="'required'"
      v-model="email" name="email"
      type="email" placeholder="Email"/>
     </div>
     <div class='input-container'>
      <label>Password</label>
      <input
      v-model="password"
      name="password"
      type="password"
      placeholder="Password"/>
     </div>
     <div class='input-container'>
      <label>Confirm Password</label>
      <input v-validate="{is: password}"
      name="password_confirmation"
      type="password"
      placeholder="Password, Again"
      data-vv-as="password">
     </div>
     <hr/>
     <button type="submit">Save</button>
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
   <p v-if="changed && !error" class="error">Click save to save the changes</p>
   <p v-if="error" class="error">Update was not posible</p>
 </div>
</template>

<script>
export default {
  name: 'UserData',
  mounted() {
    this.email = this.o_email;
    this.user = this.o_user;
  },
  computed: {
    o_email: {
      get() {
        return this.$store.state.user.email;
      }
    },
    o_user: {
      get() {
        return this.$store.state.user.username;
      }
    },
    changed: {
      get() {
        return this.email !== this.o_email || this.user !== this.o_user || this.password;
      }
    }
  },
  data() {
    return {
      email: '',
      user: '',
      password: '',
      error: '',
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator
        .validateAll()
        .then(() => {
          if (this.errors.items.length === 0) {
            this.updateUser();
          }
        })
        .catch((error) => {
          this.error = error;
        });
    },
    updateUser() {
      const { user, email, password } = this;
      if (password !== '') {
        this.$http.put('changeData', { user, email, password })
          .then(() => this.$store.dispatch('updateUserData', { user, email }))
          .catch((error) => {
            this.error = error;
          });
      } else {
        this.$http.put('changeData', { user, email })
          .then(() => this.$store.dispatch('updateUserData', { user, email }))
          .catch((error) => {
            this.error = error;
          });
      }
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

.userData {
  margin: auto;
  width: 70%;
}

.input-container {
  text-align: center;
  padding: 10px;
}


@media (max-width: 600px) {

  input {
    margin: 5%;
  }

}
</style>
