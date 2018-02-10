import test from 'ava'
import { adapter, Request } from '../lib'
import { harness } from '../test-helpers'

test('harness works', t => {
  const body = 'Hello World!'
  const handler = adapter(function (request) {
    t.is(body, request.body)
    return request.body
  })
  return harness(handler, {body})
})

test('harness has default request', t => {
  const handler = adapter(function (request) {
    t.true(request instanceof Request)
  })
  return harness(handler)
})
