import _ from "lodash";
import { findPath, Graph, manhattanHeuristic, move } from "./aoc.ts";

const Dirs: { [dir: string]: number[] } = {
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
  "^": [-1, 0],
};

const Turns: { [dir: string]: [string, string] } = {
  ">": ["^", "v"],
  v: ["<", ">"],
  "<": ["^", "v"],
  "^": ["<", ">"],
};

type Node = {
  pos: number[];
  dir: string;
};

export function part1(grid: string[]) {
  let start: Node = { pos: [NaN, NaN], dir: "" };
  let goal: number[] = [NaN, NaN];
  _.forEach(grid, (row, rowNum) => {
    _.forEach(row, (ch, colNum) => {
      if (ch === "S") {
        start = {
          pos: [rowNum, colNum],
          dir: ">",
        };
      } else if (ch === "E") {
        goal = [rowNum, colNum];
      }
    });
  });
  const m = manhattanHeuristic(goal);
  const graph: Graph<Node> = {
    start,
    isGoal: (node: Node) => _.isEqual(node.pos, goal),
    h: (node: Node) => m(node.pos),
    getNeighbors: (node: Node) => {
      const [t1, t2] = Turns[node.dir];
      const neighbors: Node[] = [
        {
          pos: node.pos,
          dir: t1,
        },
        {
          pos: node.pos,
          dir: t2,
        },
      ];

      const movePos = move(node.pos, Dirs[node.dir]);
      if (_.get(grid, movePos) !== "#") {
        neighbors.push({
          pos: movePos,
          dir: node.dir,
        });
      }

      return neighbors;
    },

    getNeighborDistance: (n1: Node, n2: Node) => {
      if (n1.dir !== n2.dir) {
        return 1000;
      }
      return 1;
    },

    keyify: (n: Node) => `${n.pos[0]},${n.pos[1]},${n.dir}`,
  };
  const path = findPath(graph);
  let cost = 0;
  for (let i = 1; i < path.length; ++i) {
    const prior = path[i - 1];
    const current = path[i];
    if (prior.dir === current.dir) {
      ++cost;
    } else {
      cost += 1000;
    }
  }
  return cost;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
