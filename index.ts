import type from "@unction/type";
import {merge} from "most";
import {EnumerableType} from "./types";

export default function mergeRight<A> (left: EnumerableType<A>) {
  return function mergeRightLeft (right: EnumerableType<A>) {
    if (type(left) !== type(right)) {
      throw new Error(`mergeRight received a ${type(left)} and ${type(right)} which aren't the same`);
    }

    switch (type(left)) {
      case "Array": {
        return [...left, ...right];
      }

      case "Object": {
        return {...left,
          ...right,
        };
      }

      case "Map": {
        return new Map([...left, ...right]);
      }

      case "Set": {
        return new Set([...left, ...right]);
      }

      case "String": {
        return `${left}${right}`;
      }

      case "Stream": {
        return merge(left, right);
      }

      default: {
        throw new Error(`mergeRight doesn't know how to deal with ${type(left)}`);
      }
    }
  };
}