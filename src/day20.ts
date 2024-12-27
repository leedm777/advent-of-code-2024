import _ from "lodash";
import { findPath, Graph, manhattanHeuristic } from "./aoc.ts";

type Racetrack = {
  start: number[];
  end: number[];
  map: string[][];
};

function parseInput(input: string[]) {
  const x = _.reduce(
    input,
    ({ start, end, map }, line, rowNum) => {
      const s = _.indexOf(line, "S");
      const e = _.indexOf(line, "E");
      return {
        start: s === -1 ? start : [rowNum, s],
        end: e === -1 ? end : [rowNum, e],
        map: [...map, _.map(line)],
      };
    },
    {
      start: [],
      end: [],
      map: [],
    } as Racetrack,
  );
  return x;
}

type Node = {
  pos: number[];
  cheatPos?: number[];
};

const neighbors: number[][] = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

export function part1(input: string[], numPicosecondsSaved = 100) {
  const track = parseInput(input);
  const h = manhattanHeuristic(track.end);
  const antiCheats: boolean[][] = _.map(input, (line) =>
    _.map(line, _.constant(true)),
  );
  const graph: Graph<Node> = {
    getNeighborDistance: _.constant(1),
    getNeighbors(node: Node): Node[] {
      return _(neighbors)
        .map(([dRow, dCol]) => ({
          ...node,
          pos: [node.pos[0] + dRow, node.pos[1] + dCol],
        }))
        .filter((n) => {
          const ch = _.get(track.map, n.pos, "#");
          if (ch === "#") {
            if (n.cheatPos) {
              return false;
            }
            if (_.get(antiCheats, n.pos, false)) {
              return false;
            }
          }
          return true;
        })
        .map((n) => {
          const ch = _.get(track.map, n.pos, "#");
          if (ch === "#") {
            return {
              ...n,
              cheatPos: n.pos,
            };
          }
          return n;
        })
        .value();
    },
    h(node: Node): number {
      return h(node.pos);
    },
    isGoal(node: Node): boolean {
      return _.isEqual(node.pos, track.end);
    },
    keyify(node: Node): string {
      return `${JSON.stringify(node.pos)}:${JSON.stringify(node.cheatPos)}`;
    },
    start: { pos: track.start },
  };
  const uncheatedPathLength = findPath(graph)?.length;
  for (const line of antiCheats) {
    for (let i = 0; i < line.length; ++i) {
      line[i] = false;
    }
  }
  let ctr = 0;
  while (true) {
    const p = findPath(graph);
    const cheatedPathLength = p?.length;
    const timeSaved = uncheatedPathLength - cheatedPathLength;

    if (timeSaved < numPicosecondsSaved) {
      break;
    }

    ++ctr;
    const cheatPos = _.last(p)?.cheatPos;
    if (cheatPos) {
      _.set(antiCheats, cheatPos, true);
    }
  }

  return ctr;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
