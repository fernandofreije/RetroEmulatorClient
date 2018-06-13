<template>
  <div>
    <p>To Be Implemented</p>
    <router-link to="/login">
      <a>Back to Sign In</a>
    </router-link>
   </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password1: '',
      password2: '',
      disable_btn: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  font-size: 56px;
}
.error {
  color: red;
}
</style>
