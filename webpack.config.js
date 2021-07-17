module.exports = {
  // change to .tsx if necessary
  entry: './src/static/js/scripts/app.tsx',
  output: {
    filename: './dist/bundle.js',
    publicPath: './dist/'
  },
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },

      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
  },
  externals: {},
  // addition - add source-map support
  devtool: "source-map",
  mode: 'development'
}