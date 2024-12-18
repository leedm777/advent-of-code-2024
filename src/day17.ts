import _ from "lodash";
import { List, Record, RecordOf } from "immutable";

function parseRegister(regStr: string) {
  return _(regStr)
    .split(": ")
    .thru(([, s]) => parseInt(s, 10))
    .value();
}

export type Computer = {
  a: number;
  b: number;
  c: number;
  program: List<number>;
  instructionPointer: number;
  output: List<number>;
};

export const ComputerRecord = Record({
  a: 0,
  b: 0,
  c: 0,
  program: List<number>(),
  instructionPointer: 0,
  output: List<number>(),
} as Computer);

export function parseComputer(input: string[]): RecordOf<Computer> {
  const [aStr, bStr, cStr, , programStr] = input;
  const a = parseRegister(aStr);
  const b = parseRegister(bStr);
  const c = parseRegister(cStr);
  const program = _(programStr)
    .split(": ")
    .thru(([, s]) =>
      _(s)
        .split(",")
        .map((s) => parseInt(s, 10))
        .value(),
    )
    .value();

  return ComputerRecord({
    a,
    b,
    c,
    program: List(program),
    instructionPointer: 0,
    output: List(),
  });
}

function isHalted(c: RecordOf<Computer>): boolean {
  return c.instructionPointer >= c.program.size;
}

export function tick(c: RecordOf<Computer>): RecordOf<Computer> {
  let instructionPointer = c.instructionPointer;
  const opcode = c.program.get(instructionPointer++, NaN);
  const operand = c.program.get(instructionPointer++, NaN);
  const literal = operand;

  let combo = NaN;
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      combo = operand;
      break;
    case 4:
      combo = c.a;
      break;
    case 5:
      combo = c.b;
      break;
    case 6:
      combo = c.c;
      break;
    case 7:
      combo = NaN;
      break;
    default:
      throw new Error(`Invalid operand ${operand}`);
  }

  switch (opcode) {
    case 0:
      // adv
      return c.merge({
        instructionPointer,
        a: Math.floor(c.a / (1 << combo)),
      });
    case 1:
      // bxl
      return c.merge({
        instructionPointer,
        b: c.b ^ literal,
      });
    case 2:
      // bst
      return c.merge({
        instructionPointer,
        b: combo % 8,
      });
    case 3:
      // jnz
      return c.merge({
        instructionPointer: c.a === 0 ? instructionPointer : literal,
      });
    case 4:
      // bxc
      return c.merge({
        instructionPointer,
        b: c.b ^ c.c,
      });
    case 5:
      // out
      return c.merge({
        instructionPointer,
        output: c.output.push(combo % 8),
      });
    case 6:
      // bdv
      return c.merge({
        instructionPointer,
        b: Math.floor(c.a / (1 << combo)),
      });
    case 7:
      return c.merge({
        instructionPointer,
        c: Math.floor(c.a / (1 << combo)),
      });
    default:
      throw new Error(`Invalid opcode ${opcode}`);
  }
}

export function runComputer(c: RecordOf<Computer>) {
  while (!isHalted(c)) {
    c = tick(c);
  }
  return c;
}

export function part1(input: string[]) {
  let c = parseComputer(input);
  c = runComputer(c);

  return c.output.join(",");
}

export function part2(input: string[]) {
  const init = parseComputer(input);
  for (let a = 0; a < Number.MAX_SAFE_INTEGER; ++a) {
    let c = init.set("a", a);
    let validatedIdx = 0;
    while (!isHalted(c)) {
      c = tick(c);

      // check the output
      if (c.output.size > validatedIdx) {
        if (c.program.get(validatedIdx) !== c.output.get(validatedIdx)) {
          // output does not match; continue on
          break;
        }
        ++validatedIdx;
      }
    }

    if (isHalted(c) && c.program.equals(c.output)) {
      return a;
    }
  }
  return NaN;
}
