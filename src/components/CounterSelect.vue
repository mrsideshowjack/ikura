<template>
  <div class="CounterSelect">
    <v-btn
      text
      large
      dark
      v-for="(counter, index) in counters"
      :key="index"
      @click="emitTap(index)"
      class="number-btn"
      >{{ counter.kanji }}</v-btn
    >
  </div>
</template>

<script>
import COUNTERS from "../utils/constants";
export default {
  name: "CounterSelect",
  data() {
    return {
      counters: COUNTERS
    };
  },
  methods: {
    emitTap(index) {
      this.$emit("tap", index);
    }
  }
};
</script>

<style scoped>
.CounterSelect {
  display: grid;
  justify-items: stretch;
  align-items: stretch;
  max-height: 70vh;
  overflow-y: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
.number-btn {
  width: calc(100vw / 4);
  height: calc(70vh / 5) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem !important;
}
</style>
