<template>
  <div class="PreviousAnswers">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-list-item link v-on="on">
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Previous Answers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Previous Answers</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text color="error" @click="emitClearPreviousAnswers"
              ><v-icon left>mdi-delete</v-icon> Clear</v-btn
            >
          </v-toolbar-items>
        </v-toolbar>

        <v-list three-line subheader>
          <v-list-item
            v-for="(item, index) in previousAnswers.slice().reverse()"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title v-if="item.correct"
                ><v-icon left>mdi-check</v-icon> Correct</v-list-item-title
              >
              <v-list-item-title v-else
                ><v-icon left>mdi-close</v-icon> Incorrect</v-list-item-title
              >
              <v-list-item-subtitle
                >Question: {{ item.questionValue }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Answer: {{ item.answerValue }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Tries: {{ item.tries }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PreviousAnswers",
  props: ["previousAnswers"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    emitClearPreviousAnswers() {
      this.dialog = false;
      this.$emit("emitClearPreviousAnswers");
    }
  }
};
</script>

<style scoped></style>
