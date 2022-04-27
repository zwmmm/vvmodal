if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/esm/ukyou.prod')
} else {
  module.exports = require('./dist/esm/ukyou.dev')
}
