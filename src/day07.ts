import _ from "lodash";

type Equation = {
  expected: number;
  terms: number[];
  acc: number;
};

function parseLine(input: string): Equation {
  const [expectedStr, termsStr] = input.split(": ");
  const [acc, ...terms] = _(termsStr)
    .split(" ")
    .map((s) => parseInt(s, 10))
    .value();
  return { expected: parseInt(expectedStr, 10), terms, acc };
}

type Operator = (lhs: number, rhs: number) => number;

function solveEquation(
  { expected, terms, acc }: Equation,
  operators: Operator[] = [_.add, _.multiply],
): boolean {
  if (terms.length === 0) {
    return acc === expected;
  }

  if (acc > expected) {
    return false;
  }

  const [firstTerm, ...restTerms] = terms;

  return _.some(operators, (fn) =>
    solveEquation(
      { expected, terms: restTerms, acc: fn(acc, firstTerm) },
      operators,
    ),
  );
}

export function part1(input: string[]) {
  const equations = _.map(input, parseLine);

  return _(equations)
    .filter((eq) => solveEquation(eq))
    .map("expected")
    .sum();
}

function numcat(lhs: number, rhs: number) {
  for (let i = 10; i < 1e10; i *= 10) {
    if (rhs < i) {
      return lhs * i + rhs;
    }
  }
  throw new Error(`${rhs} is waaaaay too big`);
}

export function part2(input: string[]) {
  const equations = _.map(input, parseLine);

  return _(equations)
    .filter((eq) => solveEquation(eq, [_.add, _.multiply, numcat]))
    .map("expected")
    .sum();
}
