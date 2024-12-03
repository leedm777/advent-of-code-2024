import _ from "lodash";

function parseInput(input: string[]) {
  return _.map(input, (line) =>
    _(line)
      .split(" ")
      .map((s) => parseInt(s, 10))
      .value(),
  );
}

function isSafe(report: number[]) {
  const shifted = _.drop(report);
  const delta = _(shifted)
    .zip(_.take(report, report.length - 1))
    .map(([next, current]) => (current || 0) - (next || 0))
    .value();
  return (
    _.every(delta, (d) => Math.abs(d) >= 1 && Math.abs(d) <= 3) &&
    (_.every(delta, (d) => d < 0) || _.every(delta, (d) => d > 0))
  );
}

export function part1(input: string[]) {
  const reports = parseInput(input);
  const safeReports = _.filter(reports, isSafe);
  return safeReports.length;
}

function isSafeWithDampener(report: number[]) {
  if (isSafe(report)) {
    return true;
  }

  // try deleting each element individually. there's probably a better way,
  // but this works fast enough.
  for (let i = 0; i < report.length; ++i) {
    const dampenedHead = _.slice(report, 0, i);
    const dampenedTail = _.slice(report, i + 1);
    if (isSafe([...dampenedHead, ...dampenedTail])) {
      return true;
    }
  }

  return false;
}

export function part2(input: string[]) {
  const reports = parseInput(input);
  const safeReports = _.filter(reports, isSafeWithDampener);
  return safeReports.length;
}
