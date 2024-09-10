const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new CircularDependencyPlugin({
        exclude: /node_modules/, // exclude node_modules from the check
        failOnError: true, // throw errors instead of warnings on circular dependencies
        allowAsyncCycles: false, // disallow async cycles
        cwd: process.cwd(),
      }),
    ],
  },
  devServer: {
    // host: "132.72.65.211"
    host: "localhost"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
