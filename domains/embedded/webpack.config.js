const path = require('path')
var webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    library: 'BotuiChat',
    libraryTarget: 'umd',
    filename: 'chat.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        // https://github.com/graphql/graphql-js/issues/2721
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: { crypto: false }
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.EnvironmentPlugin({
      REACT_APP_BOTUI_HOST: 'https://chachat-dev.survaq.com'
    })
  ]
}
