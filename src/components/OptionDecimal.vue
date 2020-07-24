<template>
  <div class="OptionDecimal">
    <v-btn large icon dark :outlined="isFloat" @click="dialog = true">
      <v-icon>{{ icoCounter }}</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290"
      ><v-card-title>Select Decimal Place</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-switch v-model="setIsFloat" label="Decimal"></v-switch>
        <v-spacer></v-spacer>
        <v-slider
          v-if="setIsFloat"
          v-model="setDecimalPlace"
          min="1"
          max="5"
          thumb-label
          label="Decimal Place"
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
import { mdiCounter } from "@mdi/js";
export default {
  name: "OptionDecimal",
  props: ["isFloat", "decimalPlace"],
  data() {
    return {
      dialog: false,
      setIsFloat: this.isFloat || null,
      setDecimalPlace: this.decimalPlace || null,
      // Icons
      icoCounter: mdiCounter
    };
  },
  methods: {
    emitFloat() {
      this.$emit("emitFloatVal", {
        bool: this.setIsFloat,
        decimalPlace: this.setDecimalPlace
      });
    }
  }
};
</script>
