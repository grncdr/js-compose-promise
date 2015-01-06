# compose-promise

Function composition that works with functions that return promises.

## Synopsis

```js
'use strict';

var compose = require('./')
var Promise = require('any-promise')

function addOne        (n) { return n + 1 }
function timesTwo      (n) { return n * 2 }
function addOneAsync   (n) { return Promise.resolve ( n + 1) }
function timesTwoAsync (n) { return Promise.resolve ( n * 2) }
```

Now we'll compose every combination of sync/async to create an array of functions:

```js
var functions = [
  compose(addOne,      timesTwo),
  compose(addOneAsync, timesTwo),
  compose(addOne,      timesTwoAsync),
  compose(addOneAsync, timesTwoAsync)
]
```

Every one of the above functions is equivalent:
 - they all multiply the input by 2 and then add 1
 - they all return a `Promise`

... but let's verify it to be sure:

```js
var assert = require('assert')

console.log('1..' + functions.length);

functions.forEach(function (fn, i) {
  // Every permutation returns a promise (even, the fully synchronous one)
  fn(2).then(
    function (result) {
      assert.equal(result, 5)
      console.log('ok', i + 1, 'result was correct')
    },
    function (error) {
      console.error(error.stack);
      process.exit(2);
    }
  )
})

/* Output:
 *
 * ok 1 result was correct
 * ok 2 result was correct
 * ok 3 result was correct
 * ok 4 result was correct
 */
```

Cool! everything works.

## License

MIT
