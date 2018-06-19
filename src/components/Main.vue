<template>
  <upload-rom/>
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
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
