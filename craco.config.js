const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  eslint: {
    enable: false,
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      babel: {
        loaderOptions: {
          ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
        },
      },
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#7B2CBF",
              "@success-color": "#52c41a",
              "@link-color": "#9D4EDD",
              "@error-color": "#C77DFF",
              "@warning-color": "#5A189A",
              "@heading-color": "#E0AAFF",
              "@font-size-base": "14px",
              "@text-color-secondary": "#E0AAFF",
              "@text-color": "#E0AAFF",
              "@border-radius-base": "2px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
