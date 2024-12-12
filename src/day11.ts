import _ from "lodash";
import { Map } from "immutable";

type Stones = Map<number, number>;

function addStone(stones: Stones, stone: number, count: number = 1): Stones {
  const num = stones.get(stone, 0);
  return stones.set(stone, num + count);
}

function blink(stones: Stones): Stones {
  return stones.reduce((acc, count, stone) => {
    if (stone === 0) {
      return addStone(acc, 1, count);
    }

    const numDigits = Math.floor(Math.log10(stone)) + 1;
    if ((numDigits & 1) === 0) {
      const factor = 10 ** (numDigits >> 1);
      const leftStone = Math.floor(stone / factor);
      const rightStone = stone - leftStone * factor;
      return addStone(addStone(acc, leftStone, count), rightStone, count);
    }

    return addStone(acc, 2024 * stone, count);
  }, Map<number, number>());
}

export function part1([input]: string[], numIterations = 25) {
  let stones = _(input)
    .split(" ")
    .map((s) => parseInt(s, 10))
    .reduce((acc, stone) => addStone(acc, stone), Map<number, number>());

  for (let i = 0; i < numIterations; ++i) {
    stones = blink(stones);
  }

  return _.sum([...stones.values()]);
}

export function part2(input: string[]) {
  return part1(input, 75);
}
