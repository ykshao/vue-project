const { resolve } = require('path')

const root = process.cwd()
const src = resolve(root, 'src')
const empty = Object.create(null)

function absPath (root, pathName) {
  return resolve(root, pathName)
}

module.exports = {
  root,
  src,
  nearRoot: absPath.bind(empty, root),
  nearSrc: absPath.bind(empty, src)
}
