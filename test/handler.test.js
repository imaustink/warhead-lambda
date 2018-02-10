import test from 'ava'
import sinon from 'sinon'
import { adapter, Response, Request } from '../lib'
import { harness } from '../test-helpers'
let sandbox

test.before(function () {
  sandbox = sinon.createSandbox()
  sandbox.stub(console, 'error')
})

test.after(function () {
  sandbox.restore()
})

test('handler setups context correctly', t => {
  const context = {
    foo: true
  }
  const handler = adapter(function (request, context) {
    t.is(true, context.foo)
    t.is(true, this.foo)
  })

  return harness(handler, {}, context)
})

test('handler setups request correctly', t => {
  const handler = adapter(function (request, context) {
    t.true(request instanceof Request)
  })

  return harness(handler, {})
})

test('handler returns a resolved promise', t => {
  const body = {foo: 'bar'}
  const handler = adapter(function () {
    return Promise.resolve(body)
  })

  return harness(handler)
    .then(result => {
      t.is(JSON.stringify(body), result.body)
    })
})

test('handler returns a rejected promise', t => {
  const error = new Error('Fucked!')
  const handler = adapter(() => {
    return Promise.reject(error)
  })

  return harness(handler, {})
    .then(result => {
      const body = JSON.parse(result.body)
      t.is(error.message, body.message)
      t.is(error.stack, body.stack)
    })
})

test('handler returns a raw value', t => {
  const value = {}
  const handler = adapter(() => {
    return value
  })

  return harness(handler, {})
    .then(result => {
      t.is(JSON.stringify(value), result.body)
      t.true(result instanceof Response)
    })
})

test('handler returns a raw value', t => {
  const value = {}
  const handler = adapter(() => {
    return value
  })

  return harness(handler, {})
    .then(result => {
      t.is(JSON.stringify(value), result.body)
      t.true(result instanceof Response)
    })
})

test('handler returns a string', t => {
  const value = 'hello world'
  const handler = adapter(() => {
    return value
  })

  return harness(handler, {})
    .then(result => {
      t.is(value, result.body)
      t.true(result instanceof Response)
    })
})

test('handler throws an error', t => {
  const error = new Error('Fucked!')
  const handler = adapter(() => {
    throw error
  })

  return harness(handler, {})
    .then(result => {
      const body = JSON.parse(result.body)
      t.is(error.message, body.message)
      t.is(error.stack, body.stack)
      t.is(500, result.status())
    })
})

test('handler returns a rejected promise', t => {
  const error = {message: 'Fucked!'}
  const handler = adapter(() => {
    const response = new Response(error)
      .status(400)
    return Promise.reject(response)
  })

  return harness(handler, {})
    .then(result => {
      const body = JSON.parse(result.body)
      t.is(error.message, body.message)
      t.is(400, result.status())
    })
})

test('handler returns an instance of Response', t => {
  const handler = adapter(function () {
    return new Response({foo: true})
  })

  return harness(handler, {})
    .then(result => {
      t.is(200, result.statusCode)
      t.is('{"foo":true}', result.body)
      t.deepEqual({
        'content-type': 'application/json'
      }, result.headers)
    })
})

test('handler parses JSON string', t => {
  const request = {
    body: '{"foo": "bar"}',
    headers: {
      'content-type': 'application/json'
    }
  }
  const handler = adapter(request => {
    t.deepEqual({
      foo: 'bar'
    }, request.body)
  })

  return harness(handler, request)
})
