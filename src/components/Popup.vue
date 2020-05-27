<template>
  <div class="Popup">
    <transition name="fade">
      <v-alert
        v-if="showPopup"
        dense
        outlined
        :type="correct ? 'success' : 'error'"
        :icon="correct ? 'mdi-check' : 'mdi-close'"
      >
        <strong v-if="correct">Correct </strong>
        <strong v-else>Incorrect </strong>
        <br />
        <span
          >Answer: <strong>{{ randNum }} {{ counter.kanji }}</strong></span
        >
        <br />
        <span> {{ counter.hiragana }} {{ counter.romanji }} </span>
        <br />
        <span>Usage: {{ counter.use }}</span>
      </v-alert>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: ["counter", "randNum"],
  data() {
    return {
      popupTime: 2000,
      showPopup: false,
      correct: true
    };
  },
  methods: {
    popup(wasCorrect) {
      this.correct = wasCorrect;
      let self = this;
      return new Promise(function(resolve) {
        self.open();
        setTimeout(function() {
          self.close();
          resolve();
        }, self.popupTime);
      });
    },
    open() {
      this.showPopup = true;
    },
    close() {
      this.showPopup = false;
    }
  }
};
</script>

<style scoped>
.Popup {
  z-index: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
}
</style>
