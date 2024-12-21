import _ from "lodash";
import { dijkstraHeuristic, findPath, Graph } from "./aoc.ts";

function keyDirectional(sequence: string): string {
  return sequence;
}

export const NumericNeighbors: { [from: string]: string[] } = {
  // +---+---+---+
  // | 7 | 8 | 9 |
  // +---+---+---+
  // | 4 | 5 | 6 |
  // +---+---+---+
  // | 1 | 2 | 3 |
  // +---+---+---+
  //     | 0 | A |
  //     +---+---+
  "0": ["2^", "A>"],
  "1": ["4^", "2>"],
  "2": ["1<", "5^", "3>", "0v"],
  "3": ["2<", "6^", "Av"],
  "4": ["7^", "5>", "1v"],
  "5": ["4<", "8^", "6>", "2v"],
  "6": ["5<", "9^", "3v"],
  "7": ["8>", "4v"],
  "8": ["7<", "5v", "9>"],
  "9": ["8<", "6v"],
  A: ["0<", "3^"],
};

function moveNumeric(a: string, b: string): string {
  const g: Graph<string> = {
    getNeighborDistance: _.constant(1),
    getNeighbors(node: string): string[] {
      return NumericNeighbors[node.substring(0, 1)];
    },
    h: dijkstraHeuristic,
    isGoal(node: string): boolean {
      return node.substring(0, 1) === b;
    },
    keyify(node: string): string {
      return node.substring(0, 1);
    },
    start: a,
  };
  return _(g).thru(findPath).drop(1).invokeMap("substring", 1).join("");
}

function keyNumeric(sequence: string): string {
  let prior = "A";
  let nextSequence = "";
  for (const key of sequence) {
    nextSequence += moveNumeric(prior, key);
    nextSequence += "A";
    prior = key;
  }
  return nextSequence;
}

export function part1(input: string[]) {
  return _(input)
    .map((numericSequence) => {
      const dir1 = keyNumeric(numericSequence);
      const dir2 = keyDirectional(dir1);
      const dir3 = keyDirectional(dir2);
      const dir4 = keyDirectional(dir3);

      const val = parseInt(numericSequence, 10);
      return val * dir4.length;
    })
    .sum();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
