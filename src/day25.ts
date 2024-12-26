import _ from "lodash";
import { splitArray } from "./aoc.ts";

export function part1(input: string[]) {
  const schematics = splitArray(input, (line) => line === "");
  const [locksStr, keysStr] = _.partition(
    schematics,
    ([firstLine]) => firstLine === "#####",
  );
  const locks = _.map(locksStr, (lockStr) => {
    const heights = _.map(lockStr[0], _.constant(-1));
    _.forEach(lockStr, (row, rowNum) => {
      _.forEach(row, (ch, colNum) => {
        if (heights[colNum] < 0 && ch === ".") {
          heights[colNum] = rowNum - 1;
        }
      });
    });
    return heights;
  });

  const keys = _.map(keysStr, (keysStr) => {
    const heights = _.map(keysStr[0], _.constant(-1));
    _.forEach(_.reverse(keysStr), (row, rowNum) => {
      _.forEach(row, (ch, colNum) => {
        if (heights[colNum] < 0 && ch === ".") {
          heights[colNum] = rowNum - 1;
        }
      });
    });
    return heights;
  });

  let ctr = 0;
  _.forEach(locks, (lock) => {
    _.forEach(keys, (key) => {
      const fits = _(lock)
        .zip(key)
        .map(([pin, biting]) => pin! + biting!)
        .every((h) => h <= 5);
      if (fits) {
        ++ctr;
      }
    });
  });

  return ctr;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
