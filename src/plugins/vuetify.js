import Vue from "vue";
import Vuetify from "vuetify/lib";
import minifyTheme from "minify-css-string";

const PROD = process.env.NODE_ENV !== "development";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { minifyTheme }
  },
  config: {
    silent: PROD
  }
});
