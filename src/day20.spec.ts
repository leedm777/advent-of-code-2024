import { part1, part2 } from "./day20.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day20.txt");
const exampleInput = [
  "###############",
  "#...#...#.....#",
  "#.#.#.#.#.###.#",
  "#S#...#.#.#...#",
  "#######.#.#.###",
  "#######.#.#...#",
  "#######.#.###.#",
  "###..E#...#...#",
  "###.#######.###",
  "#...###...#...#",
  "#.#####.#.###.#",
  "#.#...#.#.#...#",
  "#.#.#.#.#.#.###",
  "#...#...#...###",
  "###############",
];

describe("day20", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual("TODO");
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual("TODO");
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
