import { part1, part2, runComputer, parseComputer, Computer } from "./day17.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day17.txt");
const exampleInput = [
  "Register A: 729",
  "Register B: 0",
  "Register C: 0",
  "",
  "Program: 0,1,5,4,3,0",
];
const exampleInput2 = [
  "Register A: 2024",
  "Register B: 0",
  "Register C: 0",
  "",
  "Program: 0,3,5,4,3,0",
];

const otherExamples: [Partial<Computer>, Partial<Computer>][] = [
  [
    {
      c: 9,
      instructionPointer: 0,
      program: [2, 6],
    },
    { b: 1 },
  ],
  [{ a: 10, program: [5, 0, 5, 1, 5, 4] }, { output: [0, 1, 2] }],
  [
    { a: 2024, program: [0, 1, 5, 4, 3, 0] },
    { output: [4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0], a: 0 },
  ],
  [{ b: 29, program: [1, 7] }, { b: 26 }],
  [{ b: 2024, c: 43690, program: [4, 0] }, { b: 44354 }],
];

const EmptyComputer = {
  a: 0,
  b: 0,
  c: 0,
  program: [],
  instructionPointer: 0,
  output: [],
};

describe("day17", () => {
  describe("part 1", () => {
    it.each(otherExamples)("should work for %s", (computer, expected) => {
      const actual = runComputer({
        ...EmptyComputer,
        ...computer,
      });
      expect(actual).toStrictEqual(expect.objectContaining(expected));
    });
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual("4,6,3,5,6,3,5,2,1,0");
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual("2,7,6,5,6,0,2,3,1");
    });
  });

  describe("part 2", () => {
    it("should output itself for the given program", () => {
      // make sure I understand part 2...
      const c = parseComputer(exampleInput2);
      c.a = 117440;
      const actual = runComputer(c);
      expect(actual.program).toStrictEqual(actual.output);
    });
    it("should work with the sample", () => {
      const actual = part2(exampleInput2);
      expect(actual).toStrictEqual(117440);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("TODO");
    });
  });
});
