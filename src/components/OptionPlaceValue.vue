<template>
  <div class="OptionPlaceValue">
    <v-btn large icon dark @click="dialog = true">
      <v-icon>{{ icoRuler }}</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card-title>Select Place Value</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-slider
          v-model="setPlaceValue"
          min="1"
          max="6"
          thumb-label
          label="Place Value"
        ></v-slider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="
            emitFloat();
            dialog = false;
          "
        >
          Set
        </v-btn>
        <v-btn text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<script>
// Icons
import { mdiRuler } from "@mdi/js";
export default {
  name: "OptionPlaceValue",
  data() {
    return {
      dialog: false,
      setPlaceValue: this.placeValue || null,
      // Icons
      icoRuler: mdiRuler
    };
  },
  methods: {
    emitFloat() {
      this.$emit("emitPlaceVal", this.setPlaceValue);
    }
  }
};
</script>

<style scoped></style>
