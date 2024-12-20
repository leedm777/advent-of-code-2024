import { countValidCombinations, part1, part2 } from "./day19.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day19.txt");
const exampleInput = [
  "r, wr, b, g, bwu, rb, gb, br",
  "",
  "brwrr",
  "bggr",
  "gbbr",
  "rrbgbr",
  "ubwu",
  "bwurrg",
  "brgr",
  "bbrgwb",
];

describe("day19", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(6);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(228);
    });
  });

  describe("part 2", () => {
    describe("countValidCombinations", () => {
      it.each([
        ["brwrr", 2],
        ["bggr", 1],
        ["gbbr", 4],
        ["rrbgbr", 6],
        ["bwurrg", 1],
        ["brgr", 2],
        ["ubwu", 0],
        ["bbrgwb", 0],
      ])("should work for %s -> %s", (input, expected) => {
        const actual = countValidCombinations(
          input,
          exampleInput[0].split(", "),
        );
        expect(actual).toStrictEqual(expected);
      });
    });
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual(16);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("TODO");
    });
  });
});
