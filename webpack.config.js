const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

var client = {
  // Entry point where it starts the process
  entry: {
    index: './src/client/index.js',
  },
  // Defines the output path after webpack does its stuff
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // This is necessary when entry is a node/express server
  // target: 'node',
  // externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'development'`
      },
      __isBrowser__: "true"
    })
  ],
  optimization: {
    minimize: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader','css-loader' ]
      }
    ]
  }
};

var server = {
  // Entry point where it starts the process
  entry: "./src/server.js",
  // Defines the output path after webpack does its stuff
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  // This is necessary when entry is a node/express server
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'development'`
      },
      __isBrowser__: "false"
    })
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'css-loader' ]
      }
    ]
  }
};

module.exports = [server, client]

// https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
// https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app#toc-routing-and-rendering-on-the-server-with-express
// https://github.com/lmammino/judo-heroes-2
