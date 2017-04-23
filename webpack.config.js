module.exports = {
  entry: {
    dim: "./src/ts/dim/index.ts"
  },
  output: {
    path: __dirname + "/scripts",
    filename: "[name].js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};