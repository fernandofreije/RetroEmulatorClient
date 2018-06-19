<template>
  <div>
  <vue-dropzone
  v-on:vdropzone-file-added="emitAddedFile"
  v-on:vdropzone-removed-file="emitRemovedFile"
  v-on:vdropzone-success="emitFileUploaded"
  :include-styling="true"
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
import EventBus from '../event-bus';

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
        maxFiles: 1,
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
      return this.$refs.myVueDropzone.processQueue();
    },
    getFiles() {
      return this.$refs.myVueDropzone.getQueuedFiles();
    },
    removeAllFiles() {
      return this.$refs.myVueDropzone.removeAllFiles();
    },
    emitFileUploaded(file, response) {
      EventBus.$emit('file-uploaded', file, response);
    },
    emitAddedFile(file) {
      EventBus.$emit('file-added', file);
    },
    emitRemovedFile(file, error, xhr) {
      EventBus.$emit('file-removed', { file, error, xhr });
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#dropzone {
  border-style: solid;
  border-width: 2px;
  color: white;
  background-color: black;
  color: white;
  font-family: 'gamegirl';
}

#dropzone .dz-upload {
  display: none;
}
</style>
