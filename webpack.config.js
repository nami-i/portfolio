const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
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
							url: false
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
			}
		]
	},
	// ES5(IE11等)向けの指定（webpack 5以上で必要）
	target: [ 'web', 'es5' ],
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/style.css'
		})
	]
};
