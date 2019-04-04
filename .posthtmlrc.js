const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

const root = __dirname + '/src'

module.exports = {
  plugins: {
    'posthtml-include': {
      root,
    },
    'posthtml-content': {
      transclude: src => readFile(path.resolve(root, src), 'utf-8'),
    },
  },
}
