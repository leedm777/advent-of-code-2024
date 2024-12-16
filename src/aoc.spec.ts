import { mod, splitArray, move, MinHeap } from "./aoc.ts";

describe("aoc helpers", () => {
  describe("mod", () => {
    it.each([
      [1, 10, 1],
      [-1, 10, 9],
      [-10, 10, 0],
    ])("%s mod %s === %s", (lhs, rhs, expected) => {
      const actual = mod(lhs, rhs);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe("splitArray", () => {
    it("should work with a basic array", () => {
      const input = [
        "section 1",
        "more text",
        "",
        "section 2",
        "even more text",
      ];

      const actual = splitArray(input, (line) => line === "");
      expect(actual).toStrictEqual([
        ["section 1", "more text"],
        ["section 2", "even more text"],
      ]);
    });
  });

  describe("move", () => {
    it("should move a 2d position", () => {
      const actual = move([10, 20], [-5, 12]);
      expect(actual).toStrictEqual([5, 32]);
    });

    it("should move a 3d position", () => {
      const actual = move([10, 9, 20], [-5, -9, 12]);
      expect(actual).toStrictEqual([5, 0, 32]);
    });
  });

  describe("MinHeap", () => {
    let uut: MinHeap<string>;
    beforeEach(() => {
      uut = new MinHeap();
    });
    it("should extract what was inserted", () => {
      uut.insert(0, "zero");
      const actual = uut.extract();
      expect(actual).toStrictEqual("zero");
    });
    it("should extract in priority order", () => {
      uut.insert(2, "two");
      uut.insert(0, "zero");
      uut.insert(1, "one");
      const actual = [uut.extract(), uut.extract(), uut.extract()];
      expect(actual).toStrictEqual(["zero", "one", "two"]);
      expect(uut.isEmpty()).toStrictEqual(true);
    });
  });
});
