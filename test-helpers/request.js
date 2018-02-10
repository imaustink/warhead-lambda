module.exports = class MockRequest {
  constructor ({
    method = 'GET',
    headers = {},
    query = {},
    vars = {},
    body = '',
    path = '/'
  } = {}) {
    this.httpMethod = method
    this.headers = headers
    this.queryStringParameters = query
    this.stageVariables = vars
    this.body = body
    this.path = path
  }
}
