
# better-sqlite3-statements

Require files or folders with SQLite queries as prepared statements.
Works with [better-sqlite3][1].

Inspired by [massive.js scripts][2].

## usage

```js
const Database = require('better-sqlite3')
const db = new Database('test', {memory: true})
const sql = require('better-sqlite3-statements').bind(null, db)

// require a file
var stmt = sql('./sql/myFn')
// require a whole folder as an object
var {myFn} = sql('./sql')
// returns a prepared Statement
var row = stmt.get('foo')
```

## api

### exports(db, path)

Resolve `path` to a file or directory and call `file` or `dir`.

### exports.file(db, path)

Resolve `path` and return the file contents as a `Statement`.

### exports.dir(db, path, ext = 'sql')

Resolve `path` and return an object where each key is a file in
the directory and each value is its contents as a `Statement`.
Optionally specify `ext` to look for a file extension other than "sql".

### exports.cache

Instance of [nanolru][3] that holds cached SQL strings.

## sql limitations

- Each file must have one valid SQL statement
- [Custom functions][4] are fine if they are registered on
  the `Database` instance first
- Padding whitespace is fine
- Comments are fine

[1]:https://github.com/JoshuaWise/better-sqlite3
[2]:https://dmfay.github.io/massive-js/functions.html#the-scripts-directory
[3]:https://github.com/s3ththompson/nanolru
[4]:https://github.com/JoshuaWise/better-sqlite3/wiki/API#registeroptions-function---this
