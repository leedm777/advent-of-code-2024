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

type Map = {
  grid: string[][];
  guardPos: number[];
  guardDir: number;
};

function parseInput(input: string[]): Map {
  let guardPos = [-1, -1];
  const grid = _.map(input, (line, rowNum) =>
    _.map(line, (ch, colNum) => {
      if (ch === "^") {
        guardPos = [rowNum, colNum];
      }
      return ch;
    }),
  );
  return { grid, guardPos, guardDir: 0 };
}

function getVisited(map: Map) {
  const { grid } = map;
  let { guardPos, guardDir } = map;
  const visited = _.map(grid, (line) => _.map(line, _.constant(false)));

  while (_.get(grid, guardPos, " ") !== " ") {
    if (_.get(grid, guardPos, " ") === "#") {
      throw new Error("Merged with obstruction!!!");
    }
    _.set(visited, guardPos, true);
    // _.set(grid, guardPos, "X");
    while (_.get(grid, move(guardPos, Directions[guardDir]), " ") === "#") {
      guardDir = (guardDir + 1) % Directions.length;
    }
    guardPos = move(guardPos, Directions[guardDir]);
  }
  return visited;
}

export function part1(input: string[]) {
  const map = parseInput(input);
  const visited = getVisited(map);

  // console.log(
  //   _(grid)
  //     .map((line) => line.join(""))
  //     .join("\n"),
  // );

  return _(visited).map(_.sum).sum();
}

function doesGuardLoop(map: Map) {
  const { grid } = map;
  let { guardPos, guardDir } = map;
  const visited = _.map(grid, (line) => _.times(line.length, () => []));

  while (_.get(visited, [...guardPos, guardDir], false) === false) {
    if (_.get(grid, guardPos, " ") === " ") {
      // guard escaped!!!
      return false;
    }
    _.set(visited, [...guardPos, guardDir], true);
    while (_.get(grid, move(guardPos, Directions[guardDir]), " ") === "#") {
      guardDir = (guardDir + 1) % Directions.length;
    }
    guardPos = move(guardPos, Directions[guardDir]);
  }

  return true;
}

export function part2(input: string[]) {
  const map = parseInput(input);
  const { grid, guardPos, guardDir } = map;
  const visited = getVisited(map);

  let numOptions = 0;
  _.forEach(grid, (row, rowNum) => {
    _.forEach(row, (ch, colNum) => {
      if (ch === "." && _.get(visited, [rowNum, colNum], false)) {
        // try placing an obstacle here
        const nGrid = _.cloneDeep(grid);
        _.set(nGrid, [rowNum, colNum], "#");
        if (doesGuardLoop({ grid: nGrid, guardPos, guardDir })) {
          ++numOptions;
        }
      }
    });
  });

  return numOptions;
}
