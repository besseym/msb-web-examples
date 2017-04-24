module.exports = {
  entry: {
    dimd2: "./src/ts/dim/d2/index.ts",
    dimd3: "./src/ts/dim/d3/index.ts",
    natureAttract: "./src/ts/nature/attract/index.ts",
    natureDrag: "./src/ts/nature/drag/index.ts",
    natureClock: "./src/ts/nature/clock/index.ts",
    natureFriction: "./src/ts/nature/friction/index.ts",
    natureMover: "./src/ts/nature/mover/index.ts",
    natureOscillation: "./src/ts/nature/oscillation/index.ts",
    naturePendulum: "./src/ts/nature/pendulum/index.ts",
    natureRotation: "./src/ts/nature/rotation/index.ts"
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