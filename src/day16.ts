import _ from "lodash";
import { findPath, Graph, manhattanHeuristic, MinHeap, move } from "./aoc.ts";
import assert from "node:assert";

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

export function part2(grid: string[]) {
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
  const graph = {
    isGoal: (node: Node) => _.isEqual(node.pos, goal),
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

  const open = new MinHeap<Node>();
  open.insert(0, start);
  const cameFrom: { [key: string]: Node[] } = {};

  // g(n) -> cost of the cheapest path from start to n currently known.
  const g: { [key: string]: number } = {};
  const setCost = (node: Node, cost: number) => {
    g[graph.keyify(node)] = cost;
  };
  const getCost = (node: Node) => _.get(g, graph.keyify(node), Infinity);
  setCost(start, 0);

  const goals: Node[] = [];

  for (let current = open.extract(); current; current = open.extract()) {
    if (graph.isGoal(current)) {
      goals.push(current);
      continue;
    }
    const neighbors = graph.getNeighbors(current);
    for (const neighbor of neighbors) {
      const cost =
        getCost(current) + graph.getNeighborDistance(current, neighbor);
      assert(cost < Infinity, `Should have cost for node ${current}`);
      if (cost < getCost(neighbor)) {
        // new path to the neighbor
        cameFrom[graph.keyify(neighbor)] = [current];
        setCost(neighbor, cost);
        open.insert(cost, neighbor);
      } else if (cost === getCost(neighbor)) {
        // a new path of the same cost
        cameFrom[graph.keyify(neighbor)].push(current);
      }
    }
  }

  // walk back to the beginning to record the path
  const couldVisit: { [key: string]: boolean } = {};
  let todo: Node[] = _.uniqBy(
    goals,
    ({ pos: [r, c], dir }) => `${r},${c},${dir}`,
  );
  const minCost = _(goals).map(getCost).min();
  todo = _.filter(todo, (n) => getCost(n) === minCost);
  // const visited = _.map(grid, (row) => _.map(row));
  while (!_.isEmpty(todo)) {
    const n = todo.pop()!;
    couldVisit[`${n.pos.join(",")}`] = true;
    // _.set(visited, n.pos, "O");
    const next = cameFrom[graph.keyify(n)];
    if (!_.isEmpty(next)) {
      todo.push(...next);
    }
  }

  // console.log(
  //   _(visited)
  //     .map((row) => _.join(row, ""))
  //     .join("\n"),
  // );

  return _.size(couldVisit);
}
