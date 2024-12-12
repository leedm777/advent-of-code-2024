import _ from "lodash";
import { move } from "./aoc.ts";

type Stats = {
  id: string;
  area: number;
  perimeter: number;
};

const neighbors = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function fillRegion(
  map: string[],
  regions: number[][],
  pos: number[],
  ch: string,
  regionId: number,
) {
  const todo = [pos];

  while (todo.length > 0) {
    const next = todo.pop()!;
    if (!_.get(regions, next)) {
      _.set(regions, next, regionId);
      // eslint-disable-next-line lodash/prefer-map
      _(neighbors)
        .map((dir) => move(next, dir))
        .filter((nPos) => _.get(map, nPos) === ch)
        .forEach((nPos) => {
          todo.push(nPos);
        });
    }
  }
}

export function part1(input: string[]) {
  const stats: { [key: number]: Stats } = {};
  const regions: number[][] = [];
  let nextRegionId = 1;

  _.forEach(input, (row, rowNum) => {
    _.forEach(row, (ch, colNum) => {
      const pos = [rowNum, colNum];
      const regionId = _.get(regions, pos);

      if (!regionId) {
        fillRegion(input, regions, pos, ch, nextRegionId++);
      }
    });
  });

  _.forEach(input, (row, rowNum) => {
    _.forEach(row, (ch, colNum) => {
      const pos = [rowNum, colNum];
      const regionId = _.get(regions, pos);
      stats[regionId] ||= {
        id: ch,
        area: 0,
        perimeter: 0,
      };

      ++stats[regionId].area;
      _(neighbors)
        .map((dir) => move(pos, dir))
        .forEach((nPos) => {
          if (ch === _.get(input, nPos, ".")) {
            _.set(regions, nPos, regionId);
          } else {
            ++stats[regionId].perimeter;
          }
        });
    });
  });

  return _(stats)
    .map(({ area, perimeter }) => area * perimeter)
    .sum();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
