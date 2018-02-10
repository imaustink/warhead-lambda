import test from 'ava'
import { Response } from '../lib'

test('response defaults are working', t => {
  const res = new Response({foo: true})

  t.is(200, res.statusCode)
  t.is('{"foo":true}', res.body)
  t.deepEqual({
    'content-type': 'application/json'
  }, res.headers)
})

test('response with modified response code', t => {
  const res = new Response({})
  res.status(500)

  t.is(500, res.statusCode)
  t.is(500, res.status())
})

test('response with response custom header', t => {
  const res = new Response({})
  res.header('custom', 'header')

  t.deepEqual({
    'content-type': 'application/json',
    'custom': 'header'
  }, res.headers)
  t.is('header', res.header('custom'))
})

test('response works with native error', t => {
  const message = 'Fucked!'
  const res = new Response(new Error(message))
  t.is(message, JSON.parse(res.body).message)
})
