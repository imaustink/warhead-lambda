const _ = require('lodash')
const MockRequest = require('./request')
const createContext = require('./context')

module.exports = function (handler, event = {}, customContext) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line handle-callback-err
    handler(new MockRequest(event), _.merge(createContext(), customContext), (err, result) => {
      resolve(result)
    })
  })
}
