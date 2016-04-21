var through = require('through2')

module.exports = exports = function (file, options) {
  options.accumulator[file] = true
  return through(function (buf, enc, next) {
    // noop
    this.push(buf)
    next()
  })
}
