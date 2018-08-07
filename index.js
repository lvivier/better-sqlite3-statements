
const {readdirSync, readFileSync, statSync} = require('fs')
const {join, resolve} = require('path')
const LRU = require('nanolru')

// todo explicit resolve fn that looks at module.main and pwd
// todo use path parsing instead of string manip shit
// todo file append extension if none

module.exports = exports = function (db, path) {
  const isDir = statSync(path).isDirectory()
  return isDir ? exports.dir(db, path) : exports.file(db, path)
}

Object.assign(exports, {
  cache: new LRU(100),

  dir (db, path, ext = 'sql') {
    const file = exports.file.bind(null, db)
    return readdirSync(path)
      .filter((f) => f.endsWith('.' + ext))
      .reduce((obj, f) => {
        obj[f.slice(0, -1 - ext.length)] = file(join(path, f))
        return obj
      }, {})
  },

  file (db, path, ext = 'sql') {
    const key = path // resolve(path)
    var str = exports.cache.get(key)
    if (!str) {
      str = readFileSync(path, 'utf8').trim()
      exports.cache.set(key, str)
    }
    return db.prepare(str)
  }
})
