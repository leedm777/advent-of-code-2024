import _ from "lodash";
import { findPath, Graph } from "./aoc.ts";

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
  ch?: string;
};

const neighbors: number[][] = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

export function part1(input: string[], numPicosecondsSaved = 100) {
  const track = parseInput(input);
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
        .reject(({ pos: [rowNum, colNum] }) => {
          return (
            rowNum < 0 ||
            colNum < 0 ||
            rowNum >= antiCheats.length ||
            colNum >= antiCheats[0].length
          );
        })
        .map((n) => ({
          ...n,
          ch: _.get(track.map, n.pos, "#"),
        }))
        .filter((n) => {
          if (n.ch === "#") {
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
          if (n.ch === "#") {
            return {
              ...n,
              cheatPos: n.pos,
            };
          }
          return n;
        })
        .value();
    },
    h: _.constant(0),
    isGoal(node: Node): boolean {
      return node.pos[0] === track.end[0] && node.pos[1] === track.end[1];
    },
    keyify(node: Node): string {
      return `${node.pos[0]},${node.pos[1]}:${(node.cheatPos && "t") || "f"}`;
    },
    start: { pos: track.start },
  };
  // console.time("Setting baseline");
  const uncheatedPathLength = findPath(graph)?.length;
  // console.timeEnd("Setting baseline");
  // console.log(`  ${uncheatedPathLength}`);
  for (const line of antiCheats) {
    for (let i = 0; i < line.length; ++i) {
      line[i] = false;
    }
  }
  let ctr = 0;
  while (true) {
    // console.time("Finding");
    const p = findPath(graph);
    // console.timeEnd("Finding");
    const cheatedPathLength = p?.length;
    // console.log(`  ${cheatedPathLength}`);
    const timeSaved = uncheatedPathLength - cheatedPathLength;
    console.log(timeSaved);

    if (timeSaved < numPicosecondsSaved) {
      break;
    }

    ++ctr;
    const cheatPos = _.last(p)?.cheatPos;
    if (cheatPos) {
      _.set(antiCheats, cheatPos, true);
      // console.log(`  ${JSON.stringify(cheatPos)}`);
    }
  }

  return ctr;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
