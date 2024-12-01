import _ from "lodash";

function parseInput(input) {
  const numbers = _(input)
    .map((line) =>
      _(line)
        .split(/  */)
        .map((s) => parseInt(s, 10))
        .value(),
    )
    .value();
  const lhs = _(numbers)
    .map(([n]) => n)
    .sortBy()
    .value();
  const rhs = _(numbers)
    .map(([, n]) => n)
    .sortBy()
    .value();
  return { lhs, rhs };
}

function count(arr, n) {
  let r = 0;
  for (const elem of arr) {
    if (elem === n) {
      ++r;
    }
  }
  return r;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
  const { lhs, rhs } = parseInput(input);
  return _(_.zip(lhs, rhs))
    .map(([lhs, rhs]) => Math.abs(lhs - rhs))
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  const { lhs, rhs } = parseInput(input);
  return _(lhs)
    .map((n) => n * count(rhs, n))
    .sum();
}
