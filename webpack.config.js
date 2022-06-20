const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							url: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [ require('autoprefixer')() ]
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env' ]
            }
          }
        ]
      },
		]
	},

	resolve: {
    extensions: [ '.js', '.json' ],
		alias: {
			'~': path.resolve(__dirname, 'src')
		}
  },

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/bundle.js',
		publicPath: 'auto'
	},

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		hot: true,
		open: true,
		watchFiles: [ 'src/**/*', 'dist/**/*' ],
		compress: true,
		port: 3000,
	},

	// ES5(IE11等)向けの指定（webpack 5以上で必要）
	target: [ 'web', 'es5' ],
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/style.css'
		}),

		//image min
		new CopyPlugin({
      patterns: [
        {
          from: `${path.resolve(__dirname, 'src')}/img`,
          to: `${path.resolve(__dirname, 'dist')}/img/[name][ext]`
        }
      ]
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true,
        }),
      ],
      pngquant: {
        quality: '70-85',
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256,
      },
      svgo: {}
    })
	]
};
