<template>
  <v-app id="app">
    <v-navigation-drawer app v-model="drawer"
      ><Drawer
        :previousAnswers="previousAnswers"
        :settings="settings"
        @emitClearPreviousAnswers="clearPreviousAnswers"
        @emitSettings="setSettings"
    /></v-navigation-drawer>

    <v-app-bar absolute flat color="white" app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        aria-label="drawer icon button"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Josūshi</v-toolbar-title>
    </v-app-bar>
    <v-content class="content">
      <Popup ref="popup" :randNum="randNum" :counter="counter" />
      <Input
        :answer-num="answerNum"
        :answer-counter="answerCounter.kanji"
        :color="inputColor"
      />

      <transition name="fade">
        <v-icon v-if="speaking" class="speaking-icon">
          {{ icoVolumeHigh }}</v-icon
        >
      </transition>

      <transition name="push">
        <section class="options" v-if="!start">
          <OptionPlaceValue
            @emitPlaceVal="setPlaceValue"
            :placeValue="placeValue"
          />

          <OptionDecimal
            @emitFloatVal="setFloat"
            :isFloat="isFloat"
            :decimalPlace="decimalPlace"
          />

          <OptionSelectCounters
            @emitCounters="setSelectedCounters"
            :counters="counters"
          />

          <v-btn large icon dark @click="giveUp()"
            ><v-icon>{{ icoNewBox }}</v-icon></v-btn
          >
          <v-btn large icon dark @click="repeatSpeak()"
            ><v-icon>{{ icoReplay }}</v-icon></v-btn
          >
        </section>
      </transition>

      <Keypad
        v-if="!start"
        @addNum="addNum"
        @selectCounter="selectCounter"
        @bksp="bksp"
        @clear="clear"
        @enter="answerQuestion"
        :availibleCounters="availibleCounters"
        :answerNum="answerNum"
      />
      <div v-else class="start">
        <v-btn
          color="primary"
          x-large
          @click="
            start = false;
            newQuestion();
          "
          >Start</v-btn
        >
      </div>
    </v-content>
  </v-app>
</template>

<script>
import _ from "lodash";
// Utils / consts
import { speakCorrect, speakIncorrect, speak } from "./utils/speak";
import COUNTERS_LIST from "./utils/constants";
// Components
import Keypad from "./components/Keypad.vue";
import Drawer from "./components/Drawer.vue";
import Input from "./components/Input.vue";
import OptionDecimal from "./components/OptionDecimal.vue";
import OptionPlaceValue from "./components/OptionPlaceValue.vue";
import OptionSelectCounters from "./components/OptionSelectCounters.vue";
import Popup from "./components/Popup.vue";
// Icons
import { mdiNewBox, mdiReplay, mdiVolumeHigh } from "@mdi/js";

export default {
  name: "App",
  components: {
    Keypad,
    Drawer,
    Input,
    OptionDecimal,
    OptionPlaceValue,
    OptionSelectCounters,
    Popup
  },
  data() {
    return {
      drawer: false,
      counters: COUNTERS_LIST,
      selectedCounters: [],
      randNum: null,
      inputColor: null,
      isFloat: false,
      placeValue: 1,
      decimalPlace: 1,
      answerNum: "",
      answerCounter: {},
      previousAnswers: [],
      tries: 0,
      slow: false,
      counter: null,
      start: true,
      speaking: false,
      settings: {
        settingUseHTMLTTS: false
      },
      // Icons
      icoNewBox: mdiNewBox,
      icoReplay: mdiReplay,
      icoVolumeHigh: mdiVolumeHigh
    };
  },
  mounted() {
    if (localStorage.previousAnswers) {
      this.previousAnswers = JSON.parse(localStorage.previousAnswers);
    }
    if (localStorage.settings) {
      this.settings = JSON.parse(localStorage.settings);
    }
  },
  created() {
    // Listen for the event.
    window.addEventListener("spoken", this.hasSpoken);
    window.addEventListener("keydown", this.doCommand);
  },
  destroyed() {
    window.removeEventListener("keydown", this.doCommand);
    window.removeEventListener("spoken", this.hasSpoken);
  },
  watch: {
    previousAnswers(newVal) {
      localStorage.previousAnswers = JSON.stringify(newVal);
    },
    settings(newVal) {
      localStorage.settings = JSON.stringify(newVal);
    },
    // Set the counter when there is only 1
    availibleCounters() {
      if (this.availibleCounters.length === 1) this.selectCounter(0);
    }
  },
  computed: {
    questionValue() {
      return _.round(this.randNum, this.decimalPlace) + this.counter.kanji;
    },
    answer() {
      return this.answerNum + this.answerCounter.kanji;
    },
    numMax() {
      let max = "";
      for (let i = 0; i < this.placeValue; i++) {
        max += "9";
      }
      return parseInt(max);
    },
    availibleCounters() {
      if (this.selectedCounters.length)
        return this.selectedCounters
          .slice()
          .sort((a, b) => (a.order > b.order ? 1 : -1));
      return this.counters.slice().sort((a, b) => (a.order > b.order ? 1 : -1));
    }
  },
  methods: {
    newQuestion() {
      this.tries = 0;
      this.clear();
      this.genQuestionValue();
      this.repeatSpeak();
    },
    genQuestionValue() {
      this.randNum = _.random(0, this.numMax, this.isFloat);
      this.counter = this.availibleCounters[
        _.random(0, this.availibleCounters.length - 1)
      ];
    },
    setAnswerNum(val) {
      this.answerNum = val;
    },
    hasSpoken() {
      this.speaking = false;
      this.inputColor = null;
    },
    doCommand(e) {
      let key = e.key;
      const isNum = /^\d+$/;
      if (isNum.test(key)) this.addNum(key.toString());
      else if (key == "Enter") this.answerQuestion();
      else if (key == "Backspace") this.bksp();
      else if (key == "n") this.giveUp();
      else if (key == "r") this.repeatSpeak();
    },
    async answerQuestion() {
      this.tries++;
      this.speaking = true;
      if (this.answer == this.questionValue) {
        this.inputColor = "green";
        speakCorrect(this.settings.settingUseHTMLTTS);
        this.previousAnswers.push({
          questionValue: this.questionValue,
          answer: this.answer,
          tries: this.tries,
          correct: true
        });
        await this.$refs.popup.popup(true).then(() => {
          this.newQuestion();
        });
      } else {
        this.inputColor = "red";
        speakIncorrect(this.settings.settingUseHTMLTTS);
      }
    },
    async giveUp() {
      this.inputColor = "red";
      this.repeatSpeak();
      this.previousAnswers.push({
        questionValue: this.questionValue,
        answer: this.answer,
        tries: this.tries,
        correct: false
      });
      await this.$refs.popup.popup(false).then(() => {
        this.newQuestion();
      });
    },
    setSelectedCounters(val) {
      this.selectedCounters = val;
    },
    setSettings(val) {
      this.settings = val;
    },
    setFloat(val) {
      this.isFloat = val.bool;
      this.decimalPlace = val.decimalPlace;
      this.newQuestion();
    },
    setPlaceValue(val) {
      this.placeValue = val;
    },
    repeatSpeak() {
      this.speaking = true;
      speak(
        this.questionValue.trim(),
        this.slow,
        this.settings.settingUseHTMLTTS
      );
    },
    addNum(key) {
      this.answerNum = this.answerNum + key;
    },
    selectCounter(index) {
      this.answerCounter = this.availibleCounters[index];
    },
    bksp() {
      this.answerNum = this.answerNum.slice(0, -1);
    },
    clear() {
      this.answerNum = "";
      this.answerCounter = {};
    },
    clearPreviousAnswers() {
      this.previousAnswers = [];
    }
  }
};
</script>

<style lang="css">
@import "./assets/css/main.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.v-content__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.v-dialog {
  background: var(--white-background);
}
.speaking {
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
}
.speaking-icon {
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  border: 1px solid lightgray;
}
.options {
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: var(--main-pink);
  padding: 1rem;
  z-index: 1;
}
.start {
  width: 100vw;
  max-height: 60vh;
  height: calc(60vh / 5 * 4);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--keypad-background);
  color: var(--white-txt);
  z-index: 1;
}
</style>
