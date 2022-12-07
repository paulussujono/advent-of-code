import cloneDeep from "lodash/cloneDeep.js";
import { readFile, createRange } from "../../../util/index.mjs";

const input = readFile("./input.txt", false);
const lines = input.split("\n");

const parseCrates = (crateLines) => {
  const [numberLine, ...crateMarkers] = [...crateLines].reverse();
  const colRange = createRange([1, numberLine.trim().split(/\s+/).length]);
  const crates = {};
  colRange.forEach((num) => {
    crates[num] = [];
  });
  crateMarkers.forEach((crateLine) => {
    colRange.forEach((num) => {
      const crate = crateLine
        .substring(4 * (num - 1), 4 * num)
        .replaceAll(/[^A-Z]/g, "");
      crate && crates[num].push(crate);
    });
  });

  return { crates, range: colRange };
};

const parseMoveLines = (moveLines) => {
  const parseMoveLine = (moveLine) => {
    const [_, amount, from, to] = moveLine.match(
      /^move (\d+) from (\d+) to (\d+)$/
    );
    return {
      amount: Number(amount),
      from: Number(from),
      to: Number(to),
    };
  };

  return moveLines.map(parseMoveLine);
};

const parseLines = (lines) => {
  const separatorIndex = lines.findIndex((line) => line.trim() === "");
  const crateLines = lines.slice(0, separatorIndex);
  const moveLines = lines.slice(separatorIndex + 1, lines.length);

  const { crates, range } = parseCrates(crateLines);
  const moves = parseMoveLines(moveLines);

  return { crates, range, moves };
};

const moveReducer9000 = (crates, { amount, from, to }) => {
  for (let i = 0; i < amount; i++) {
    crates[to].push(crates[from].pop());
  }
  return crates;
};

const moveReducer9001 = (crates, { amount, from, to }) => {
  crates[to].push(...crates[from].splice(-amount, amount));
  return crates;
};

const finalAnswerReducer = (crates) => (acc, cur) =>
  acc + crates[cur].slice(-1)[0];

const { crates, range, moves } = parseLines(lines);

const cratesPart1 = moves.reduce(moveReducer9000, cloneDeep(crates));
const part1 = range.reduce(finalAnswerReducer(cratesPart1), "");

const cratesPart2 = moves.reduce(moveReducer9001, cloneDeep(crates));
const part2 = range.reduce(finalAnswerReducer(cratesPart2), "");

console.log("Part 1", part1);
console.log("Part 2", part2);
