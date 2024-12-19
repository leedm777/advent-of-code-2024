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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
