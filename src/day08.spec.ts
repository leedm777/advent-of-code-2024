import { part1, part2 } from "./day08.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day08.txt");
const exampleInput = [
  "............",
  "........0...",
  ".....0......",
  ".......0....",
  "....0.......",
  "......A.....",
  "............",
  "............",
  "........A...",
  ".........A..",
  "............",
  "............",
];

const exampleInput2 = [
  "T.........",
  "...T......",
  ".T........",
  "..........",
  "..........",
  "..........",
  "..........",
  "..........",
  "..........",
  "..........",
];

describe("day08", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(14);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(367);
    });
  });

  describe("part 2", () => {
    it("should work with the simpler sample", () => {
      const actual = part2(exampleInput2);
      expect(actual).toStrictEqual(9);
    });
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(34);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(1285);
    });
  });
});
