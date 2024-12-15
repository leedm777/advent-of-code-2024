#!/bin/bash

#
# Prep for today's challenge. You'll need to grab the session cookie from the
# browser and put it into .cookies.txt for authentication.
#

# Puzzles are released at midnight Eastern time
export TZ=America/New_York

day=${1:-$(date +%d)}
year=${2:-$(date +%Y)}

input=./inputs/day${day}.txt
url=https://adventofcode.com/${year}/day/$((10#${day}))

if ! test -e "${input}"; then
  mkdir -p ./inputs/
  curl \
    --output "${input}" \
    --fail \
    --cookie .cookies.txt \
    "${url}"/input
fi

if test -e src/day"${day}".ts; then
  echo "day${day}.ts already exists" >&2
  exit 1
fi

head "${input}"

cat <<EOF > "src/day${day}.ts"
import _ from "lodash";

export function part1(input: string[]) {
  return "TODO";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
EOF

cat <<EOF > "src/day${day}.spec.ts"
import { part1, part2 } from "./day${day}.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day${day}.txt");
const exampleInput = [
];

describe("day${day}", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual("TODO");
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual("TODO");
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual("TODO");
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("TODO");
    });
  });
});
EOF

open "${url}"
