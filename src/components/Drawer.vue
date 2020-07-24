<template>
  <div class="Drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Josūshi</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <PreviousAnswers
        :previousAnswers="previousAnswers"
        @emitClearPreviousAnswers="emitClearPreviousAnswers"
      />

      <About />

      <Settings :settings="settings" @emitSettings="emitSettings" />
    </v-list>
  </div>
</template>

<script>
import PreviousAnswers from "./PreviousAnswers.vue";
import About from "./About.vue";
import Settings from "./Settings.vue";
export default {
  name: "Drawer",
  components: { PreviousAnswers, About, Settings },
  props: ["previousAnswers", "settings"],
  methods: {
    emitClearPreviousAnswers() {
      this.$emit("emitClearPreviousAnswers");
    },
    emitSettings(val) {
      this.$emit("emitSettings", val);
    }
  }
};
</script>

<style scoped></style>
