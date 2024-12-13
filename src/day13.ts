import _ from "lodash";
import { splitArray } from "./aoc.ts";

type Machine = {
  a: { x: number; y: number };
  b: { x: number; y: number };
  prize: { x: number; y: number };
};

function p(s: string): number {
  return parseInt(s, 10);
}

function parseMachine(input: string[]): Machine {
  const buttonRE = /^Button [AB]: X\+(\d+), Y\+(\d+)$/;
  const a = input[0].match(buttonRE);
  const b = input[1].match(buttonRE);
  const prize = input[2].match(/^Prize: X=(\d+), Y=(\d+)/);
  if (!a) {
    throw new Error(`Failed to parse ${input[0]}`);
  }
  if (!b) {
    throw new Error(`Failed to parse ${input[1]}`);
  }
  if (!prize) {
    throw new Error(`Failed to parse ${input[2]}`);
  }
  return {
    a: { x: p(a[1]), y: p(a[2]) },
    b: { x: p(b[1]), y: p(b[2]) },
    prize: { x: p(prize[1]), y: p(prize[2]) },
  };
}

type Equation = [number, number, number];

function solveEquation([[a1, b1, c1], [a2, b2, c2]]: [Equation, Equation]): [
  number,
  number,
] {
  const x = (c1 * b2 - b1 * c2) / (b2 * a1 - b1 * a2);
  const y = (c1 - a1 * x) / b1;

  if (x !== Math.floor(x) || y !== Math.floor(y)) {
    return [0, 0];
  }

  return [x, y];
}

function solveMachine({ a, b, prize }: Machine): [number, number] {
  return solveEquation([
    [a.x, b.x, prize.x],
    [a.y, b.y, prize.y],
  ]);
}

export function part1(input: string[]) {
  const machinesStr = splitArray(input, (line) => line === "");
  const machines = _.map(machinesStr, parseMachine);

  return _(machines)
    .map(solveMachine)
    .map(([a, b]) => 3 * a + b)
    .sum();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
