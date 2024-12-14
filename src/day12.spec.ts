import { part1, part2 } from "./day12.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day12.txt");
const exampleInputs: [number, string[]][] = [
  [140, ["AAAA", "BBCD", "BBCC", "EEEC"]],
  [772, ["OOOOO", "OXOXO", "OOOOO", "OXOXO", "OOOOO"]],
  [
    1930,
    [
      "RRRRIICCFF",
      "RRRRIICCCF",
      "VVRRRCCFFF",
      "VVRCCCJFFF",
      "VVVVCJJCFE",
      "VVIVCCJJEE",
      "VVIIICJJEE",
      "MIIIIIJJEE",
      "MIIISIJEEE",
      "MMMISSJEEE",
    ],
  ],
];
const exampleInputs2: [number, string[]][] = [
  [80, ["AAAA", "BBCD", "BBCC", "EEEC"]],
  [436, ["OOOOO", "OXOXO", "OOOOO", "OXOXO", "OOOOO"]],
  [236, ["EEEEE", "EXXXX", "EEEEE", "EXXXX", "EEEEE"]],
  [368, ["AAAAAA", "AAABBA", "AAABBA", "ABBAAA", "ABBAAA", "AAAAAA"]],
  [
    1206,
    [
      "RRRRIICCFF",
      "RRRRIICCCF",
      "VVRRRCCFFF",
      "VVRCCCJFFF",
      "VVVVCJJCFE",
      "VVIVCCJJEE",
      "VVIIICJJEE",
      "MIIIIIJJEE",
      "MIIISIJEEE",
      "MMMISSJEEE",
    ],
  ],
];

describe("day12", () => {
  describe("part 1", () => {
    it.each(exampleInputs)(
      "should work with the sample => %s",
      (expected, exampleInput) => {
        const actual = part1(exampleInput);
        expect(actual).toStrictEqual(expected);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(1377008);
    });
  });

  describe("part 2", () => {
    it.each(exampleInputs2)(
      "should work with the sample => %s",
      (expected, exampleInput) => {
        const actual = part2(exampleInput);
        expect(actual).toStrictEqual(expected);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(815788);
    });
  });
});
