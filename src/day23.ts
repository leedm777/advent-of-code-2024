import _ from "lodash";

type Network = { [node: string]: string[] };

export function part1(input: string[]) {
  const network = _(input)
    .map((line) => line.match(/^([a-z]+)-([a-z]+)$/)!)
    .map(([, lhs, rhs]) => [lhs, rhs])
    .reduce((acc, [lhs, rhs]) => {
      return {
        ...acc,
        [lhs]: [...(acc[lhs] || []), rhs],
        [rhs]: [...(acc[rhs] || []), lhs],
      };
    }, {} as Network);
  return _.chain(network)
    .pickBy((neighbors, n) => n.startsWith("t"))
    .reduce((acc, neighbors, node) => {
      _.forEach(neighbors, (neighbor) => {
        const commonNeighbors = _.intersection(neighbors, network[neighbor]);
        if (commonNeighbors.length > 0) {
          for (const commonNeighbor of commonNeighbors) {
            acc.push(_.sortBy([node, neighbor, commonNeighbor]));
          }
        }
      });
      return acc;
    }, [] as string[][])
    .uniqBy(_.join)
    .size()
    .value();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
