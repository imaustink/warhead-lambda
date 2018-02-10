module.exports = class Request {
  constructor ({
    httpMethod,
    headers,
    queryStringParameters,
    stageVariables,
    body,
    path
  } = {}) {
    this.method = httpMethod
    this.headers = {}
    this.query = queryStringParameters
    this.vars = stageVariables
    this.body = body
    this.path = path

    for (let header in headers) {
      this.headers[header.toLowerCase()] = headers[header]
    }

    if (this.headers['content-type'] === 'application/json') {
      this.body = JSON.parse(this.body)
    }
  }
}
