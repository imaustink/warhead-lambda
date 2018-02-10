import test from 'ava'
import { Request } from '../lib'
import { MockRequest } from '../test-helpers'

test('request with no argument', t => {
  const request = new Request()

  t.deepEqual(request.headers, {})
})

test('request basics work', t => {
  const options = {
    httpMethod: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    queryStringParameters: {
      foo: 'bar'
    },
    stageVariables: {
      foo: 'bar'
    },
    body: '{"foo":"bar"}',
    path: '/some-path'
  }
  const request = new Request(options)

  t.is(options.httpMethod, request.method)
  t.deepEqual(options.headers, request.headers)
  t.deepEqual(options.queryStringParameters, request.query)
  t.deepEqual(options.stageVariables, request.vars)
  t.is('bar', request.body.foo)
  t.is(options.path, request.path)
})

test('request header keys are lower cased', t => {
  const request = new Request({
    headers: {
      Foo: 'bar'
    }
  })

  t.is(request.headers.foo, 'bar')
})

test('request mocked with default parameters', t => {
  const mock = new MockRequest()
  const request = new Request(mock)

  t.is(mock.body, request.body)
  t.deepEqual(mock.headers, request.headers)
  t.is(mock.httpMethod, request.method)
  t.is(mock.path, request.path)
  t.is(mock.queryStringParameters, request.query)
  t.is(mock.stageVariables, request.vars)
})

test('request mocked with custom parameters', t => {
  const mock = new MockRequest({
    body: 'foo',
    headers: {
      foo: 'bar'
    },
    method: 'POST',
    path: '/path',
    query: {
      foo: 'bar'
    },
    vars: {
      foo: 'bar'
    }
  })
  const request = new Request(mock)

  t.is(mock.body, request.body)
  t.deepEqual(mock.headers, request.headers)
  t.is(mock.httpMethod, request.method)
  t.is(mock.path, request.path)
  t.is(mock.queryStringParameters, request.query)
  t.is(mock.stageVariables, request.vars)
})
