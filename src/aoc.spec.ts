import { mod, splitArray } from "./aoc";

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

  describe("splitArray", () => {
    it("should work with a basic array", () => {
      const input = [
        "section 1",
        "more text",
        "",
        "section 2",
        "even more text",
      ];

      const actual = splitArray(input, (line) => line === "");
      expect(actual).toStrictEqual([
        ["section 1", "more text"],
        ["section 2", "even more text"],
      ]);
    });
  });
});
