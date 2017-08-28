/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"
import xstream from "xstream"
import streamSatisfies from "@unction/streamsatisfies"

import mergeRight from "./index"

test(({same, end}) => {
  const left = {
    alpha: "1",
    beta: "1",
  }
  const right = {
    beta: "2",
    zeta: "3",
  }

  same(
    mergeRight(left)(right),
    {
      alpha: "1",
      beta: "2",
      zeta: "3",
    }
  )

  end()
})

test(({same, end}) => {
  const left = [
    "a",
    "b",
  ]
  const right = [
    "c",
  ]

  same(
    mergeRight(left)(right),
    [
      "a",
      "b",
      "c",
    ]
  )

  end()
})

test(({same, end}) => {
  const left = "ab"
  const right = "c"

  same(
    mergeRight(left)(right),
    "cab"
  )

  end()
})

test(({equal, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "b---a---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    ({length}) =>
      (position) => {
        equal(length, position)
        end()
      }
  )(
    mergeRight(left)(right)
  )
})

test(({same, end}) => {
  const left = new Map([["a", "1"], ["b", "0"]])
  const right = new Map([["b", "2"], ["c", "3"]])

  same(
    mergeRight(left)(right),
    new Map([["a", "1"], ["b", "2"], ["c", "3"]])
  )

  end()
})

test(({same, end}) => {
  const left = new Set(["a", "1", "b", "0"])
  const right = new Set(["b", "2", "c", "3"])

  same(
    mergeRight(left)(right),
    new Set(["a", "1", "b", "0", "2", "c", "3"])
  )

  end()
})

test(({throws, end}) => {
  const left = {}
  const right = []

  throws(
    () => mergeRight(left)(right)
  )

  end()
})

test(({throws, end}) => {
  const left = 1
  const right = 1

  throws(
    () => mergeRight(left)(right)
  )

  end()
})

test(({throws, end}) => {
  const left = new Buffer("a")
  const right = new Buffer("a")

  throws(
    () => mergeRight(left)(right)
  )

  end()
})
