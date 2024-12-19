import _ from "lodash";
import {
  findPath,
  Graph,
  manhattanHeuristic,
  manhattanNeighbors,
  move,
} from "./aoc.ts";

function p(s: string) {
  return parseInt(s, 10);
}

export function part1(
  input: string[],
  goalPos: number[] = [70, 70],
  numBytes = 1024,
) {
  const corrupted: boolean[][] = [];
  _(input)
    .map((line) => _.split(line, ","))
    .map(([xStr, yStr]) => [p(yStr), p(xStr)])
    .take(numBytes)
    .forEach((pos) => {
      _.set(corrupted, pos, true);
    });

  // console.log(
  //   _(corrupted)
  //     .map((row) =>
  //       _(row)
  //         .map((b) => (b ? "#" : "."))
  //         .join(""),
  //     )
  //     .join("\n"),
  // );

  const g: Graph<number[]> = {
    start: [0, 0],
    isGoal: (node: number[]) => _.isEqual(node, goalPos),
    h: manhattanHeuristic(goalPos),
    getNeighbors: (node: number[]) => {
      return _(manhattanNeighbors)
        .map((n) => move(node, n))
        .reject((n) => {
          const [r, c] = n;
          return (
            _.get(corrupted, n, false) ||
            r < 0 ||
            c < 0 ||
            r > goalPos[0] ||
            c > goalPos[1]
          );
        })
        .value();
    },
    getNeighborDistance: _.constant(1),
    keyify: ([r, c]: number[]) => `${r},${c}`,
  };

  const path = findPath(g);

  return path.length - 1;
}

export function part2(input: string[], goalPos: number[] = [70, 70]) {
  const corruptedTs: number[][] = [];
  for (let rowNum = 0; rowNum <= goalPos[0]; ++rowNum) {
    for (let colNum = 0; colNum <= goalPos[1]; ++colNum) {
      _.set(corruptedTs, [rowNum, colNum], Infinity);
    }
  }
  _(input)
    .map((line) => _.split(line, ","))
    .map(([xStr, yStr]) => [p(yStr), p(xStr)])
    .forEach((pos, idx) => {
      _.set(corruptedTs, pos, idx);
    });
  let goodTs = 0;
  let badTs = input.length - 1;
  let ts = Math.floor((goodTs + badTs) / 2);

  const g: Graph<number[]> = {
    start: [0, 0],
    isGoal: (node: number[]) => _.isEqual(node, goalPos),
    h: manhattanHeuristic(goalPos),
    getNeighbors: (node: number[]) => {
      return _(manhattanNeighbors)
        .map((n) => move(node, n))
        .reject((n) => {
          const [r, c] = n;
          return (
            _.get(corruptedTs, n, -1) < ts ||
            r < 0 ||
            c < 0 ||
            r > goalPos[0] ||
            c > goalPos[1]
          );
        })
        .value();
    },
    getNeighborDistance: _.constant(1),
    keyify: ([r, c]: number[]) => `${r},${c}`,
  };

  while (badTs - goodTs > 1) {
    const path = findPath(g);
    if (path.length === 0) {
      // ts is bad
      badTs = ts;
    } else {
      goodTs = ts;
    }
    ts = Math.floor((goodTs + badTs) / 2);
  }

  return input[ts];
}
