<template>
  <form-wizard
  ref="wizard"
  finishButtonText="Upload it!"
  shape="square"
  color="#ED1B31"
  title=""
  subtitle=""
  @on-change="handleTabChanged">
    <loading
      :show="loading"
      :label="label">
    </loading>
    <tab-content title="Upload your rom">
      <file-upload ref="FileUpload"
      withoutButton
      paramName="romFile"
      message="Drop your rom here!"/>
    </tab-content>
    <tab-content title="Scrap the data">
        <scrapper-selector ref="ScrapperSelector"></scrapper-selector>
    </tab-content>
    <tab-content title="Edit the data">
      <game-data/>
    </tab-content>
     <template slot="footer" slot-scope="props">
       <div class=wizard-footer-left>
           <wizard-button
           v-if="props.activeTabIndex > 0"
           @click.native="props.prevTab()"
           :style="props.fillButtonStyle">Previous</wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep && currentState==0"
          @click.native="props.nextTab()"
          class="wizard-footer-right"
          :style="props.fillButtonStyle"
          :disabled="nextDisabled1">Next</wizard-button>
          <wizard-button
          v-else-if="!props.isLastStep && currentState==1"
          @click.native="props.nextTab()"
          class="wizard-footer-right"
          :style="props.fillButtonStyle"
          :disabled="nextDisabled2">Next</wizard-button>
          <wizard-button
          v-else @click.native="onComplete"
          class="wizard-footer-right finish-button"
          :style="props.fillButtonStyle">
          {{props.isLastStep ? 'Upload it!' : 'Next'}}</wizard-button>
        </div>
      </template>
  </form-wizard>
</template>

<script>
import loading from 'vue-full-loading';
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import FileUpload from './FileUpload';
import ScrapperSelector from './ScrapperSelector';
import GameData from './GameData';
import EventBus from '../event-bus';


export default {
  name: 'UploadRom',
  components: {
    FileUpload,
    ScrapperSelector,
    loading,
    FormWizard,
    TabContent,
    WizardButton,
    GameData
  },
  created() {
    EventBus.$on('file-added', this.onFileAdded);
    EventBus.$on('file-removed', this.onFileRemoved);
    EventBus.$on('file-uploaded', this.onFileUploaded);
  },
  destroyed() {
    EventBus.$off('file-added', this.onFileAdded);
    EventBus.$off('file-removed', this.onFileRemoved);
    EventBus.$off('file-uploaded', this.onFileUploaded);
  },
  data() {
    return {
      currentState: 0,
      label: 'Uploading your rom...',
      loading: false
    };
  },
  computed: {
    nextDisabled1: {
      get() {
        return this.$store.state.uploadRom.firstNextDisabled;
      }
    },
    nextDisabled2: {
      get() {
        return this.$store.state.uploadRom.secondNextDisabled;
      }
    },
    gameData: {
      get() {
        return this.$store.state.gameData;
      }
    }
  },
  methods: {
    onComplete() {
      this.loading = true;
      this.$refs.FileUpload.send();
    },
    handleTabChanged(prev, next) {
      this.currentState = next;
      this.$refs.wizard.tabs.slice(1).forEach((tab) => { tab.checked = false; });
      this.$refs.wizard.maxStep = next;
      if (next < 1) this.$store.commit('deselectGameData');
      if (next < 2) this.$store.commit('removeGameData');
    },
    restartForm() {
      this.$store.commit('resetUploadRom', this.$refs.wizard);
      this.$refs.FileUpload.removeAllFiles();
    },
    onFileAdded(file) {
      this.$store.dispatch('uploadedRomFile', file);
    },
    onFileRemoved() {
      this.$store.dispatch('removedRomFile');
    },
    onFileUploaded(file, responseUpload) {
      const rom = this.$store.state.gameData;
      rom.file = responseUpload.fileUrl;
      this.$http.post('roms/', rom)
        .then(() => {
          this.loading = false;
          this.$swal('Congratulations', 'romUploaded', 'success').then(() => {
            this.restartForm();
            this.$router.push('/');
          });
        })
        .catch(() => {
          this.loading = false;
          this.$store.commit('resetUploadRom', this.$refs.wizard);
          this.$swal('Ups!', 'A problem has ocurred', 'error').then(() => this.restartForm());
        });
      this.$store.dispatch('removedRomFile');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wizard-icon-circle {
  background-color: black;
}
</style>
