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
