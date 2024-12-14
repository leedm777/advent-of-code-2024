import _ from "lodash";
import { move } from "./aoc.ts";

type Dir = [number, number];
const neighbors: [Dir, Dir, Dir, Dir] = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

enum Dirs {
  Right = 0,
  Down,
  Left,
  Up,
}

type Plot = {
  plant: string;
  pos: [number, number];
  region: number;
  hasBorder: [boolean, boolean, boolean, boolean];
};

function floodFill(
  map: Plot[][],
  startPos: [number, number],
  regionId: number,
) {
  // from https://en.wikipedia.org/wiki/Flood_fill
  const q: number[][] = [startPos];
  const { plant } = _.get(map, startPos);
  while (!_.isEmpty(q)) {
    const pos = q.pop()!;
    const plot = _.get(map, pos);
    if (!plot || !_.isNaN(plot.region) || plot.plant !== plant) {
      continue;
    }

    plot.region = regionId;
    q.push(..._.map(neighbors, (dir) => move(pos, dir)));
  }
}

type Region = {
  id: number;
  plant: string;
  area: number;
  perimeter: number;
  numSides: number;
};

function parseInput(input: string[]) {
  const map = _.map(input, (line, rowNum) =>
    _.map(line, (plant, colNum) => {
      const pos = [rowNum, colNum];
      const hasBorder = _.map(neighbors, (dir) => {
        const neighbotPlant = _.get(input, move(pos, dir), ".");
        return neighbotPlant !== plant;
      });
      return { plant, pos, region: NaN, hasBorder } as Plot;
    }),
  );

  // setup regions
  let regionId = 0;
  _.forEach(map, (line, rowNum) => {
    _.forEach(line, (plot, colNum) => {
      if (_.isNaN(plot.region)) {
        floodFill(map, [rowNum, colNum], regionId++);
      }
    });
  });
  return map;
}

function computeRegions(map: Plot[][]) {
  return _(map)
    .flatten()
    .reduce((regions, plot) => {
      if (!regions[plot.region]) {
        regions[plot.region] = {
          id: plot.region,
          plant: plot.plant,
          area: 0,
          perimeter: 0,
          numSides: 0,
        };
      }

      const region = regions[plot.region];
      ++region.area;
      region.perimeter += _.sum(plot.hasBorder);

      // try counting corners to see if that gets us sides
      const neighborPlots = _(neighbors)
        .map((dir) => move(plot.pos, dir))
        .map((pos) => _.get(map, pos) as Plot)
        .value();

      // A corner exists if the plot has edges on both sides, OR
      // if the next plot on one side is _missing_ that edge
      const hasCorner = (d1: Dirs, d2: Dirs) =>
        plot.hasBorder[d1] &&
        (plot.hasBorder[d2] || !neighborPlots[d2].hasBorder[d1]);

      if (hasCorner(Dirs.Up, Dirs.Right)) {
        ++region.numSides;
      }

      // bottom side
      if (hasCorner(Dirs.Down, Dirs.Right)) {
        ++region.numSides;
      }

      // left side
      if (hasCorner(Dirs.Left, Dirs.Down)) {
        ++region.numSides;
      }

      // right side
      if (hasCorner(Dirs.Right, Dirs.Down)) {
        ++region.numSides;
      }

      return regions;
    }, [] as Region[]);
}

export function part1(input: string[]) {
  const map = parseInput(input);

  return _(map)
    .thru(computeRegions)
    .map(({ area, perimeter }) => area * perimeter)
    .sum();
}

export function part2(input: string[]) {
  const map = parseInput(input);
  return _(map)
    .thru(computeRegions)
    .map((r) => r.area * r.numSides)
    .sum();
}
