module.exports = class Response {
  constructor (body, transform = JSON.stringify) {
    this.transform = transform
    this.rawBody = body
    this.statusCode = 200
    this.headers = {
      'content-type': 'application/json'
    }
  }
  get body () {
    if (this.rawBody instanceof Error) {
      return this.transform({
        message: this.rawBody.message,
        stack: this.rawBody.stack
      })
    }
    if (typeof this.rawBody !== 'string') {
      return this.transform(this.rawBody)
    }
    return this.rawBody
  }
  header (name, value) {
    if (value) {
      this.headers[name] = value
      return this
    }
    return this.headers[name]
  }
  status (code) {
    if (code) {
      this.statusCode = code
      return this
    }
    return this.statusCode
  }
}
