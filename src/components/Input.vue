<template>
  <div class="Input">
    <span class="display-3" v-if="answerNum">{{ answerNum }}</span>
    <span class="display-3 text--disabled" v-else>000</span>

    <span class="display-3" v-if="answerCounter">{{ answerCounter }}</span>
    <span class="display-3 text--disabled" v-else>$</span>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["answerNum", "answerCounter"]
};
</script>

<style scoped>
.Input {
  flex: auto;
  width: 85%;
  margin: 1rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  word-wrap: break-word;
}
.Input span {
  max-width: 85%;
  text-align: left;
}
</style>
