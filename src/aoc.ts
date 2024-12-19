import fs from "fs";
import _ from "lodash";
import assert from "node:assert";

export function readInput(filename: string) {
  return _.chain(fs.readFileSync(filename, "utf-8"))
    .trimEnd()
    .split("\n")
    .value();
}

export function mod(a: number, n: number) {
  let r = a % n;
  // signed zeros are a thing I guess
  if (Object.is(r, -0)) {
    return 0;
  }
  if (r < 0) {
    r += n;
  }
  return r;
}

export function splitArray<T>(arr: T[], fn: (elem: T) => boolean) {
  if (_.isEmpty(arr)) {
    return [];
  }

  return _.reduce(
    arr,
    (acc, elem) => {
      if (fn(elem)) {
        return [...acc, []];
      }

      const last = _.last(acc) || [];
      return [..._.initial(acc), [...last, elem]];
    },
    [[]] as T[][],
  );
}

export function move(pos: number[], direction: number[]) {
  const r = [];
  for (let i = 0; i < pos.length; ++i) {
    r[i] = pos[i] + direction[i];
  }
  return r;
}

export class MinHeap<T> {
  private heap: { priority: number; node: T }[];

  constructor() {
    // null element helps with the off by one errors
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  insert(priority: number, node: T) {
    this.heap.push({
      priority,
      node,
    });

    let i = this.heap.length - 1;
    let p = Math.floor((i - 1) / 2);

    while (i > 0 && this.priority(i) < this.priority(p)) {
      this.swap(i, p);

      i = p;
      p = Math.floor((i - 1) / 2);
    }
  }

  peek() {
    return this.heap[0].node;
  }

  extract() {
    if (this.isEmpty()) {
      return;
    }

    const r = this.heap[0];
    if (this.heap.length <= 1) {
      this.heap = [];
      return r.node;
    }

    this.heap[0] = this.heap.pop()!;

    let i = 0;
    let c1 = 1;
    let c2 = 2;

    while (
      this.priority(i) > this.priority(c1) ||
      this.priority(i) > this.priority(c2)
    ) {
      if (this.priority(c1) < this.priority(c2)) {
        this.swap(i, c1);
        i = c1;
      } else {
        this.swap(i, c2);
        i = c2;
      }

      c1 = 2 * i + 1;
      c2 = 2 * i + 2;
    }

    return r.node;
  }

  private swap(i1: number, i2: number) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  private priority(i: number) {
    return _.get(this.heap, i, { priority: Infinity }).priority;
  }
}

export function dijkstraHeuristic() {
  return 0;
}

export function manhattanHeuristic(goal: number[]) {
  return (p: number[]) => Math.abs(goal[0] - p[0]) + Math.abs(goal[1] + p[1]);
}

export const manhattanNeighbors = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

/**
 * Interface for an aMAZEing graph.
 */
export type Graph<T> = {
  /** Starting node. */
  start: T;
  /** Returns true if a node is the goal. */
  isGoal: (node: T) => boolean;
  /** Heuristic to estimate distance to the goal. */
  h: (node: T) => number;
  /** Returns a list of all neighboring nodes. */
  getNeighbors: (node: T) => T[];
  /** Returns distance to a neighbor. */
  getNeighborDistance: (node1: T, node2: T) => number;
  /** Converts a node into a string to use as a key. */
  keyify: (node: T) => string;
};

/**
 * Implementation of A* from the Wikipedia algo
 * see [](https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode)
 *
 * @param graph Graph of the maze to solve.
 * @return Array of coordinates with the path found from start to goal.
 */
export function findPath<T>(graph: Graph<T>) {
  const open = new MinHeap<T>();
  open.insert(graph.h(graph.start), graph.start);
  const cameFrom: { [key: string]: T } = {};

  // g(n) -> cost of the cheapest path from start to n currently known.
  const g: { [key: string]: number } = {};
  const setCost = (node: T, cost: number) => {
    g[graph.keyify(node)] = cost;
  };
  const getCost = (node: T) => _.get(g, graph.keyify(node), Infinity);
  setCost(graph.start, 0);

  let current = open.extract();
  while (current && !graph.isGoal(current)) {
    const neighbors = graph.getNeighbors(current);
    for (const neighbor of neighbors) {
      const cost =
        getCost(current) + graph.getNeighborDistance(current, neighbor);
      assert(cost < Infinity, `Should have cost for node ${current}`);
      if (cost < getCost(neighbor)) {
        // new path to the neighbor
        cameFrom[graph.keyify(neighbor)] = current;
        setCost(neighbor, cost);
        // f(n) -> current best guess as to how short a path from start to
        // finish can be if it goes through n
        const f = cost + graph.h(neighbor);
        open.insert(f, neighbor);
      }
    }

    current = open.extract();
  }

  // walk back to the beginning to record the path
  const path: T[] = [];
  while (current) {
    path.unshift(current);
    current = cameFrom[graph.keyify(current)];
  }

  return path;
}
