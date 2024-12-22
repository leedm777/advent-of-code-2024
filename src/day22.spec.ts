import { nextSecret, part1, part2 } from "./day22.ts";
import { readInput } from "./aoc.ts";
import _ from "lodash";

const puzzleInput = readInput("./inputs/day22.txt");
const exampleInput = ["1", "10", "100", "2024"];
const exampleSequence = [
  123, 15887950, 16495136, 527345, 704524, 1553684, 12683156, 11100544,
  12249484, 7753432, 5908254,
];

describe("day22", () => {
  describe("part 1", () => {
    describe("nextSecret", () => {
      it.each(
        _.take(
          _.zip(exampleSequence, _.drop(exampleSequence, 1)),
          exampleSequence.length - 1,
        ),
      )("should %s -> %s", (input, expected) => {
        const actual = nextSecret(input!);
        expect(actual).toEqual(expected);
      });
    });
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(37327623);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(12979353889);
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
