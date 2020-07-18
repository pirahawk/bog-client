var path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry:{
        app: './src/main.ts',
        polyfills: './src/polyfills.ts'
    },

    output:{
        filename: '[name].js',
        //path: path.resolve(__dirname, "js"),
        // path: path.resolve(__dirname, "./dist/"),
        path: path.resolve(__dirname, "../../Bog.Client/wwwroot/client"),
    },

    module:{
        rules:[
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
              loaders: ['sass-loader']
            }
            /* Embed files. */
            // {
            //   test: /\.(html|css)$/,
            //   loader: 'raw-loader',
            //   exclude: /\.async\.(html|css)$/
            // }
            // /* Async loading. */
            // {
            //   test: /\.async\.(html|css)$/,
            //   loaders: ['file?name=[name].[hash].[ext]', 'extract']
            // }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.html' ],
      },
}
