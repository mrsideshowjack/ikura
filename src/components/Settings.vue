<template>
  <div class="Settings">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-list-item link v-on="on">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Use HTML Text to Speach</v-list-item-title>
              <v-list-item-subtitle
                >Use the text to speech built into your
                browser</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-switch
                v-model="settings.settingUseHTMLTTS"
                @change="emitSettings"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="
              save();
              dialog = false;
            "
          >
            Save
          </v-btn>
          <v-btn text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Settings",
  props: ["settings"],
  data() {
    return {
      dialog: false,
      settingUseHTMLTTS: false
    };
  },
  computed: {
    newSettings() {
      return {
        settingUseHTMLTTS: this.settingUseHTMLTTS
      };
    }
  },
  methods: {
    emitSettings(val) {
      this.settingUseHTMLTTS = val;
    },
    save() {
      this.$emit("emitSettings", this.newSettings);
    }
  }
};
</script>
<style scoped>
.v-card .v-list-item {
  text-align: left;
}
</style>
