if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/esm/vvmodal.prod')
} else {
  module.exports = require('./dist/esm/vvmodal.dev')
}
