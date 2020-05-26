<template>
  <v-app id="app">
    <v-content class="content">
      <Input :answer-num="answerNum" :answer-counter="answerCounter" />
      <section class="options">
        <v-btn
          @click="
            isFloat = !isFloat;
            newQuestion();
          "
        >
          float {{ isFloat }}
        </v-btn>
        <span> <input v-model="numMax" placeholder="num max" /> Max </span>
        <v-btn @click="newQuestion()">new Question</v-btn>
        <v-btn @click="repeatSpeak()">speak again</v-btn>
        <input v-model="answerCounter" placeholder="guess counter" />
      </section>

      <Keypad
        @addNum="addNum"
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
import Keypad from "./components/Keypad.vue";
import Input from "./components/Input.vue";

export default {
  name: "App",
  components: {
    Keypad,
    Input
  },
  data() {
    return {
      randNum: null,
      isFloat: false,
      numMax: 100,
      decimalPlace: 3,
      answerNum: "",
      answerCounter: "",
      previousAnswers: [],
      tries: 0,
      counter: null,
      availableCounters: ["$", "@"]
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
      this.counter = this.availableCounters[
        _.random(0, this.availableCounters.length - 1)
      ];
    },
    setAnswerNum(val) {
      this.answerNum = val;
    },
    answerQuestion() {
      this.tries++;
      if (this.answer == this.questionValue) {
        speak("right");
        this.previousAnswers.push({
          questionValue: this.questionValue,
          answer: this.answer,
          tries: this.tries
        });
        this.newQuestion();
      } else {
        speak("wrong");
      }
    },
    repeatSpeak() {
      speak(this.questionValue);
    },
    addNum(key) {
      this.answerNum = this.answerNum + key;
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
  flex-wrap: wrap;
}
</style>
