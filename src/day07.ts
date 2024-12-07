import _ from "lodash";

type Equation = {
  expected: number;
  terms: number[];
};

function parseLine(input: string): Equation {
  const [expectedStr, termsStr] = input.split(": ");
  const terms = _(termsStr)
    .split(" ")
    .map((s) => parseInt(s, 10))
    .value();
  return { expected: parseInt(expectedStr, 10), terms };
}

function solveEquation(
  { expected, terms }: Equation,
  acc: number = 0,
): boolean {
  if (terms.length === 0) {
    return acc === expected;
  }

  if (acc > expected) {
    return false;
  }

  const [firstTerm, ...restTerms] = terms;

  const tryAdd = solveEquation({ expected, terms: restTerms }, acc + firstTerm);
  if (tryAdd) {
    return true;
  }

  if (acc !== 0) {
    const tryMultiply = solveEquation(
      { expected, terms: restTerms },
      acc * firstTerm,
    );

    if (tryMultiply) {
      return true;
    }
  }

  return false;
}

export function part1(input: string[]) {
  const equations = _.map(input, parseLine);

  return _(equations)
    .filter((eq) => solveEquation(eq))
    .map("expected")
    .sum();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
