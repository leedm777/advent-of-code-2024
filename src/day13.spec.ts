import { part1, part2 } from "./day13.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day13.txt");
const exampleInput = [
  "Button A: X+94, Y+34",
  "Button B: X+22, Y+67",
  "Prize: X=8400, Y=5400",
  "",
  "Button A: X+26, Y+66",
  "Button B: X+67, Y+21",
  "Prize: X=12748, Y=12176",
  "",
  "Button A: X+17, Y+86",
  "Button B: X+84, Y+37",
  "Prize: X=7870, Y=6450",
  "",
  "Button A: X+69, Y+23",
  "Button B: X+27, Y+71",
  "Prize: X=18641, Y=10279",
];

describe("day13", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual("480");
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual("27105");
    });
  });

  describe("part 2", () => {
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("101726882250942");
    });
  });
});
