var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,

  entry: {
    app: './src/main.ts',
    polyfills: './src/polyfills.ts',
    style: './src/styles.scss'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "../../Bog.Client/wwwroot/client"),
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=false'],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
      ,
      {
        test: /\.html$/,
        loaders: ['raw-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html', '.scss'],
  },
}
