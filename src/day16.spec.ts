import { part1, part2 } from "./day16.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day16.txt");
const exampleInputs: [number, string[]][] = [
  [
    7036,
    [
      "###############",
      "#.......#....E#",
      "#.#.###.#.###.#",
      "#.....#.#...#.#",
      "#.###.#####.#.#",
      "#.#.#.......#.#",
      "#.#.#####.###.#",
      "#...........#.#",
      "###.#.#####.#.#",
      "#...#.....#.#.#",
      "#.#.#.###.#.#.#",
      "#.....#...#.#.#",
      "#.###.#.#.#.#.#",
      "#S..#.....#...#",
      "###############",
    ],
  ],
  [
    11048,
    [
      "#################",
      "#...#...#...#..E#",
      "#.#.#.#.#.#.#.#.#",
      "#.#.#.#...#...#.#",
      "#.#.#.#.###.#.#.#",
      "#...#.#.#.....#.#",
      "#.#.#.#.#.#####.#",
      "#.#...#.#.#.....#",
      "#.#.#####.#.###.#",
      "#.#.#.......#...#",
      "#.#.###.#####.###",
      "#.#.#...#.....#.#",
      "#.#.#.#####.###.#",
      "#.#.#.........#.#",
      "#.#.#.#########.#",
      "#S#.............#",
      "#################",
    ],
  ],
];
const exampleInputs2: [number, string[]][] = [
  [45, exampleInputs[0][1]],
  [64, exampleInputs[1][1]],
];

describe("day16", () => {
  describe("part 1", () => {
    it.each(exampleInputs)(
      "should work with the sample -> %s",
      (expected, exampleInput) => {
        const actual = part1(exampleInput);
        expect(actual).toStrictEqual(expected);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(98484);
    });
  });

  describe("part 2", () => {
    it.each(exampleInputs2)(
      "should work with the sample -> %s",
      (expected, exampleInput) => {
        const actual = part2(exampleInput);
        expect(actual).toStrictEqual(expected);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(531);
    });
  });
});
