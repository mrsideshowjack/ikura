<template>
  <div class="OptionSelectCounter">
    <v-btn large icon dark class="counter-button" @click="dialog = true">
      円
    </v-btn>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      ><v-card-title>Select Counters</v-card-title>
      <v-btn @click="selectAll">Select all</v-btn>
      <v-divider></v-divider>
      <v-card-text>
        <v-list flat>
          <v-list-item-group v-model="selectedCounters" multiple>
            <template v-for="(item, index) in counters">
              <v-list-item :key="`item-${index}`" :value="item" three-line>
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.kanji"></v-list-item-title>
                    <v-list-item-subtitle
                      >{{ item.hiragana }},
                      {{ item.romanji }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle>{{ item.use }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "OptionSelectCounter",
  props: ["counters"],
  data() {
    return {
      dialog: false,
      selectedCounters: this.counters
    };
  },
  watch: {
    selectedCounters() {
      this.emitCounters();
    }
  },
  methods: {
    emitCounters() {
      this.$emit("emitCounters", this.selectedCounters);
    },
    selectAll() {
      this.selectedCounters = this.counters;
    }
  }
};
</script>
<style scoped>
.v-list-item {
  text-align: left;
}
.counter-button {
  font-size: 1.5rem;
}
</style>
