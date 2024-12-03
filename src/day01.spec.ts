import { part1, part2 } from "./day01";
import { readInput } from "./aoc";

const puzzleInput = readInput("./src/day01.txt");
const exampleInput = ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"];

describe("day01", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(11);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(3569916);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(31);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(26407426);
    });
  });
});
