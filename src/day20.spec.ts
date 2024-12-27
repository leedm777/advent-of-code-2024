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
const expectedCheats = [
  [2, 44],
  [4, 30],
  [6, 16],
  [8, 14],
  [10, 10],
  [12, 8],
  [20, 5],
  [36, 4],
  [38, 3],
  [40, 2],
  [64, 1],
];

describe("day20", () => {
  describe("part 1", () => {
    it.each(expectedCheats)(
      "should work with the sample %s -> %s",
      (numPicosecondsSaved, expectedOutput) => {
        const actual = part1(exampleInput, numPicosecondsSaved);
        expect(actual).toStrictEqual(expectedOutput);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(1296);
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
