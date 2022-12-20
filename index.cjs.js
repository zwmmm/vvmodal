if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/vvmodal.prod')
} else {
  module.exports = require('./dist/vvmodal.dev')
}
