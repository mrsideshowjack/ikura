<template>
  <div class="Numpad">
    <span @click="emitTap('1')" class="number-btn">1</span>
    <span @click="emitTap('2')" class="number-btn">2</span>
    <span @click="emitTap('3')" class="number-btn">3</span>
    <span @click="emitTap('4')" class="number-btn">4</span>
    <span @click="emitTap('5')" class="number-btn">5</span>
    <span @click="emitTap('6')" class="number-btn">6</span>
    <span @click="emitTap('7')" class="number-btn">7</span>
    <span @click="emitTap('8')" class="number-btn">8</span>
    <span @click="emitTap('9')" class="number-btn">9</span>
    <span @click="emitTap('0')" class="number-btn">0</span>
    <span @click="emitTap('.')" class="number-btn">.</span>
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
  border: 2px solid red;
  width: calc(100vw / 4);
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
