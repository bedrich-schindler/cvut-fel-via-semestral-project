const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (env, argv) => ({
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    static: Path.join(__dirname, 'public'),
  },
  devtool: false,
  entry: {
    bundle: [
      Path.join(__dirname, 'src/main.jsx'),
    ],
  },
  module: {
    rules: [
      {
        resolve: {
          fullySpecified: false,
        },
        test: /\.m?js/,
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:8]',
              },
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules'],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              titleProp: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js?v=__ASSET_VERSION__',
    path: Path.join(__dirname, 'public/generated'),
    publicPath: '/generated/',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
      filename: Path.join(__dirname, 'public/index.html'),
      minify: false,
      template: Path.join(__dirname, 'assets/index.html'),
    }),
  ],
  resolve: {
    alias: {
      'redux-api-middleware': 'redux-api-middleware/es',
    },
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
});
