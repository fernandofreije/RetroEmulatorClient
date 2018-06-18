<template>
  <form-wizard finishButtonText="Upload it!" title="" subtitle="" @on-change="handleTabChanged">
    <tab-content title="Upload your rom">
      <file-upload ref="FileUpload" withoutButton paramName="romFile" message="Drop your rom here!">
      </file-upload>
    </tab-content>
    <tab-content title="Scrap the data">
        <scrapper-selector ref="ScrapperSelector"></scrapper-selector>
    </tab-content>
    <tab-content title="Edit the data">
      Yuhuuu! This seems pretty damn simple
    </tab-content>

     <template slot="footer" slot-scope="props">
       <div class=wizard-footer-left>
           <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep && currentState==0" @click.native="props.nextTab()" class="wizard-footer-right" 
          :style="props.fillButtonStyle" :disabled="nextDisabled1">Next</wizard-button>
          <wizard-button v-else-if="!props.isLastStep && currentState==1" @click.native="props.nextTab()" class="wizard-footer-right" 
          :style="props.fillButtonStyle" :disabled="nextDisabled2">Next</wizard-button>
          <wizard-button v-else @click.native="onComplete" class="wizard-footer-right finish-button"
           :style="props.fillButtonStyle">{{props.isLastStep ? 'Upload it!' : 'Next'}}</wizard-button>
        </div>
      </template>

  </form-wizard>
  
</template>

<script>
import FileUpload from './FileUpload';
import ScrapperSelector from './ScrapperSelector';
import EventBus from '../event-bus.js';

export default {
  name: 'UploadRom',
  components: { FileUpload, ScrapperSelector },
  mounted(){
    EventBus.$on('file-added', (file) => {
      this.$store.dispatch('uploadedRomFile', file);
      }
    );
    EventBus.$on('file-removed', (file) => {
      this.$store.dispatch('removedRomFile');
      }
    );
  },
  computed:{
    nextDisabled1:{
      get(){
        return this.$store.state.uploadRom.firstNextDisabled;
      }
    },
    nextDisabled2:{
      get(){
        return this.$store.state.uploadRom.secondNextDisabled;
      }
    }
  },
  data() {
    return {
      currentState: 0
    }
  },
  methods: {
    uploadRom(){
      this.$refs.FileUpload.send();
    },
    onComplete(){
      this.$swal('Finish');
    },
    setLoading: function(value) {
            this.loadingWizard = value
    },
    handleTabChanged(prev, next) {
      console.log(next);
      this.currentState = next;
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
