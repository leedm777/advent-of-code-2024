import { part1, part2 } from "./day03";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day03.txt");
const exampleInput = [
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
];

describe("day03", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(161);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).not.toStrictEqual(28476021);
      expect(actual).toStrictEqual(174336360);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual();
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual();
    });
  });
});
