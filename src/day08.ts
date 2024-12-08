import _ from "lodash";

function parseInput(input: string[]) {
  const size = [input.length, input[0].length];
  const antennas = _(input)
    .flatMap((line, rowNum) =>
      _.map(line, (ch, colNum) => {
        return { ch, pos: [rowNum, colNum] };
      }),
    )
    .reject(({ ch }) => ch === ".")
    .groupBy("ch")
    .mapValues((list) => _.map(list, "pos"))
    .value();

  return { size, antennas };
}

function add(lhs: number[], rhs: number[]) {
  const r = [];
  for (let i = 0; i < lhs.length; ++i) {
    r[i] = lhs[i] + rhs[i];
  }
  return r;
}

function difference(lhs: number[], rhs: number[]) {
  const r = [];
  for (let i = 0; i < lhs.length; ++i) {
    r[i] = lhs[i] - rhs[i];
  }
  return r;
}

function findAntinodes(antennas: number[][]) {
  const antinodes = [];
  for (let i = 0; i < antennas.length; ++i) {
    for (let j = i + 1; j < antennas.length; ++j) {
      const antenna1 = antennas[i];
      const antenna2 = antennas[j];
      const dist = difference(antenna2, antenna1);

      antinodes.push(difference(antenna1, dist));
      antinodes.push(add(antenna2, dist));
    }
  }

  return antinodes;
}

function isOnGrid([rowNum, colNum]: number[], size: number[]) {
  return rowNum >= 0 && rowNum < size[0] && colNum >= 0 && colNum < size[1];
}

export function part1(input: string[]) {
  const { size, antennas } = parseInput(input);

  return _(antennas)
    .mapValues(findAntinodes)
    .mapValues((antinodes) => _.filter(antinodes, (pos) => isOnGrid(pos, size)))
    .flatMap()
    .sortBy()
    .uniqBy(([r, c]) => `${r},${c}`)
    .size();
}

function findAllAntinodes(antennas: number[][], size: number[]) {
  const antinodes = [];
  for (let i = 0; i < antennas.length; ++i) {
    for (let j = i + 1; j < antennas.length; ++j) {
      const antenna1 = antennas[i];
      const antenna2 = antennas[j];
      const dist = difference(antenna2, antenna1);

      for (let a = antenna1; isOnGrid(a, size); a = difference(a, dist)) {
        antinodes.push(a);
      }

      for (let a = antenna2; isOnGrid(a, size); a = add(a, dist)) {
        antinodes.push(a);
      }
    }
  }

  return antinodes;
}

export function part2(input: string[]) {
  const { size, antennas } = parseInput(input);

  return _(antennas)
    .mapValues((antennas) => findAllAntinodes(antennas, size))
    .flatMap()
    .sortBy()
    .uniqBy(([r, c]) => `${r},${c}`)
    .size();
}
