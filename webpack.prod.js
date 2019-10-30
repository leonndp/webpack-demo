const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "[name].[contentHash].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin()
		]
	},
	plugins: [
		new MiniCssExtractPlugin({filename: "[name].[contentHash].css"}),
	 	new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, //3. Extract css files into files
					"css-loader", //2. Turns css into common js
					"sass-loader" //1. Turns sass into css
				]
			},
		]
	}
});