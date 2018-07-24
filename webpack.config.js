 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './src/app.js',
     output: {
         path: path.resolve(__dirname, './build/'),
         filename: 'app.js'
     },
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /(node_modules)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['env']
             }
           }
         },
          {
            test: /\.tsx?$/,
            use: [
              {loader:'babel-loader'},
              {loader:'ts-loader'}
            ],
            exclude: /node_modules/
          },
         {
           test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
         },
        {
            test: /\.ttf$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 1000,
                    name: 'fonts/[hash]-[name].[ext]'
                } 
            }]
        },
        {
            test: /\.(gif|png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 100000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
        },
        {
            test: /\.(mp3|wav)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 100000, // Convert images < 8kb to base64 strings
                    name: 'sounds/[hash]-[name].[ext]'
                } 
            }]
        },
        //initialization files
        {
            test: /(index\.html|phaser\.min\.js|script\.js)/,  
            use: [{
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
            }]
        },
        {
          test: /\.json$/,
            use: [
              { loader: 'json-loader' }
            ]
        }]
     },
     devtool: 'source-map',
      resolve: {
        extensions: ['.tsx', '.js', '.json']
    }
 };