/* eslint-disable max-statements */
import type from "@unction/type"
import xstream from "xstream"

export default function mergeRight (left: FunctorType): Function {
  return function mergeRightLeft (right: FunctorType): FunctorType {
    if (type(left) !== type(right)) {
      throw new Error(`mergeRight received a ${type(left)} and ${type(right)} which aren't the same`)
    }

    switch (type(left)) {
      case "Array": {
        return [
          ...left,
          ...right,
        ]
      }

      case "Object": {
        return {
          ...left,
          ...right,
        }
      }

      case "Map": {
        return new Map([
          ...left,
          ...right,
        ])
      }

      case "Set": {
        return new Set([
          ...left,
          ...right,
        ])
      }

      case "String": {
        return `${right}${left}`
      }

      case "Buffer": {
        throw new Error(`mergeRight doesn't know how to deal with ${type(left)}`)
      }

      case "Stream": {
        return xstream.merge(right, left)
      }

      default: {
        throw new Error(`mergeRight doesn't know how to deal with ${type(left)}`)
      }
    }
  }
}
