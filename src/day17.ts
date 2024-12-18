import _ from "lodash";

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
  program: number[];
  instructionPointer: number;
  output: number[];
};

export function parseComputer(input: string[]): Computer {
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

  return {
    a,
    b,
    c,
    program,
    instructionPointer: 0,
    output: [],
  };
}

function isHalted(c: Computer): boolean {
  return c.instructionPointer >= c.program.length;
}

export function tick(c: Computer): Computer {
  let instructionPointer = c.instructionPointer;
  const opcode = c.program[instructionPointer++];
  const operand = c.program[instructionPointer++];
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
      return {
        ...c,
        instructionPointer,
        a: Math.floor(c.a / (1 << combo)),
      };
    case 1:
      // bxl
      return {
        ...c,
        instructionPointer,
        b: c.b ^ literal,
      };
    case 2:
      // bst
      return {
        ...c,
        instructionPointer,
        b: combo % 8,
      };
    case 3:
      // jnz
      return {
        ...c,
        instructionPointer: c.a === 0 ? instructionPointer : literal,
      };
    case 4:
      // bxc
      return {
        ...c,
        instructionPointer,
        b: c.b ^ c.c,
      };
    case 5:
      // out
      return {
        ...c,
        instructionPointer,
        output: [...c.output, combo % 8],
      };
    case 6:
      // bdv
      return {
        ...c,
        instructionPointer,
        b: Math.floor(c.a / (1 << combo)),
      };
    case 7:
      return {
        ...c,
        instructionPointer,
        c: Math.floor(c.a / (1 << combo)),
      };
    default:
      throw new Error(`Invalid opcode ${opcode}`);
  }
}

export function runComputer(c: Computer) {
  while (!isHalted(c)) {
    c = tick(c);
  }
  return c;
}

export function part1(input: string[]) {
  let c = parseComputer(input);
  c = runComputer(c);

  return _.join(c.output);
}

export function part2(input: string[]) {
  const init = parseComputer(input);
  for (let a = 0; a < Number.MAX_SAFE_INTEGER; ++a) {
    let c = { ...init, a };
    let validatedIdx = 0;
    while (!isHalted(c)) {
      c = tick(c);

      // check the output
      if (c.output.length > validatedIdx) {
        if (c.program[validatedIdx] !== c.output[validatedIdx]) {
          // output does not match; continue on
          break;
        }
        ++validatedIdx;
      }
    }

    if (isHalted(c) && _.isEqual(c.program, c.output)) {
      return a;
    }
  }
  return NaN;
}
