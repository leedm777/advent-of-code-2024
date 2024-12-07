import _ from "lodash";

const Directions = [
  [-1, 0], // start facing north
  [0, 1], // turn right 90 degrees
  [1, 0],
  [0, -1],
];

function move(pos: number[], direction: number[]) {
  return _(pos).zip(direction).map(_.sum).value();
}

function parseInput(input: string[]) {
  let guardPos = [-1, -1];
  const grid = _.map(input, (line, row) =>
    _.map(line, (ch, col) => {
      if (ch === "^") {
        guardPos = [row, col];
      }
      return ch;
    }),
  );
  return { grid, guardPos, guardDir: 0 };
}

export function part1(input: string[]) {
  const map = parseInput(input);
  const { grid } = map;
  let { guardPos, guardDir } = map;
  const visited = _.map(grid, (line) => _.map(line, _.constant(false)));

  while (_.get(grid, guardPos, " ") !== " ") {
    if (_.get(grid, guardPos, " ") === "#") {
      throw new Error("Merged with obstruction!!!");
    }
    _.set(visited, guardPos, true);
    _.set(grid, guardPos, "X");
    while (_.get(grid, move(guardPos, Directions[guardDir]), " ") === "#") {
      guardDir = (guardDir + 1) % Directions.length;
    }
    guardPos = move(guardPos, Directions[guardDir]);
  }

  // console.log(
  //   _(grid)
  //     .map((line) => line.join(""))
  //     .join("\n"),
  // );

  return _(visited).map(_.sum).sum();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
