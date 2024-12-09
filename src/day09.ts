import _ from "lodash";

type BlockRange = {
  id: number;
  offset: number;
  numBlocks: number;
};

function parseInput(input: string): BlockRange[] {
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
  return blocks;
}

function sumOfSeries(n: number, first: number, last: number = first + n - 1) {
  return (n * (first + last)) / 2;
}

function checksum(blocks: BlockRange[]) {
  return _(blocks)
    .filter(({ id }) => id !== -1)
    .map(
      // Checksum is id * offset + id * (offset + 1) + id * (offset + 2) ...
      // We can change that to id * sumOfSeries(offset, numBlocks)
      ({ id, numBlocks, offset }) => id * sumOfSeries(numBlocks, offset),
    )
    .sum();
}

export function part1([input]: string[]) {
  const blocks = parseInput(input);

  for (let i = blocks.length - 1; i >= 0; --i) {
    if (blocks[i].id === -1) {
      // skip free blocks
      continue;
    }

    const fileBlock = blocks[i];
    for (let j = 0; j < i; ++j) {
      if (blocks[j].id !== -1 || blocks[j].numBlocks <= 0) {
        // skip file or empty free blocks
        continue;
      }
      const freeBlock = blocks[j];

      if (freeBlock.numBlocks >= fileBlock.numBlocks) {
        // Move the file into the free block, some will be left over
        fileBlock.offset = freeBlock.offset;
        // allocate the free space
        freeBlock.numBlocks -= fileBlock.numBlocks;
        freeBlock.offset += fileBlock.numBlocks;
        break;
      } else {
        // Move part of the file into the free block
        freeBlock.id = fileBlock.id;
        fileBlock.numBlocks -= freeBlock.numBlocks;
      }
    }
  }

  return checksum(blocks);
}

export function part2([input]: string[]) {
  const blocks = parseInput(input);

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

  return checksum(blocks);
}
