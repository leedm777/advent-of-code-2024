import { part1, part2 } from "./day11.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day11.txt");
const exampleInput = ["125 17"];

describe("day11", () => {
  describe("part 1", () => {
    it.each([
      [6, 22],
      [25, 55312],
    ])("should work with the sample for %s iterations", (num, expected) => {
      const actual = part1(exampleInput, num);
      expect(actual).toStrictEqual(expected);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(189547);
    });
  });

  describe("part 2", () => {
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(224577979481346);
    });
  });
});
