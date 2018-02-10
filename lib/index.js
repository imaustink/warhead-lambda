const Request = require('./request')
const Response = require('./response')

module.exports = {
  adapter (handler) {
    return function wrapper (event, context, callback) {
      Promise.resolve()
        .then(() => handler.call(context, new Request(event), context))
        .then(response => {
          if (response instanceof Response) {
            callback(null, response)
          } else {
            callback(null, new Response(response).status(200))
          }
        })
        .catch(err => {
          console.error(err)
          if (err instanceof Response) {
            callback(null, err)
          } else {
            const response = new Response({
              message: err.message,
              stack: err.stack
            }).status(500)
            callback(null, response)
          }
        })
    }
  },
  Response,
  Request
}
