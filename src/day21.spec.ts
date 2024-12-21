import {
  NumericNeighbors,
  DirNeighbors,
  part1,
  part2,
  punchIt,
  moveKeypad,
} from "./day21.ts";
import { readInput } from "./aoc.ts";
import _ from "lodash";

const puzzleInput = readInput("./inputs/day21.txt");
const exampleInput = ["029A", "980A", "179A", "456A", "379A"];
const exampleExpecteds = [
  "<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A",
  "<v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A",
  "<v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A",
  "<v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A",
  "<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A",
];

describe("day21", () => {
  describe("part 1", () => {
    describe("NumericNeighbors", () => {
      it("should be consistent", () => {
        _.forEach(NumericNeighbors, (toArray, from) => {
          for (const to of toArray) {
            expect(NumericNeighbors[to.substring(0, 1)]).toStrictEqual(
              expect.arrayContaining([
                expect.stringMatching(new RegExp(`^${from}[<v>^]$`)),
              ]),
            );
          }
        });
      });
    });
    describe("DirNeighbors", () => {
      it("should be consistent", () => {
        _.forEach(DirNeighbors, (toArray, from) => {
          for (const to of toArray) {
            expect(DirNeighbors[to.substring(0, 1)]).toStrictEqual(
              expect.arrayContaining([
                expect.stringMatching(new RegExp(`^[${from}][<v>^]$`)),
              ]),
            );
          }
        });
      });
    });
    describe("moveKeypad", () => {
      it.each([["A", "4", "^^<<", NumericNeighbors]])(
        "should for %s -> %s === %s",
        (from, to, expected, keypad) => {
          const actual = moveKeypad(from, to, keypad);
          expect(actual).toStrictEqual(expected);
        },
      );
    });
    it.each(_.zip(exampleInput, exampleExpecteds))(
      "should work for %s",
      (input, expected) => {
        const actual = punchIt(input!);
        expect(actual.length).toStrictEqual(expected?.length);
      },
    );
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
