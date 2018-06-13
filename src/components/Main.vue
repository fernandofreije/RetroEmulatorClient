<template>
  <div class="hello">
    <file-upload></file-upload>
  </div>
</template>

<script>
import FileUpload from './FileUpload';

export default {
  name: 'Main',
  components: { 'file-upload': FileUpload },
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
