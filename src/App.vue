<template>
  <v-app id="app">
    <v-navigation-drawer app v-model="drawer"
      ><Drawer
        :previousAnswers="previousAnswers"
        @emitClearPreviousAnswers="clearPreviousAnswers"
    /></v-navigation-drawer>

    <v-app-bar absolute flat color="white" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Ikura?</v-toolbar-title>
    </v-app-bar>
    <v-content class="content">
      <Input :answer-num="answerNum" :answer-counter="answerCounter.kanji" />
      <Popup ref="popup" :randNum="randNum" :counter="counter" />

      <section class="options">
        <OptionPlaceValue
          @emitPlaceVal="setPlaceValue"
          :placeValue="placeValue"
        />

        <OptionDecimal
          @emitFloatVal="setFloat"
          :isFloat="isFloat"
          :decimalPlace="decimalPlace"
        />

        <v-btn
          large
          icon
          dark
          :outlined="slow"
          @click="
            slow = !slow;
            repeatSpeak();
          "
          ><v-icon>mdi-speedometer-slow</v-icon></v-btn
        >

        <v-btn large icon dark @click="giveUp()"
          ><v-icon>mdi-new-box</v-icon></v-btn
        >
        <v-btn large icon dark @click="repeatSpeak()"
          ><v-icon>mdi-replay</v-icon></v-btn
        >
      </section>

      <Keypad
        @addNum="addNum"
        @selectCounter="selectCounter"
        @bksp="bksp"
        @clear="clear"
        @enter="answerQuestion"
        :answer-num="answerNum"
      />

      <v-dialog v-model="start" persistent max-width="290">
        <v-card>
          <v-card-actions class="start">
            <v-btn
              color="primary"
              x-large
              @click="
                start = false;
                newQuestion();
              "
              >Start</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import _ from "lodash";
import { speakCorrect, speakIncorrect, speak } from "./utils/speak";
import COUNTERS_LIST from "./utils/constants";
import Keypad from "./components/Keypad.vue";
import Drawer from "./components/Drawer.vue";
import Input from "./components/Input.vue";
import OptionDecimal from "./components/OptionDecimal.vue";
import OptionPlaceValue from "./components/OptionPlaceValue.vue";
import Popup from "./components/Popup.vue";

export default {
  name: "App",
  components: {
    Keypad,
    Drawer,
    Input,
    OptionDecimal,
    OptionPlaceValue,
    Popup
  },
  data() {
    return {
      drawer: false,
      counters: COUNTERS_LIST,
      randNum: null,
      isFloat: false,
      placeValue: 1,
      decimalPlace: 1,
      answerNum: "",
      answerCounter: {},
      previousAnswers: [],
      tries: 0,
      slow: false,
      counter: null,
      start: true
    };
  },
  mounted() {
    if (localStorage.previousAnswers) {
      this.previousAnswers = JSON.parse(localStorage.previousAnswers);
    }
  },
  watch: {
    previousAnswers(newVal) {
      localStorage.previousAnswers = JSON.stringify(newVal);
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
      this.counter = this.counters[_.random(0, this.counters.length - 1)];
    },
    setAnswerNum(val) {
      this.answerNum = val;
    },
    async answerQuestion() {
      this.tries++;
      if (this.answer == this.questionValue) {
        speakCorrect();
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
        speakIncorrect();
      }
    },
    async giveUp() {
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
    setFloat(val) {
      this.isFloat = val.bool;
      this.decimalPlace = val.decimalPlace;
      this.newQuestion();
    },
    setPlaceValue(val) {
      this.placeValue = val;
    },
    repeatSpeak() {
      speak(this.questionValue.trim(), this.slow);
    },
    addNum(key) {
      this.answerNum = this.answerNum + key;
    },
    selectCounter(index) {
      this.answerCounter = this.counters[index];
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

<style>
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
.options {
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #d12771;
  padding: 1rem;
  z-index: 1;
}
.v-dialog {
  background: white;
}
.start {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
