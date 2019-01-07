const path = require('path');

// https://www.valentinog.com/blog/react-webpack-babel/

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }

      }
    ]
  }
};
