<template>
  <div class="Drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Ikura?</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <PreviousAnswers
        :previousAnswers="previousAnswers"
        @emitClearPreviousAnswers="emitClearPreviousAnswers"
      />

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <Settings :settings="settings" @emitSettings="emitSettings" />
    </v-list>
  </div>
</template>

<script>
import PreviousAnswers from "./PreviousAnswers.vue";
import Settings from "./Settings.vue";
export default {
  name: "Drawer",
  components: { PreviousAnswers, Settings },
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
