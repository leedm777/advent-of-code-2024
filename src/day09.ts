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

function sumOfSeries(n: number, first: number, last: number = first + n - 1) {
  return (n * (first + last)) / 2;
}

export function part2([input]: string[]) {
  let id = 0;
  let offset = 0;
  const blocks = _(input)
    .map((ch) => parseInt(ch))
    .map((numBlocks, idx) => {
      const r = {
        numBlocks,
        id: (idx & 1) === 0 ? id++ : -1,
        offset,
      };
      offset += numBlocks;
      return r;
    })
    .reject(({ numBlocks }) => numBlocks === 0)
    .value();

  for (let i = blocks.length - 1; i >= 0; --i) {
    if (blocks[i].id === -1) {
      // skip free blocks
      continue;
    }

    const fileBlock = blocks[i];
    for (let j = 0; j < i; ++j) {
      if (blocks[j].id !== -1) {
        // skip file blocks
        continue;
      }
      const freeBlock = blocks[j];

      if (freeBlock.numBlocks >= fileBlock.numBlocks) {
        // Move the file
        fileBlock.offset = freeBlock.offset;
        // allocate the free space
        freeBlock.numBlocks -= fileBlock.numBlocks;
        freeBlock.offset += fileBlock.numBlocks;
        break;
      }
    }
  }

  return _(blocks)
    .filter(({ id }) => id !== -1)
    .map(
      // Checksum is id * offset + id * (offset + 1) + id * (offset + 2) ...
      // We can change that to id * sumOfSeries(offset, numBlocks)
      ({ id, numBlocks, offset }) => id * sumOfSeries(numBlocks, offset),
    )
    .sum();
}
