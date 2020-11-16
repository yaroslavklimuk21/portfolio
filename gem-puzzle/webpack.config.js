const path = require('path')
module.exports = {
  entry: '/src/create.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src')
  }
}