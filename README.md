# warhead-lambda
[![Build Status](https://travis-ci.org/imaustink/warhead-lambda.svg?branch=master)](https://travis-ci.org/imaustink/warhead-lambda)
[![Coverage Status](https://coveralls.io/repos/github/imaustink/warhead-lambda/badge.svg?branch=master)](https://coveralls.io/github/imaustink/warhead-lambda?branch=master)

Warhead uses adapters to provide an abstraction layer with a unified interface atop any given platform.

## adapter(handler)

A Warhead adapter for AWS Lambda functions.

```js
const {adapter} = require('warhead-lambda')
exports.handler = adapter(function(request, context){
	// Do things
	// Return value or Promise
})
```
__Arguments:__
1. Handler function with up to 2 arguments.
	1. An instance of [`Request`](#request) which contains all the request information .
	2. The [context object](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html) provided by AWS Lambda which can also be access via the `this` variable.

For synchronous operations, you may return a value or [Response](#response).
```js
return {foo: 'bar'}
```

For asynchronous operations, you may return a `Promise` that resolves a value or a `Response`.
```js
return Promise.resolve({foo: 'bar'})
```

If the value returned by the handler is not an instance of `Response`, it will be wrapped in a `Response` with a default response code of `200` and a `content-type` header of `application/json` automatically.

If an error is thrown or a Promise is rejected with a value other than a `Response`, it will be wrapped in a `Response` with a default response code of `500` and a `content-type` header of `application/json` automatically.

## Response([body])

A constructor for building a proper response for AWS Lambda's proxy integration.

__Arguments:__
1. The desired response body.
2. A transformation function used to stringify the body, defaults to `JSON.stringify`.

If an object is provided, it will automatically be stringified. New instances default to a response code of `200` and a `content-type` header of `application/json`.

```js
const {adapter, Response} = require('warhead-lambda')

exports.handler = adapter(function(request){
	return new Response({message: 'Hello World!'})
})
```

### response.status([code])

Set or get status code of a response.
```js
const {Response} = require('warhead-lambda')
const response = new Response({message: 'Hello World!'})
response.status(200)
```

### response.header(name, [value])

Set or get a header of a response.
```js
const {Response} = require('warhead-lambda')
const response = new Response({message: 'Hello World!'})
response.header('foo', 'bar')
```

## test-helpers

Helpers for testing functions written with the `warhead-lambda` adapter.

### harness()

A harness for testing a lambda function.

```js
const {adapter, Response} = require('warhead-lambda')
const {harness} = require('warhead-lambda/test-helpers')
const request = {
	body: {foo: 'bar'},
	query: {baz: 'qux'}
}

const handler = adapter(function(request){
	return new Response(Object.assign(request.body, request.query))
})

harness(handler, request)
	.then(result => {
		// Run assertions
	})
```
