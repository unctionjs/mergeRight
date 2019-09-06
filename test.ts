/* eslint-disable flowtype/require-variable-type, no-magic-numbers */
import { of } from "most";
import streamSatisfies from "@unction/streamsatisfies";

import mergeRight from "./index";

test("Array", () => {
  const left = [
    "a",
    "b",
  ];
  const right = [
    "c",
  ];

  expect(mergeRight(left)(right)).toEqual([
    "a",
    "b",
    "c",
  ]);
});

test("Object", () => {
  const left = {
    alpha: "2",
    beta: "1",
  };
  const right = {
    alpha: "1",
    beta: "2",
    zeta: "3",
  };

  expect(mergeRight(left)(right)).toEqual({
    alpha: "1",
    beta: "2",
    zeta: "3",
  });
});

test("Set", () => {
  const left = new Set(["a", "1", "b", "0"]);
  const right = new Set(["b", "2", "c", "3"]);

  expect(mergeRight(left)(right)).toEqual(new Set(["a", "1", "b", "0", "2", "c", "3"]));
});

test("Map", () => {
  const left = new Map([["a", "1"], ["b", "0"]]);
  const right = new Map([["b", "2"], ["c", "3"]]);

  expect(mergeRight(left)(right)).toEqual(new Map([["a", "1"], ["b", "2"], ["c", "3"]]));
});

test("String", () => {
  const left = "ab";
  const right = "c";

  expect(mergeRight(left)(right)).toEqual("abc");
});

test("Stream", done => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    "'a'---'b'---|"
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) =>
      (position) => {
        expect(length).toBe(position);
        done();
      }
  )(
    mergeRight(left)(right)
  );
});

test("works", () => {
  const left = {};
  const right = [];

  expect(() => mergeRight(left)(right)).toThrow();
});

test("works", () => {
  const left = 1;
  const right = 1;

  expect(() => mergeRight(left)(right)).toThrow();
});
