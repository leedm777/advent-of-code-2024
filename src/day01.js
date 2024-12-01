import _ from "lodash";

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part1(input) {
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
  return _(_.zip(lhs, rhs))
    .map(([lhs, rhs]) => Math.abs(lhs - rhs))
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
