const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  devtool: slsw.lib.webpack.isLocal ? 'eval-cheap-module-source-map' : 'source-map',
  entry: slsw.lib.entries,
  target: 'node',
  externals: [
    nodeExternals()
  ],
  context: __dirname,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  resolve: {
    symlinks: false,
    cacheWithContext: false,
    plugins: [new TsconfigPathsPlugin({
      configFile: './tsconfig.paths.json'
    })],
    extensions: ['.ts', '.js'],
    alias: {
      '@/*': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    concatenateModules: false
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      loader: 'ts-loader',
      exclude: [
        [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '.serverless'),
          path.resolve(__dirname, '.webpack'),
          path.resolve(__dirname, 'tests')
        ]
      ],
      options: {
        transpileOnly: true,
        experimentalWatchApi: true
      }
    }]
  }
}
