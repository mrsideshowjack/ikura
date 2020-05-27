<template>
  <v-app id="app">
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar absolute flat color="white" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Ikura?</v-toolbar-title>
    </v-app-bar>
    <v-content class="content">
      <Input :answer-num="answerNum" :answer-counter="answerCounter" />
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

        <v-btn large icon dark @click="newQuestion()"
          ><v-icon>mdi-new-box</v-icon></v-btn
        >
        <v-btn large icon dark @click="repeatSpeak()"
          ><v-icon>mdi-autorenew</v-icon></v-btn
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
    </v-content>
  </v-app>
</template>

<script>
import _ from "lodash";
import speak from "./utils/speak";
import COUNTERS_LIST from "./utils/constants";
import Keypad from "./components/Keypad.vue";
import Input from "./components/Input.vue";
import OptionDecimal from "./components/OptionDecimal.vue";
import OptionPlaceValue from "./components/OptionPlaceValue.vue";

export default {
  name: "App",
  components: {
    Keypad,
    Input,
    OptionDecimal,
    OptionPlaceValue
  },
  data() {
    return {
      counters: COUNTERS_LIST,
      randNum: null,
      isFloat: false,
      placeValue: 1,
      decimalPlace: 1,
      answerNum: "",
      answerCounter: "",
      previousAnswers: [],
      tries: 0,
      counter: null
    };
  },
  mounted() {
    this.newQuestion();
  },
  computed: {
    questionValue() {
      return `${_.round(this.randNum, this.decimalPlace)} ${this.counter}`;
    },
    answer() {
      return `${this.answerNum} ${this.answerCounter}`;
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
      this.answerNum = "";
      this.answerCounter = "";
      this.genQuestionValue();
      this.repeatSpeak();
    },
    genQuestionValue() {
      this.randNum = _.random(0, this.numMax, this.isFloat);
      this.counter = this.counters[_.random(0, this.counters.length - 1)].kanji;
    },
    setAnswerNum(val) {
      this.answerNum = val;
    },
    answerQuestion() {
      this.tries++;
      if (this.answer == this.questionValue) {
        speak("正解");
        this.previousAnswers.push({
          questionValue: this.questionValue,
          answer: this.answer,
          tries: this.tries
        });
        this.newQuestion();
      } else {
        speak("違う");
      }
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
      speak(this.questionValue);
    },
    addNum(key) {
      this.answerNum = this.answerNum + key;
    },
    selectCounter(index) {
      this.answerCounter = this.counters[index].kanji;
    },
    bksp() {
      this.answerNum = this.answerNum.slice(0, -1);
    },
    clear() {
      this.answerNum = "";
      this.answerCounter = "";
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
  justify-content: space-between;
  background-color: #d12771;
  padding: 1rem;
}
.v-dialog {
  background: white;
}
</style>
