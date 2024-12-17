import _ from "lodash";
import { splitArray, move } from "./aoc.ts";

const Dirs: { [dir: string]: [number, number] } = {
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
  "^": [-1, 0],
};

export function part1(input: string[]) {
  let botPos: [number, number] = [NaN, NaN];
  const [mapLines, movesLines] = splitArray(input, (line) => line === "");
  const grid = _.map(mapLines, (line, rowNum) =>
    _.map(line, (ch, colNum) => {
      if (ch === "@") {
        botPos = [rowNum, colNum];
      }
      return ch;
    }),
  );
  const moves = _.join(movesLines, "");

  for (const moveCh of moves) {
    const dir = Dirs[moveCh];
    const boxPositions: [number, number][] = [];
    let spacePos = move(botPos, dir) as [number, number];
    while (_.get(grid, spacePos) === "O") {
      boxPositions.push(spacePos);
      spacePos = move(spacePos, dir) as [number, number];
    }

    if (_.get(grid, spacePos) === "#") {
      // hit a wall, no move
      // console.log(`Skip: ${moveCh}`);
      continue;
    }

    // move the bot
    if (_.isEmpty(boxPositions)) {
      // just swap bot and free space
      _.set(grid, botPos, ".");
      _.set(grid, spacePos, "@");
      botPos = spacePos;
    } else {
      // move some boxes, too
      _.set(grid, botPos, ".");
      _.set(grid, boxPositions[0], "@");
      _.set(grid, spacePos, "O");
      botPos = boxPositions[0];
    }

    // console.log(
    //   `Move: ${moveCh}\n` +
    //     _(grid)
    //       .map((row) => _.join(row, ""))
    //       .join("\n"),
    // );
  }

  return (
    _(grid)
      // .map((row) => _.join(row, ""))
      // .value();
      .flatMap((row, rowNum) =>
        _.map(row, (ch, colNum) => {
          if (ch === "O") {
            return 100 * rowNum + colNum;
          }

          return 0;
        }),
      )
      .sum()
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
