<template>
  <div class="keypad">
    <transition name="slide">
      <Numpad key="numpad" v-if="showNumpad" @tap="addNum" />
      <CounterSelect key="counterSelect" @tap="selectCounter" v-else />
    </transition>
    <div class="actions">
      <v-btn text large dark class="action-btn" @click="bksp()"
        ><v-icon>mdi-backspace-outline</v-icon></v-btn
      >
      <v-btn text large dark class="action-btn" @click="clear()"
        ><v-icon>mdi-delete-outline</v-icon></v-btn
      >
      <v-btn
        text
        large
        dark
        class="action-btn"
        @click="showNumpad = !showNumpad"
        >円</v-btn
      >
      <v-btn large dark color="primary" class="action-btn" @click="enter()"
        >enter</v-btn
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
    answerNum: String
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

/* Transistions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate(-100%, 0);
}
.slide-enter-to,
.slide-leave {
  transform: translate(0, 0);
}
</style>
