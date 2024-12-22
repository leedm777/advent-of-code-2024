import _ from "lodash";

export function nextSecret(secret: number): number {
  let bs = BigInt(secret);
  let result = bs * 64n;
  bs ^= result; // mix
  bs %= 16777216n; // prune

  result = bs / 32n;
  bs ^= result; // mix
  bs %= 16777216n; // prune

  result = bs * 2048n;
  bs ^= result; // mix
  bs %= 16777216n; // prune

  return Number(bs);
}

export function part1(input: string[]) {
  let secrets = _.map(input, (s) => parseInt(s, 10));
  for (let i = 0; i < 2000; ++i) {
    secrets = _.map(secrets, nextSecret);
  }
  return _.sum(secrets);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
