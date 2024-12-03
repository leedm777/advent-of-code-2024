import _ from "lodash";

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  input = _.join(input, "\n");
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  return _([...matches])
    .map(([, lhs, rhs]) => lhs * rhs)
    .sum();
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {string} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
