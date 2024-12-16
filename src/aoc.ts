import fs from "fs";
import _ from "lodash";

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
