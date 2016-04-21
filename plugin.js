var through = require('through2')
var transform = require('./transform')

module.exports = exports = function (brow, options) {
  options.accumulator = {}
  brow.transform(transform, options)

  brow.pipeline.get('sort').push(
    through.obj(function (row, enc, next) {
      if (options.accumulator[row.file]) {
        console.log('FOUND')
      } else {
        console.error('NOT FOUND:', row.file)
      }
      // noop
      this.push(row)
      next()
    })
  )
}
