import _ from "lodash";

function parseInput(input: string[]) {
  const [availLine, , ...desired] = input;
  const avail = _.split(availLine, ", ");
  return { desired, avail };
}

export function part1(input: string[]) {
  const { desired, avail } = parseInput(input);
  const availRe = new RegExp(`^((${avail.join(")|(")}))+$`);
  return _(desired)
    .filter((s) => s.match(availRe) !== null)
    .size();
}

type MatchMap = {
  [ch: string]: {
    term: boolean;
    next: MatchMap;
  };
};

export function countValidCombinations(
  desired: string,
  avail: MatchMap,
  rootAvail: MatchMap,
): number {
  const ch = desired.substring(0, 1);
  const match = avail[ch];
  if (!match) {
    return 0;
  }

  const rest = desired.substring(1);
  if (rest === "") {
    return match.term ? 1 : 0;
  }

  if (match.term) {
    return (
      countValidCombinations(rest, match.next, rootAvail) +
      countValidCombinations(rest, rootAvail, rootAvail)
    );
  } else {
    return countValidCombinations(rest, match.next, rootAvail);
  }
}

export function part2(input: string[]) {
  const { desired, avail } = parseInput(input);
  const m: MatchMap = {};
  for (const str of avail) {
    let r = m;
    _.forEach(str, (ch, idx) => {
      if (!r[ch]) {
        r[ch] = {
          term: false,
          next: {},
        };
      }
      if (idx === str.length - 1) {
        r[ch].term = true;
      }
      r = r[ch].next;
    });
  }
  return _(desired)
    .map((d) => countValidCombinations(d, m, m))
    .sum();
}
