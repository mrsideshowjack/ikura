<template>
  <div id="app">
    <button
      @click="
        isFloat = !isFloat;
        newQuestion();
      "
    >
      float {{ isFloat }}
    </button>
    <span> <input v-model="numMax" placeholder="num max" /> Max </span>
    <button @click="newQuestion()">new Question</button>
    <button @click="repeatSpeak()">speak again</button>
    <input v-model="answerCounter" placeholder="guess counter" />
    <p>{{ answer }}</p>
    <p>{{ previousAnswers }}</p>

    <Keypad
      @addNum="addNum"
      @bksp="bksp"
      @clear="clear"
      @enter="answerQuestion"
      :answer-num="answerNum"
    />
  </div>
</template>

<script>
import Keypad from "./components/Keypad.vue";
import _ from "lodash";
import speak from "./utils/speak";
export default {
  name: "App",
  components: {
    Keypad
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
      availableCounters: ["$", "!", "@"]
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
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
