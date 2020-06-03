<template>
  <div class="CounterSelect">
    <v-btn
      text
      large
      dark
      v-for="(counter, index) in availibleCounters"
      :key="index"
      @click="emitTap(index)"
      class="number-btn"
      >{{ counter.kanji }}</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "CounterSelect",
  props: {
    availibleCounters: Array
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
  max-height: 48vh;
  overflow-y: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
.number-btn {
  width: calc(100vw / 4);
  height: calc(60vh / 5) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.7rem !important;
}
</style>
