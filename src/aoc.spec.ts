import { mod } from "./aoc";

describe("aoc helpers", () => {
  describe("mod", () => {
    it.each([
      [1, 10, 1],
      [-1, 10, 9],
      [-10, 10, 0],
    ])("%s mod %s === %s", (lhs, rhs, expected) => {
      const actual = mod(lhs, rhs);
      expect(actual).toStrictEqual(expected);
    });
  });
});
