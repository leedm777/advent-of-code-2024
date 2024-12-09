import { part1, part2 } from "./day09.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./src/day09.txt");
const exampleInput = ["2333133121414131402"];

describe("day09", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(1928);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(6211348208140);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(2858);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(6239783302560);
    });
  });
});
