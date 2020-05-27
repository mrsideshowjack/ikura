module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Ikura",
    themeColor: "#d12771",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    manifestOptions: {
      display: "standalone"
    }
  }
};
