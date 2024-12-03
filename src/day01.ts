import _ from "lodash";

function parseInput(input: string[]): { lhs: number[]; rhs: number[] } {
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

function count<T>(arr: T[], n: T) {
  let r = 0;
  for (const elem of arr) {
    if (elem === n) {
      ++r;
    }
  }
  return r;
}

export function part1(input: string[]) {
  const { lhs, rhs } = parseInput(input);
  return _(_.zip(lhs, rhs))
    .map(([lhs, rhs]) => Math.abs((lhs || 0) - (rhs || 0)))
    .sum();
}

export function part2(input: string[]) {
  const { lhs, rhs } = parseInput(input);
  return _(lhs)
    .map((n) => n * count(rhs, n))
    .sum();
}
