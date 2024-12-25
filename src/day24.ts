import _ from "lodash";
import { splitArray } from "./aoc.ts";

interface Gate {
  value(): boolean;
}

class Circuit {
  private readonly gates: { [key: string]: Gate };

  constructor() {
    this.gates = {};
  }

  getGate(key: string) {
    return this.gates[key];
  }

  addGate(key: string, gate: Gate) {
    this.gates[key] = gate;
  }

  getOutputs(): string[] {
    return _(this.gates)
      .keys()
      .filter((key) => key.startsWith("z"))
      .orderBy(_.identity, "desc")
      .value();
  }
}

function inputGate(value: boolean): Gate {
  return {
    value: _.constant(value),
  };
}

function opGate(
  lhs: string,
  rhs: string,
  op: (lhv: boolean, rhv: boolean) => boolean,
  circuit: Circuit,
): Gate {
  return {
    value() {
      const lhv = circuit.getGate(lhs).value();
      const rhv = circuit.getGate(rhs).value();
      return op(lhv, rhv);
    },
  };
}

export function part1(input: string[]) {
  const [inputs, cxns] = splitArray(input, (line) => line === "");
  const circuit = new Circuit();
  _.forEach(inputs, (input) => {
    const [name, valueStr] = _.split(input, ": ");
    const value = valueStr === "1";
    circuit.addGate(name, inputGate(value));
  });
  _.forEach(cxns, (cxn) => {
    const m = cxn.match(
      /^(?<lhs>[a-z0-9]+) (?<op>[A-Z]+) (?<rhs>[a-z0-9]+) -> (?<output>[a-z0-9]+)$/,
    );
    if (!m) {
      throw new Error(`Could not parse ${cxn}`);
    }
    const { lhs, op: opStr, rhs, output } = m.groups!;
    let op;
    switch (opStr) {
      case "AND":
        op = (a: boolean, b: boolean) => a && b;
        break;
      case "OR":
        op = (a: boolean, b: boolean) => a || b;
        break;
      case "XOR":
        op = (a: boolean, b: boolean) => a !== b;
        break;
      default:
        throw new Error(`Invalid op ${opStr}`);
    }
    circuit.addGate(output, opGate(lhs, rhs, op, circuit));
  });

  const v = _(circuit.getOutputs())
    .map((n) => circuit.getGate(n).value())
    .reduce((acc, v) => (acc << 1n) | ((v && 1n) || 0n), 0n);
  return Number(v);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
