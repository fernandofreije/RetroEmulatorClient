<template>
  <form-wizard
  ref="wizard"
  finishButtonText="Upload it!"
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
      <form v-if="gameData">
        <h1>Rom data</h1>
        <img v-bind:src="gameData.boxartFront"/>
        <label>Title</label>
        <input
        required
        v-model="gameData.title"
        type="text"
        v-bind:placeholder="gameData.title"/>
        <label>Overview</label>
        <textarea
        required
        v-model="gameData.overview"
        type="text"
        v-bind:placeholder="gameData.overview"/>
      </form>
    </tab-content>

     <template slot="footer" slot-scope="props">
       <div class=wizard-footer-left>
           <wizard-button
           v-if="props.activeTabIndex > 0 && !props.isLastStep"
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
import EventBus from '../event-bus';


export default {
  name: 'UploadRom',
  components: { FileUpload, ScrapperSelector, loading, FormWizard, TabContent, WizardButton },
  mounted() {
    EventBus.$on('file-added', (file) => {
      this.$store.dispatch('uploadedRomFile', file);
    });
    EventBus.$on('file-removed', () => {
      this.$store.dispatch('removedRomFile');
    });
    EventBus.$on('file-uploaded', (file, responseUpload) => {
      const rom = this.$store.state.uploadRom.gameData;
      rom.file = responseUpload.fileUrl;
      this.$http.post('http://localhost:8080/roms/', rom)
        .then(() => {
          this.loading = false;
          this.$swal('Congratulations', 'romUploaded', 'success').then(() => this.restartForm());
        })
        .catch(() => {
          this.loading = false;
          this.$store.commit('resetUploadRom', this.$refs.wizard);
          this.$swal('Ups!', 'A problem has ocurred', 'error').then(() => this.restartForm());
        });
      this.$store.dispatch('removedRomFile');
    }
    );
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
        return this.$store.state.uploadRom.gameData;
      }
    }
  },
  data() {
    return {
      currentState: 0,
      label: 'Uploading your rom...',
      loading: false
    };
  },
  methods: {
    onComplete() {
      this.loading = true;
      this.$refs.FileUpload.send();
    },
    handleTabChanged(prev, next) {
      this.currentState = next;
    },
    restartForm() {
      this.$store.commit('resetUploadRom', this.$refs.wizard);
      this.$refs.FileUpload.removeAllFiles();
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
