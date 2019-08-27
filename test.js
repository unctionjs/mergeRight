/* eslint-disable flowtype/require-variable-type, no-magic-numbers */
import {test} from "tap";
import {of} from "most";
import streamSatisfies from "@unction/streamsatisfies";

import mergeRight from "./";

test("Array", ({same, end}) => {
  const left = [
    "a",
    "b",
  ];
  const right = [
    "c",
  ];

  same(
    mergeRight(left)(right),
    [
      "a",
      "b",
      "c",
    ]
  );

  end();
});

test("Object", ({same, end}) => {
  const left = {
    alpha: "2",
    beta: "1",
  };
  const right = {
    alpha: "1",
    beta: "2",
    zeta: "3",
  };

  same(
    mergeRight(left)(right),
    {
      alpha: "1",
      beta: "2",
      zeta: "3",
    }
  );

  end();
});

test("Set", ({same, end}) => {
  const left = new Set(["a", "1", "b", "0"]);
  const right = new Set(["b", "2", "c", "3"]);

  same(
    mergeRight(left)(right),
    new Set(["a", "1", "b", "0", "2", "c", "3"])
  );

  end();
});

test("Map", ({same, end}) => {
  const left = new Map([["a", "1"], ["b", "0"]]);
  const right = new Map([["b", "2"], ["c", "3"]]);

  same(
    mergeRight(left)(right),
    new Map([["a", "1"], ["b", "2"], ["c", "3"]])
  );

  end();
});

test("String", ({same, end}) => {
  const left = "ab";
  const right = "c";

  same(
    mergeRight(left)(right),
    "abc"
  );

  end();
});

test("Stream", ({equal, doesNotThrow, end}) => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    "'a'---'b'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) =>
      (position) => {
        equal(length, position);
        end();
      }
  )(
    mergeRight(left)(right)
  );
});

test(({throws, end}) => {
  const left = {};
  const right = [];

  throws(
    () => mergeRight(left)(right)
  );

  end();
});

test(({throws, end}) => {
  const left = 1;
  const right = 1;

  throws(
    () => mergeRight(left)(right)
  );

  end();
});
