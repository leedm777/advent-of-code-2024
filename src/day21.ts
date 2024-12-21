import _ from "lodash";
import { dijkstraHeuristic, findPath, Graph } from "./aoc.ts";

type Keypad = { [from: string]: string[] };
export const DirNeighbors: Keypad = {
  //     +---+---+
  //     | ^ | A |
  // +---+---+---+
  // | < | v | > |
  // +---+---+---+
  "<": ["v>"],
  v: ["<<", ">>", "^^"],
  ">": ["v<", "A^"],
  "^": ["vv", "A>"],
  A: [">v", "^<"],
};

export const NumericNeighbors: Keypad = {
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
  "3": ["6^", "2<", "Av"],
  "4": ["7^", "5>", "1v"],
  "5": ["4<", "8^", "6>", "2v"],
  "6": ["5<", "9^", "3v"],
  "7": ["8>", "4v"],
  "8": ["7<", "5v", "9>"],
  "9": ["8<", "6v"],
  A: ["3^", "0<"],
};

export function moveKeypad(a: string, b: string, keypad: Keypad): string {
  const g: Graph<string> = {
    getNeighborDistance(node1: string, node2: string): number {
      const dir1 = node1.substring(1);
      const dir2 = node2.substring(1);
      // prefer consecutive sequences in the same direction; provides shorter
      // paths for the robot controlling this robot
      if (dir1 === dir2) {
        return 1;
      }
      return 10;
    },
    getNeighbors(node: string): string[] {
      return keypad[node.substring(0, 1)];
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

export function movesForSequence(sequence: string, keypad: Keypad) {
  let prior = "A";
  let nextSequence = "";
  for (const key of sequence) {
    nextSequence += moveKeypad(prior, key, keypad);
    nextSequence += "A";
    prior = key;
  }
  return nextSequence;
}

function keyDirectional(sequence: string): string {
  return movesForSequence(sequence, DirNeighbors);
}

function keyNumeric(sequence: string): string {
  return movesForSequence(sequence, NumericNeighbors);
}

export function punchIt(numericSequence: string): string {
  const dir1 = keyNumeric(numericSequence);
  const dir2 = keyDirectional(dir1);
  const dir3 = keyDirectional(dir2);

  console.log([dir3, dir2, dir1, numericSequence].join("\n"));

  return dir3;
}

export function part1(input: string[]) {
  return _(input)
    .map((numericSequence) => {
      const seq = punchIt(numericSequence);
      const val = parseInt(numericSequence, 10);
      return val * seq.length;
    })
    .sum();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
