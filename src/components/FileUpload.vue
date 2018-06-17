<template>
  <div>
  <vue-dropzone
  ref="myVueDropzone"
  id="dropzone"
  :options="dropzoneOptions">
  </vue-dropzone>
  <button v-if="!this.withoutButton" v-on:click="send">Send</button>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'FileUpload',
  components: {
    vueDropzone: vue2Dropzone,
  },
  props: {
    withoutButton: {
      default: false,
      type: Boolean
    },
    paramName: {
      default: 'file',
      type: String
    },
    message: {
      default: 'Drop you file here',
      type: String
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'http://localhost:8080/roms/upload',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        paramName: this.paramName,
        dictDefaultMessage: this.message,
        autoProcessQueue: false,
        withCredentials: true
      }
    };
  },
  methods: {
    send() {
      return vue2Dropzone.processQueue();
    },
    getFiles() {
      return vue2Dropzone.getQueuedFiles();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
