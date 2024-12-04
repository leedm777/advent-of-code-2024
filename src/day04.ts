import _ from "lodash";

export function part1(input: string[]) {
  let ctr = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const xmases = new Array(8).fill(true);

      for (const [idx, ch] of ["X", "M", "A", "S"].entries()) {
        xmases[0] = xmases[0] && _.get(input, [row, col + idx], ".") === ch;
        xmases[1] =
          xmases[1] && _.get(input, [row + idx, col + idx], ".") === ch;
        xmases[2] = xmases[2] && _.get(input, [row + idx, col], ".") === ch;
        xmases[3] =
          xmases[3] && _.get(input, [row + idx, col - idx], ".") === ch;
        xmases[4] = xmases[4] && _.get(input, [row, col - idx], ".") === ch;
        xmases[5] =
          xmases[5] && _.get(input, [row - idx, col - idx], ".") === ch;
        xmases[6] = xmases[6] && _.get(input, [row - idx, col], ".") === ch;
        xmases[7] =
          xmases[7] && _.get(input, [row - idx, col + idx], ".") === ch;
      }

      ctr += _.sum(xmases);
    }
  }
  return ctr;
}

export function part2(input: string[]) {
  let ctr = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const xmases = [];

      // M on left
      xmases[0] =
        _.get(input, [row, col], ".") === "M" &&
        _.get(input, [row + 2, col], ".") === "M" &&
        _.get(input, [row + 1, col + 1], ".") === "A" &&
        _.get(input, [row, col + 2], ".") === "S" &&
        _.get(input, [row + 2, col + 2], ".") === "S";

      // M on right
      xmases[1] =
        _.get(input, [row, col + 2], ".") === "M" &&
        _.get(input, [row + 2, col + 2], ".") === "M" &&
        _.get(input, [row + 1, col + 1], ".") === "A" &&
        _.get(input, [row, col], ".") === "S" &&
        _.get(input, [row + 2, col], ".") === "S";

      // M on top
      xmases[2] =
        _.get(input, [row, col], ".") === "M" &&
        _.get(input, [row, col + 2], ".") === "M" &&
        _.get(input, [row + 1, col + 1], ".") === "A" &&
        _.get(input, [row + 2, col], ".") === "S" &&
        _.get(input, [row + 2, col + 2], ".") === "S";

      // M on bottom
      xmases[3] =
        _.get(input, [row + 2, col], ".") === "M" &&
        _.get(input, [row + 2, col + 2], ".") === "M" &&
        _.get(input, [row + 1, col + 1], ".") === "A" &&
        _.get(input, [row, col], ".") === "S" &&
        _.get(input, [row, col + 2], ".") === "S";

      ctr += _.sum(xmases);
    }
  }
  return ctr;
}
