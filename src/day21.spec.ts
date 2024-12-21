import { NumericNeighbors, part1, part2 } from "./day21.ts";
import { readInput } from "./aoc.ts";
import _ from "lodash";

const puzzleInput = readInput("./inputs/day21.txt");
const exampleInput = ["029A", "980A", "179A", "456A", "379A"];

describe("day21", () => {
  describe("part 1", () => {
    describe("NumericNeighbors", () => {
      it("should be consistent", () => {
        _.forEach(NumericNeighbors, (toArray, from) => {
          for (const to of toArray) {
            expect(NumericNeighbors[to]).toStrictEqual(
              expect.arrayContaining([from]),
            );
          }
        });
      });
    });
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(126384);
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
