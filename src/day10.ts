import _ from "lodash";
import { move } from "./aoc.ts";

type Pos = [number, number];

const neighbors: Pos[] = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

function findSummits(map: number[][], pos: Pos): Pos[] {
  const v = _.get(map, pos, -Infinity);
  if (v === 9) {
    return [pos];
  }

  return _(neighbors)
    .flatMap((neighbor): Pos[] => {
      const nPos = move(pos, neighbor) as Pos;
      const nV = _.get(map, nPos, -Infinity);
      if (nV === v + 1) {
        return findSummits(map, nPos);
      }
      return [[-Infinity, -Infinity]];
    })
    .reject(([r]) => r === -Infinity)
    .uniqBy(([r, c]) => `${r},${c}`)
    .value();
}

type Cell = {
  pos: [number, number];
  height: number;
};

function parseInput(input: string[]) {
  const map = _.map(input, (line) => _.map(line, (ch) => parseInt(ch, 10)));
  const trailheads = _(map)
    .flatMap((row, rowNum) =>
      _.map(
        row,
        (height, colNum) => ({ pos: [rowNum, colNum], height }) as Cell,
      ),
    )
    .filter(({ height }) => height === 0)
    .value();
  return { map, trailheads };
}

export function part1(input: string[]) {
  const { map, trailheads } = parseInput(input);

  return _(trailheads)
    .flatMap((th) => findSummits(map, th.pos))
    .size();
}

function findPaths(map: number[][], pos: Pos): Pos[] {
  const v = _.get(map, pos, -Infinity);
  if (v === 9) {
    return [pos];
  }

  return _(neighbors)
    .flatMap((neighbor): Pos[] => {
      const nPos = move(pos, neighbor) as Pos;
      const nV = _.get(map, nPos, -Infinity);
      if (nV === v + 1) {
        return findPaths(map, nPos);
      }
      return [[-Infinity, -Infinity]];
    })
    .reject(([r]) => r === -Infinity)
    .value();
}

export function part2(input: string[]) {
  const { map, trailheads } = parseInput(input);

  return _(trailheads)
    .flatMap((th) => findPaths(map, th.pos))
    .size();
}
