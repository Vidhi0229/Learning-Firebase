const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Add rules for processing CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Add other rules for JavaScript files (if needed)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
