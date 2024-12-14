import { part1, part2 } from "./day14.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day14.txt");
const exampleInput = [
  "p=0,4 v=3,-3",
  "p=6,3 v=-1,-3",
  "p=10,3 v=-1,2",
  "p=2,0 v=2,-1",
  "p=0,0 v=1,3",
  "p=3,0 v=-2,-2",
  "p=7,6 v=-1,-3",
  "p=3,0 v=-1,-2",
  "p=9,3 v=2,3",
  "p=7,3 v=-1,2",
  "p=2,4 v=2,-3",
  "p=9,5 v=-3,-3",
];

describe("day14", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput, [11, 7]);
      expect(actual).toStrictEqual(12);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(229839456);
    });
  });

  describe("part 2", () => {
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).not.toStrictEqual(31);
      expect(actual).not.toStrictEqual(68);
      expect(actual).toStrictEqual(7138);
    });
  });
});
