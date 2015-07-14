"use strict"
var test = require('tap').test
var safe = require('../../lib/utils/safe.js')

setTimeout(function(){ console.log('done') }, 1000)
test('while', function (t) {
  t.plan(4)
  var iter1 = 0
  safe.while(10, function () { return iter1 < 5 }, function () { ++iter1 }, function (er) {
    t.error(er, '5 iterations with a 10 iteration limit produces no error')
    t.is(iter1, 5, 'we actually _did_ 5 iterations')
  })
  var iter2 = 0
  safe.while(10, function () { return iter2 < 15 }, function () { ++iter2 }, function (er) {
    t.ok(er, '15 iterations with a 10 iteration limit produces an error')
    t.is(iter2, 10, 'we completed our iteration limit number of iterations')
  })
})
/*
test('whileSync', function (t) {
  var ii = 0
  safe.whileSync(10, function () { return ii < 5 }, function () { ++ii })
  t.is(ii, 5, 'we actually _did_ 5 iterations')
  try {
    ii = 0
    safe.whileSync(10, function () { return ii < 15 }, function () { ++ii })
    t.fail('15 iterations with a 10 iteration limit produces an error')
  } catch (ex) {
    t.pass('15 iterations with a 10 iteration limit produces an error')
    t.is(ii, 10, 'we completed our iteration limit number of iterations')
  }
  t.end()
})

test('dezalgo', function (t) {
  t.plan(4)
  var bad1 = false
  safe.dezalgo(function(){ bad1 = true })()
  t.is(bad1, false, 'bad1 dezalgoized')
  var bad2 = false
  setTimeout(safe.dezalgo(function(){ bad2 = true }), 10)
  t.is(bad2, false, 'bad2 not yet called')
  setTimeout(function () {
    t.is(bad1, true, 'bad1 set')
    t.is(bad2, true, 'bad2 set')
  }, 15)
})

*/