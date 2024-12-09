import _ from "lodash";

export function part1([input]: string[]) {
  const { blocks } = _(input)
    .map((ch) => parseInt(ch))
    .reduce(
      ({ nextId, blocks }, numBlocks, idx) => {
        if (numBlocks === 0) {
          return { nextId, blocks };
        }

        if ((idx & 1) === 0) {
          // file type
          const id = nextId++;
          blocks = _.concat(blocks, _.times(numBlocks, _.constant(id)));
          return { nextId, blocks };
        }

        // free type
        blocks = _.concat(blocks, _.times(numBlocks, _.constant(-1)));
        return { nextId, blocks };
      },
      {
        nextId: 0,
        blocks: [] as number[],
      },
    );

  for (let i = 0; i < blocks.length; ++i) {
    if (blocks[i] === -1) {
      let v = blocks.pop();
      while (v === -1) {
        v = blocks.pop();
      }
      blocks[i] = v || NaN;
    }
  }

  return _(blocks)
    .map((id, idx) => id * idx)
    .sum();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
