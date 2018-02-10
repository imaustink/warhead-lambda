const _ = require('lodash')
const createUUID = require('uuid/v1')

module.exports = function () {
  const uuid = createUUID()
  const date = new Date()
  const year = date.getFullYear()
  const month = '' + _.padStart(date.getMonth() + 1, 2, 0)
  const day = '' + _.padStart(date.getDate(), 2, 0)

  return {
    'callbackWaitsForEmptyEventLoop': true,
    'logGroupName': '/aws/lambda/some-log-path',
    'logStreamName': `${year}/${month}/${day}/[$LATEST]c0b77c50d5e14a2db386e4569cb13ee7`,
    'functionName': 'function-name',
    'memoryLimitInMB': '128',
    'functionVersion': '$LATEST',
    'invokeid': uuid,
    'awsRequestId': uuid,
    'invokedFunctionArn': 'arn:aws:lambda:us-east-1:012345678900:function:function-name'
  }
}
