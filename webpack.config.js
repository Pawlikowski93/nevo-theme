const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'blocks/hero/index': path.resolve(process.cwd(), 'blocks/hero/index.js'),
    'blocks/tiles/index': path.resolve(process.cwd(), 'blocks/tiles/index.js'),
    'blocks/cta/index': path.resolve(process.cwd(), 'blocks/cta/index.js'),
    'blocks/comparison-table/index': path.resolve(process.cwd(), 'blocks/comparison-table/index.js'),
    'blocks/process-timeline/index': path.resolve(process.cwd(), 'blocks/process-timeline/index.js'),
    'blocks/time-calculator/index': path.resolve(process.cwd(), 'blocks/time-calculator/index.js'),
    'blocks/time-calculator/view': path.resolve(process.cwd(), 'blocks/time-calculator/view.js'),
    'blocks/audit-widget/index': path.resolve(process.cwd(), 'blocks/audit-widget/index.js'),
    'blocks/ai-chat/index': path.resolve(process.cwd(), 'blocks/ai-chat/index.js'),
    'blocks/booking-calendar/index': path.resolve(process.cwd(), 'blocks/booking-calendar/index.js'),
    'blocks/booking-calendar/view': path.resolve(process.cwd(), 'blocks/booking-calendar/view.js'),
    'blocks/live-audit/index': path.resolve(process.cwd(), 'blocks/live-audit/index.js'),
    'blocks/live-audit/view': path.resolve(process.cwd(), 'blocks/live-audit/view.js'),
    'blocks/staszek-chat/index': path.resolve(process.cwd(), 'blocks/staszek-chat/index.js'),
    'blocks/staszek-chat/view': path.resolve(process.cwd(), 'blocks/staszek-chat/view.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'build'),
  },
};
