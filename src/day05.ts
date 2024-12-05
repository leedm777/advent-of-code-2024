import _ from "lodash";
import { splitArray } from "./aoc.ts";

type Rules = { [x: string]: number[] };

function parseInput(input: string[]) {
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
  return { rules, updates };
}

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
  const { rules, updates } = parseInput(input);

  return _(updates)
    .filter(followsRules(rules))
    .map((update) => update[(update.length - 1) / 2])
    .sum();
}

function sortUpdate(rules: Rules) {
  return (update: number[]) => {
    return update.toSorted((a, b) => {
      const empty: number[] = [];
      if (_(rules).get(a, empty).includes(b)) return -1;
      if (_(rules).get(b, empty).includes(a)) return 1;
      if (a !== b) throw new Error(`No rule for ${a},${b}`);
      return 0;
    });
  };
}

export function part2(input: string[]) {
  const { rules, updates } = parseInput(input);
  return _(updates)
    .reject(followsRules(rules))
    .map(sortUpdate(rules))
    .map((update) => update[(update.length - 1) / 2])
    .sum();
}
