import _ from "lodash";

function parseInput(input: string[]) {
  const [availLine, , ...desired] = input;
  const avail = _.split(availLine, ", ");
  return { desired, avail };
}

export function part1(input: string[]) {
  const { desired, avail } = parseInput(input);
  const availRe = new RegExp(`^((${avail.join(")|(")}))+$`);
  return _(desired)
    .filter((s) => s.match(availRe) !== null)
    .size();
}

export function countValidCombinations(
  desired: string,
  avail: string[],
): number {
  if (desired === "") {
    return 1;
  }

  return _(avail)
    .map((pattern) => {
      if (!desired.startsWith(pattern)) {
        return 0;
      }
      return countValidCombinations(desired.substring(pattern.length), avail);
    })
    .sum();
}

export function part2(input: string[]) {
  const { desired, avail } = parseInput(input);
  return _(desired)
    .map((d) => countValidCombinations(d, avail))
    .sum();
}
