import fs from "fs";
import _ from "lodash";

export function readInput(filename: string) {
  return _.chain(fs.readFileSync(filename, "utf-8"))
    .trimEnd()
    .split("\n")
    .value();
}

export function mod(a: number, n: number) {
  let r = a % n;
  // signed zeros are a thing I guess
  if (Object.is(r, -0)) {
    return 0;
  }
  if (r < 0) {
    r += n;
  }
  return r;
}

export function splitArray<T>(arr: T[], fn: (elem: T) => boolean) {
  if (_.isEmpty(arr)) {
    return [];
  }

  return _.reduce(
    arr,
    (acc, elem) => {
      if (fn(elem)) {
        return [...acc, []];
      }

      const last = _.last(acc) || [];
      return [..._.initial(acc), [...last, elem]];
    },
    [[]] as T[][],
  );
}

export function move(pos: number[], direction: number[]) {
  const r = [];
  for (let i = 0; i < pos.length; ++i) {
    r[i] = pos[i] + direction[i];
  }
  return r;
}
