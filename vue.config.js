const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new CircularDependencyPlugin({
        exclude: /node_modules/, // exclude node_modules from the check
        failOnError: false, // change to false to suppress errors on circular dependencies
        allowAsyncCycles: false, // disallow async cycles
        cwd: process.cwd(),
      }),
    ],
  },
  devServer: {
    host: "localhost"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
