import _ from "lodash";
import { splitArray, move } from "./aoc.ts";

const Dirs: { [dir: string]: number[] } = {
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
  "^": [-1, 0],
};

export function part1(input: string[]) {
  let botPos: number[] = [NaN, NaN];
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
    const boxPositions: number[][] = [];
    let spacePos = move(botPos, dir);
    while (_.get(grid, spacePos) === "O") {
      boxPositions.push(spacePos);
      spacePos = move(spacePos, dir);
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

  return _(grid)
    .flatMap((row, rowNum) =>
      _.map(row, (ch, colNum) => {
        if (ch === "O") {
          return 100 * rowNum + colNum;
        }

        return 0;
      }),
    )
    .sum();
}

export function part2(input: string[]) {
  let botPos: number[] = [NaN, NaN];
  const [mapLines, movesLines] = splitArray(input, (line) => line === "");
  const grid = _.map(mapLines, (line, rowNum) =>
    _.flatMap(line, (ch, colNum) => {
      switch (ch) {
        case "@":
          botPos = [rowNum, 2 * colNum];
          return ["@", "."];
        case "O":
          return ["[", "]"];
        case ".":
          return [".", "."];
        case "#":
          return ["#", "#"];
        default:
          throw new Error(`Invalid character ${ch}`);
      }
    }),
  );

  const moves = _.join(movesLines, "");

  for (const moveCh of moves) {
    const dir = Dirs[moveCh];
    if (dir[0] === 0) {
      // horizontal
      const moves: number[][] = [];
      let spacePos = botPos;
      while (["@", "[", "]"].includes(_.get(grid, spacePos))) {
        moves.push(spacePos);
        spacePos = move(spacePos, dir);
      }
      if (_.get(grid, spacePos) === "#") {
        // hit a wall, no move
        console.log(`Skip: ${moveCh}`);
        continue;
      }

      while (!_.isEmpty(moves)) {
        const nextPos = moves.pop()!;
        const nextCh = _.get(grid, nextPos);
        _.set(grid, spacePos, nextCh);
        spacePos = nextPos;
      }

      _.set(grid, botPos, ".");
      botPos = move(botPos, dir);

      console.log(
        `Move: ${moveCh}\n` +
          _(grid)
            .map((row) => _.join(row, ""))
            .join("\n"),
      );
    } else {
      // vertical
      const toMove: number[][] = [];
      const toCheck = [botPos];
      let wallHit = false;
      while (!_.isEmpty(toCheck) && !wallHit) {
        const checkPos = toCheck.pop()!;
        toMove.push(checkPos);
        const nextPos = move(checkPos, dir);
        const nextCh = _.get(grid, nextPos);

        if (nextCh === "#") {
          wallHit = true;
        } else if (nextCh === "[") {
          toCheck.push(nextPos);
          toCheck.push(move(nextPos, Dirs[">"]));
        } else if (nextCh === "]") {
          toCheck.push(nextPos);
          toCheck.push(move(nextPos, Dirs["<"]));
        }
      }

      if (wallHit) {
        // hit a wall, no move
        console.log(`Skip: ${moveCh}`);
        continue;
      }

      const toMoveUniq = _.uniqBy(toMove, ([r, c]) => `${r},${c}`);
      for (const movePos of toMoveUniq) {
        const destPos = move(movePos, dir);
        const moveCh = _.get(grid, movePos);
        _.set(grid, destPos, moveCh);
        _.set(grid, movePos, ".");
        if (moveCh === "@") {
          botPos = destPos;
        }
      }
    }

    console.log(
      `Move: ${moveCh}\n` +
        _(grid)
          .map((row) => _.join(row, ""))
          .join("\n"),
    );
  }

  return {
    botPos,
    grid,
    moves,
  };
}
