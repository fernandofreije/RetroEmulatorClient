<template>
  <form-wizard finishButtonText="Upload it!" title="" subtitle="" @on-complete="onComplete">
    <tab-content title="Upload your rom" :before-change="fillScrapGames">
      <file-upload withoutButton paramName="romFile" message="Drop your rom here!">
      </file-upload>
    </tab-content>
    <tab-content title="Scrap the data">
        <scrapper-selector></scrapper-selector>
    </tab-content>
    <tab-content title="Edit the data">
      Yuhuuu! This seems pretty damn simple
    </tab-content>
  </form-wizard>
</template>

<script>
import FileUpload from './FileUpload';
import ScrapperSelector from './ScrapperSelector';
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  name: 'UploadRom',
  components: { FileUpload, FormWizard, TabContent, ScrapperSelector },
  methods: {
    uploadRom(){
      this.$refs.FileUpload.send();
    },
    onComplete(){
      this.$swal('Finish');
    },
    fillScrapGames(){
      this.$refs.ScrapperSelector.fillGames();
    }
  }
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
