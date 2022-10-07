/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /node_modules\/(@semcore)/,
          use: '@semcore/shadow-loader',
        },
        {
          test: /\.css$/,
          include: /node_modules\/(@semcore)/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
  });
};
