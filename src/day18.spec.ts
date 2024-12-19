import { part1, part2 } from "./day18.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day18.txt");
const exampleInput = [
  "5,4",
  "4,2",
  "4,5",
  "3,0",
  "2,1",
  "6,3",
  "2,4",
  "1,5",
  "0,6",
  "3,3",
  "2,6",
  "5,1",
  "1,2",
  "5,5",
  "2,5",
  "6,5",
  "1,4",
  "0,4",
  "6,4",
  "1,1",
  "6,1",
  "1,0",
  "0,5",
  "1,6",
  "2,0",
];

describe("day18", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput, [6, 6], 12);
      expect(actual).toStrictEqual(22);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(272);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual("TODO");
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("TODO");
    });
  });
});
