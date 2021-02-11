const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		filename: "js/main.js", // main.js iig index.html dotor inject hiij ugnu
		path: path.resolve(__dirname, "docs"),
	},
	devServer: {
		contentBase: './docs',
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html", // src-d bga index.html iig dist folder ruu hiine, ene template bhgu bol shineer index.html uusne
		}),
	],
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
};
