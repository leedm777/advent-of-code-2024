import _ from "lodash";

function parseInput(input) {
  return _.map(input, (line) =>
    _(line)
      .split(" ")
      .map((s) => parseInt(s, 10))
      .value(),
  );
}

function isSafe(report) {
  const shifted = _.drop(report);
  const delta = _(shifted)
    .zip(_.take(report, report.length - 1))
    .map(([next, current]) => current - next)
    .value();
  return (
    _.every(delta, (d) => Math.abs(d) >= 1 && Math.abs(d) <= 3) &&
    (_.every(delta, (d) => d < 0) || _.every(delta, (d) => d > 0))
  );
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part1(input) {
  const reports = parseInput(input);
  const safeReports = _.filter(reports, isSafe);
  return safeReports.length;
}

/**
 * @param {Array<string>} input Puzzle input
 * @return {number} Puzzle output
 */
export function part2(input) {
  return "TODO";
}
