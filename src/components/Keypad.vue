<template>
  <div class="keypad">
    <Numpad @tap="addNum" />
    <div class="actions">
      <v-btn text large dark class="action-btn" @click="bksp()">bksp</v-btn>
      <v-btn text large dark class="action-btn" @click="clear()">clear</v-btn>
      <v-btn large dark color="primary" class="action-btn" @click="enter()"
        >enter</v-btn
      >
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
  min-height: 60vh;
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
  width: calc(100vw / 4);
  height: calc(70vh / 5) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
