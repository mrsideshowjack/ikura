<template>
  <div class="About">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-list-item link v-on="on">
          <v-list-item-icon>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>About</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <section class="about-content">
          <h1>Josūshi</h1>
        </section>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      dialog: false
    };
  }
};
</script>
<style scoped>
.v-card .v-list-item {
  text-align: left;
}
</style>
