import _ from "lodash";

const Directions = [
  [-1, 0], // start facing north
  [0, 1], // turn right 90 degrees
  [1, 0],
  [0, -1],
];

function move(pos: number[], direction: number[]) {
  const r = [];
  for (let i = 0; i < pos.length; ++i) {
    r[i] = pos[i] + direction[i];
  }
  return r;
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
    visited[guardPos[0]][guardPos[1]] = true;
    // grid[guardPos[0]][guardPos[1]] = "X";
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
  const visited = _.map(grid, (line) =>
    _.times(line.length, (): boolean[] => []),
  );

  while (!visited[guardPos[0]]?.[guardPos[1]]?.[guardDir]) {
    if (_.isNil(grid[guardPos[0]]?.[guardPos[1]])) {
      // guard escaped!!!
      return false;
    }
    visited[guardPos[0]][guardPos[1]][guardDir] = true;
    let m;
    while (
      (m = move(guardPos, Directions[guardDir])) &&
      grid[m[0]]?.[m[1]] === "#"
    ) {
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
      if (ch === "." && visited[rowNum][colNum]) {
        // try placing an obstacle here
        const nGrid = [...grid];
        nGrid[rowNum] = [...grid[rowNum]];
        nGrid[rowNum][colNum] = "#";
        if (doesGuardLoop({ grid: nGrid, guardPos, guardDir })) {
          ++numOptions;
        }
      }
    });
  });

  return numOptions;
}
