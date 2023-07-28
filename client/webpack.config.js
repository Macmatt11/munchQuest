const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: './src/main.jsx', // Replace with the entry file of your application
    output: {
    filename: 'bundle.js', // Replace with the desired output filename
    path: path.resolve(__dirname, 'dist') // Replace with the desired output directory
    },
    module: {
    rules: [
      // Define rules for processing different file types (e.g., JavaScript, CSS, etc.)
    ]
    },
    plugins: [
    new Dotenv()
    // Define any additional plugins you need
    ]
};