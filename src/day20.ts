import _ from "lodash";
import { findPath, Graph, manhattanNeighbors } from "./aoc.ts";

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

export function part1(input: string[], numPicosecondsSaved = 100) {
  const track = parseInput(input);
  const antiCheats: boolean[][] = _.map(input, (line) =>
    _.map(line, _.constant(true)),
  );
  const graph: Graph<Node> = {
    getNeighborDistance: _.constant(1),
    getNeighbors(node: Node): Node[] {
      const r: Node[] = [];
      for (const [dRow, dCol] of manhattanNeighbors) {
        const pos = [node.pos[0] + dRow, node.pos[1] + dCol];
        const [rowNum, colNum] = pos;
        if (
          rowNum < 0 ||
          colNum < 0 ||
          rowNum >= antiCheats.length ||
          colNum >= antiCheats[0].length
        ) {
          continue;
        }

        const ch = track.map[pos[0]][pos[1]];

        if (ch === "#") {
          if (node.cheatPos) {
            continue;
          }

          if (antiCheats[pos[0]]?.[pos[1]]) {
            continue;
          }

          r.push({
            pos,
            cheatPos: pos,
          });
        } else {
          r.push({
            ...node,
            pos,
          });
        }
      }
      return r;
    },
    h: _.constant(0),
    isGoal(node: Node): boolean {
      return node.pos[0] === track.end[0] && node.pos[1] === track.end[1];
    },
    keyify(node: Node): string {
      return `${node.pos[0]},${node.pos[1]}:${node.cheatPos ? "t" : "f"}`;
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
