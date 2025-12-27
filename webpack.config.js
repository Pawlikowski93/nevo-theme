const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'blocks/hero/index': path.resolve(process.cwd(), 'blocks/hero/index.js'),
    'blocks/tiles/index': path.resolve(process.cwd(), 'blocks/tiles/index.js'),
    'blocks/cta/index': path.resolve(process.cwd(), 'blocks/cta/index.js'),
    'blocks/comparison-table/index': path.resolve(process.cwd(), 'blocks/comparison-table/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'build'),
  },
};
