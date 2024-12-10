import { part1, part2 } from "./day10.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day10.txt");
type Example = [number, string[]];
const exampleInputs: Example[] = [
  [1, ["0123", "1234", "8765", "9876"]],
  [
    2,
    [
      "...0...",
      "...1...",
      "...2...",
      "6543456",
      "7.....7",
      "8.....8",
      "9.....9",
    ],
  ],
  [
    4,
    [
      "..90..9",
      "...1.98",
      "...2..7",
      "6543456",
      "765.987",
      "876....",
      "987....",
    ],
  ],
  [
    3,
    [
      "10..9..",
      "2...8..",
      "3...7..",
      "4567654",
      "...8..3",
      "...9..2",
      ".....01",
    ],
  ],
  [
    36,
    [
      "89010123",
      "78121874",
      "87430965",
      "96549874",
      "45678903",
      "32019012",
      "01329801",
      "10456732",
    ],
  ],
];

describe("day10", () => {
  describe("part 1", () => {
    it.each(exampleInputs)("should score %s", (expected, exampleInput) => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(expected);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(538);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInputs[exampleInputs.length - 1][1]);
      expect(actual).toStrictEqual("TODO");
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("TODO");
    });
  });
});
