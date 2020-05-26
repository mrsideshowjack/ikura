<template>
  <div class="Numpad">
    <v-btn text large dark @click="emitTap('1')" class="number-btn">1</v-btn>
    <v-btn text large dark @click="emitTap('2')" class="number-btn">2</v-btn>
    <v-btn text large dark @click="emitTap('3')" class="number-btn">3</v-btn>
    <v-btn text large dark @click="emitTap('4')" class="number-btn">4</v-btn>
    <v-btn text large dark @click="emitTap('5')" class="number-btn">5</v-btn>
    <v-btn text large dark @click="emitTap('6')" class="number-btn">6</v-btn>
    <v-btn text large dark @click="emitTap('7')" class="number-btn">7</v-btn>
    <v-btn text large dark @click="emitTap('8')" class="number-btn">8</v-btn>
    <v-btn text large dark @click="emitTap('9')" class="number-btn">9</v-btn>
    <v-btn text large dark @click="emitTap('0')" class="number-btn">0</v-btn>
    <v-btn text large dark @click="emitTap('.')" class="number-btn">.</v-btn>
  </div>
</template>

<script>
export default {
  name: "Numpad",
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
}
</style>
