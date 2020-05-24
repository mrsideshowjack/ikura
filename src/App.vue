<template>
  <div id="app">
    <HelloWorld msg="Ikura?" />
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
    <span
      ><input v-model="answerNum" placeholder="guess num"/>
      <input v-model="answerCounter" placeholder="guess counter"
    /></span>
    <button @click="answerQuestion()">enter answer</button>
    <p>{{ answer }}</p>
    <p>{{ previousAnswers }}</p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import _ from "lodash";
import speak from "./utils/speak";
export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      randNum: null,
      isFloat: false,
      numMax: 100,
      decimalPlace: 3,
      answerNum: null,
      answerCounter: null,
      previousAnswers: [],
      tries: 0,
      counter: null,
      availableCounters: ["$", "monies", "legos"]
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
      this.answerNum = null;
      this.answerCounter = null;
      this.genQuestionValue();
      this.repeatSpeak();
    },
    genQuestionValue() {
      this.randNum = _.random(0, this.numMax, this.isFloat);
      this.counter = this.availableCounters[
        _.random(0, this.availableCounters.length - 1)
      ];
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
