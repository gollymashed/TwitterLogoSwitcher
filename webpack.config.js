const path = require('path');

module.exports = {
    entry: {
        content: './src/content.js',
        background: './src/background.js',
        popup: './src/popup.js' // Add this line
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
      },
};
