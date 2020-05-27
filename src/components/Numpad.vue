<template>
  <div class="Numpad">
    <v-btn
      text
      large
      dark
      v-for="digit in numpadDigits"
      :key="digit"
      @click="emitTap(digit)"
      class="number-btn"
      >{{ digit }}</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "Numpad",
  data() {
    return {
      numpadDigits: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "00",
        "."
      ]
    };
  },
  methods: {
    emitTap(key) {
      this.$emit("tap", key);
    }
  }
};
</script>

<style scoped>
.Numpad {
  display: grid;
  justify-items: stretch;
  align-items: stretch;
  max-height: 60vh;
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
  font-size: 1.5rem !important;
}
</style>
