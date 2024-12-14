import _ from "lodash";
import { mod } from "./aoc.ts";

type Robot = {
  pos: [number, number];
  vel: [number, number];
};

function p(str: string): number {
  return parseInt(str, 10);
}

function parseRobot(str: string): Robot {
  const [, px, py, vx, vy] = str.match(/^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)!;
  return {
    pos: [p(px), p(py)],
    vel: [p(vx), p(vy)],
  };
}

function moveRobot(
  robot: Robot,
  numSeconds: number,
  size: [number, number],
): Robot {
  return {
    vel: robot.vel,
    pos: [
      mod(robot.pos[0] + robot.vel[0] * numSeconds, size[0]),
      mod(robot.pos[1] + robot.vel[1] * numSeconds, size[1]),
    ],
  };
}

function findQuadant(pos: [number, number], size: [number, number]) {
  const mid = _.map(size, (n) => (n - 1) / 2);

  if (pos[0] === mid[0] || pos[1] === mid[1]) {
    return "middle";
  }

  if (pos[0] < mid[0] && pos[1] < mid[1]) {
    return "Q1";
  }

  if (pos[0] > mid[0] && pos[1] < mid[1]) {
    return "Q2";
  }

  if (pos[0] > mid[0] && pos[1] > mid[1]) {
    return "Q3";
  }

  if (pos[0] < mid[0] && pos[1] > mid[1]) {
    return "Q4";
  }

  throw new Error(
    "Math does not work that way, but convince TypeScript of that...",
  );
}

export function part1(input: string[], size: [number, number] = [101, 103]) {
  const robots = _.map(input, parseRobot);

  return _(robots)
    .map((r) => moveRobot(r, 100, size))
    .groupBy((r) => findQuadant(r.pos, size))
    .map((bots, quad) => ({
      numBots: bots.length,
      quad,
    }))
    .filter(({ quad }) => quad !== "middle")
    .map("numBots")
    .reduce(_.multiply);
}

export function part2(input: string[], size: [number, number] = [101, 103]) {
  const robots = _.map(input, parseRobot);
  const moveRobots = (robots: Robot[]) =>
    _.map(robots, (r) => moveRobot(r, 1, size));

  let bots = robots;
  for (let t = 0; t < 100_000; ++t, bots = moveRobots(bots)) {
    // turns out for the picture, no bots are overlapping
    const numCells = _(bots)
      .map(({ pos }) => JSON.stringify(pos))
      .uniq()
      .size();
    if (numCells === bots.length) {
      return t;
    }
  }
  return -1;
}
