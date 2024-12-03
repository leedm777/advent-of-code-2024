import _ from "lodash";

export function part1(lines: string[]) {
  const input = _.join(lines, "\n");
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  return _([...matches])
    .map(([, lhs, rhs]) => parseInt(lhs, 10) * parseInt(rhs, 10))
    .sum();
}

export function part2(lines: string[]) {
  const input = _.join(lines, "\n");
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
          sum: sum + parseInt(lhs, 10) * parseInt(rhs, 10),
        };
      }

      return { enabled, sum };
    },
    { enabled: true, sum: 0 },
  ).sum;
}
