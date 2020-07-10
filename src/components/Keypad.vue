<template>
  <div class="keypad">
    <transition :name="showNumpad ? 'slide-left' : 'slide-right'">
      <Numpad key="numpad" v-if="showNumpad" @tap="addNum" />
      <CounterSelect
        key="counterSelect"
        @tap="selectCounter"
        :availibleCounters="availibleCounters"
        v-else
      />
    </transition>
    <div class="actions">
      <v-btn text large dark class="action-btn" @click="bksp"
        ><v-icon>mdi-backspace-outline</v-icon></v-btn
      >
      <v-btn text large dark class="action-btn" @click="clear"
        ><v-icon>mdi-delete-outline</v-icon></v-btn
      >
      <v-btn
        text
        large
        dark
        class="action-btn"
        @click="showNumpad = !showNumpad"
        ><v-icon left>mdi-menu-left-outline</v-icon>円</v-btn
      >
      <v-btn
        large
        dark
        color="primary"
        class="action-btn"
        @click="enter"
        @keyup.enter="enter"
        ><v-icon>mdi-keyboard-return</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import Numpad from "./Numpad.vue";
import CounterSelect from "./CounterSelect.vue";
export default {
  name: "Keypad",
  props: {
    answerNum: String,
    availibleCounters: Array
  },
  data() {
    return {
      showNumpad: true
    };
  },
  components: {
    Numpad,
    CounterSelect
  },
  methods: {
    addNum(key) {
      if (this.answerNum && this.answerNum.includes(".") && key == ".") return;
      this.$emit("addNum", key);
    },
    selectCounter(index) {
      this.showNumpad = true;
      this.$emit("selectCounter", index);
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
  max-height: 60vh;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  background: var(--keypad-background);
  color: var(--white-txt);
  z-index: 1;
}
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--keypad-actions);
  /* add margin + zindex for when transistion happends */
  margin-left: auto;
  z-index: 2;
}
.action-btn {
  width: calc(100vw / 4);
  height: calc(60vh / 5) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.7rem !important;
}
</style>
