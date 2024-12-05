import _ from "lodash";
import { splitArray } from "./aoc.ts";

type Rules = { [x: string]: number[] };

function followsRules(rules: Rules) {
  return (update: number[]) => {
    for (let i = 0; i < update.length - 1; i++) {
      const n = update[i];
      const actual = _.slice(update, i + 1);
      const allowed = rules[n];

      if (!_.isEqual(_.intersection(actual, allowed), actual)) {
        return false;
      }
    }
    return true;
  };
}

export function part1(input: string[]) {
  const [rulesSection, updatesSection] = splitArray(
    input,
    (line) => line === "",
  );

  const rules: Rules = _(rulesSection)
    .map((line) =>
      _(line)
        .split("|")
        .map((s) => parseInt(s, 10))
        .value(),
    )
    .groupBy(([before]) => before)
    .mapValues((arr) => _.map(arr, ([, after]) => after))
    .value();

  const updates = _.map(updatesSection, (line) =>
    _(line)
      .split(",")
      .map((s) => parseInt(s, 10))
      .value(),
  );

  return _(updates)
    .filter(followsRules(rules))
    .map((update) => update[(update.length - 1) / 2])
    .sum();
}

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
