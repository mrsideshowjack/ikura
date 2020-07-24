<template>
  <div class="Input" :class="inputColor">
    <span class="display-3" v-if="answerNum">{{ answerNum }}</span>
    <span class="display-3 text--placeholder" v-else>000</span>

    <span class="display-3" v-if="answerCounter">{{ answerCounter }}</span>
    <span class="display-3 text--placeholder" v-else>?</span>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["answerNum", "answerCounter", "color"],
  computed: {
    inputColor() {
      if (this.color === "red") return "colorRed";
      if (this.color === "green") return "colorGreen";
      else return "";
    }
  }
};
</script>

<style scoped>
.Input {
  flex: auto;
  width: 85%;
  max-height: 23vh;
  margin: 3rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
  word-wrap: break-word;
  margin-bottom: auto;
  transition: color 0.2s;
}
.Input span {
  max-width: 85%;
  text-align: left;
}
.colorRed {
  color: red;
}
.colorGreen {
  color: green;
}
.text--placeholder {
  color: rgb(0 0 0 / 42%);
}
</style>
