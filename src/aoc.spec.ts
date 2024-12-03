import { mod } from "./aoc";

describe("aoc helpers", () => {
  describe("mod", () => {
    it.each([[1, 2, 1]])("%s mod %s === %s", (lhs, rhs, expected) => {
      const actual = mod(lhs, rhs);
      expect(actual).toEqual(expected);
    });
  });
});
