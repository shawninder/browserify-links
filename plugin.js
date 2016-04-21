var through = require('through2')
var transform = require('./transform')

module.exports = exports = function (brow, options) {
  options.accumulator = {}
  brow.transform(transform, options)

  brow.pipeline.get('sort').push(
    through.obj(function (row, enc, next) {
      if (options.accumulator[row.file]) {
        console.log(row.file + ' found in accumulator')
      } else {
        console.error(row.file + ' NOT FOUND')
      }
      // noop
      this.push(row)
      next()
    })
  )
}
