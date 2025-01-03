import { part1, part2 } from "./day05.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day05.txt");
const exampleInput = [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
  "",
  "75,47,61,53,29",
  "97,61,53,29,13",
  "75,29,13",
  "75,97,47,61,53",
  "61,13,29",
  "97,13,75,29,47",
];

describe("day05", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(143);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(4578);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(123);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(6179);
    });
  });
});
