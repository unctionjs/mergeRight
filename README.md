# @unction/mergeRight

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<A> | Set<A> | RecordType<unknown, A> | string => Array<A> | Set<A> | RecordType<unknown, A> | string => Array<A> | Set<A> | RecordType<unknown, A> | string

Merges two enumerables, preferring right.

``` javascript
const left = {
  alpha: "1",
  beta: "1"
}
const right = {
  beta: "2",
  zeta: "3"
}

mergeRight(left)(right)
```

Which returns:

``` javascript
{
  alpha: "1"
  beta: "2",
  zeta: "3"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeRight.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeRight.svg?maxAge=2592000&style=flat-square
