import { part1, part2 } from "./day23.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day23.txt");
const exampleInput = [
  "kh-tc",
  "qp-kh",
  "de-cg",
  "ka-co",
  "yn-aq",
  "qp-ub",
  "cg-tb",
  "vc-aq",
  "tb-ka",
  "wh-tc",
  "yn-cg",
  "kh-ub",
  "ta-co",
  "de-co",
  "tc-td",
  "tb-wq",
  "wh-td",
  "ta-ka",
  "td-qp",
  "aq-cg",
  "wq-ub",
  "ub-vc",
  "de-ta",
  "wq-aq",
  "wq-vc",
  "wh-yn",
  "ka-de",
  "kh-ta",
  "co-tc",
  "wh-qp",
  "tb-vc",
  "td-yn",
];

describe("day23", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(7);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(1046);
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
