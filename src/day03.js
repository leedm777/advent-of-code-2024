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
 * @return {number} Puzzle output
 */
export function part2(input) {
  input = _.join(input, "\n");
  const matches = input.matchAll(
    /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g,
  );

  return _.reduce(
    [...matches],
    ({ enabled, sum }, [cmd, lhs, rhs]) => {
      if (cmd === "do()") {
        return {
          enabled: true,
          sum,
        };
      }

      if (cmd === "don't()") {
        return {
          enabled: false,
          sum,
        };
      }

      if (enabled) {
        return {
          enabled,
          sum: sum + lhs * rhs,
        };
      }

      return { enabled, sum };
    },
    { enabled: true, sum: 0 },
  ).sum;
}
