/* eslint-disable no-extra-parens */
import type from "@unction/type"
import key from "@unction/key"
import xstream from "xstream"

const mapping = {
  Array: (left: ArrayType): Function => (right: ArrayType): ArrayType => [
    ...left,
    ...right,
  ],
  Object: (left: ObjectType): Function => (right: ObjectType): ObjectType => ({
    ...left,
    ...right,
  }),
  // "Map": (left): Function => (right) => new Error("I have no idea how to merge a Map"),
  // "WeakMap": (left): Function => (right) => new Error("I have no idea how to merge a WeakMap"),
  // "Set": (left) => (right): Function => new Error("I have no idea how to merge a Set"),
  // "WeakSet": (left): Function => (right) => new Error("I have no idea how to merge a WeakSet"),
  String: (left: string): Function => (right: string): string => `${right}${left}`,
  // "Buffer": (left): Function => (right) => new Error("I have no idea how to merge a Buffer"),
  Stream: (left: StreamType): Function => (right: StreamType): StreamType => xstream.merge(right, left),
}

export default function mergeRight (left: IterableType): Function {
  const leftType = type(left)

  return function mergeRightLeft (right: IterableType): IterableType {
    return key(leftType)(mapping)(left)(right)
  }
}
