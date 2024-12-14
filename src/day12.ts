import _ from "lodash";
import { move } from "./aoc.ts";

type Dir = [number, number];
const neighbors: [Dir, Dir, Dir, Dir] = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

type Plot = {
  plant: string;
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
};

function parseInput(input: string[]) {
  const map = _.map(input, (line, rowNum) =>
    _.map(line, (plant, colNum) => {
      const pos = [rowNum, colNum];
      const hasBorder = _.map(neighbors, (dir) => {
        const neighbotPlant = _.get(input, move(pos, dir), ".");
        return neighbotPlant !== plant;
      });
      return { plant, region: NaN, hasBorder } as Plot;
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

export function part1(input: string[]) {
  const map = parseInput(input);

  return _.chain(map)
    .flatten()
    .reduce((regions, plot) => {
      if (!regions[plot.region]) {
        regions[plot.region] = {
          id: plot.region,
          plant: plot.plant,
          area: 0,
          perimeter: 0,
        };
      }

      ++regions[plot.region].area;
      regions[plot.region].perimeter += _.sum(plot.hasBorder);
      return regions;
    }, [] as Region[])
    .map(({ area, perimeter }) => area * perimeter)
    .sum()
    .value();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
