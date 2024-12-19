import _ from "lodash";

export function part1(input: string[]) {
  const [availLine, , ...desired] = input;
  const avail = _.split(availLine, ", ");
  const availRe = new RegExp(`^((${avail.join(")|(")}))+$`);
  return _(desired)
    .filter((s) => s.match(availRe) !== null)
    .size();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
