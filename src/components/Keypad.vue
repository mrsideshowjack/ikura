<template>
  <div class="keypad">
    <Numpad @tap="addNum" />
    <div class="actions">
      <span class="action-btn" @click="bksp()">bksp</span>
      <span class="action-btn" @click="clear()">clear</span>
      <span class="action-btn" @click="enter()">enter</span>
    </div>
  </div>
</template>

<script>
import Numpad from "./Numpad.vue";
export default {
  name: "Keypad",
  props: {
    answerNum: String
  },
  components: {
    Numpad
  },
  methods: {
    addNum(key) {
      if (this.answerNum && this.answerNum.includes(".") && key == ".") return;
      this.$emit("addNum", key);
    },
    bksp() {
      this.$emit("bksp");
    },
    clear() {
      this.$emit("clear");
    },
    enter() {
      this.$emit("enter");
    }
  }
};
</script>

<style scoped>
.keypad {
  width: 100vw;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  background: #222222;
  color: white;
}
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2f2f2f;
}
.action-btn {
  border: 2px solid red;
  width: calc(100vw / 4);
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
