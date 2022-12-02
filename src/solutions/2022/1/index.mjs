import { readFile, sumReducer } from "../../../util/index.mjs";

const input = readFile("./input.txt");

const descendingTotals = input
  .split("\n\n")
  .map((line) =>
    line
      .split("\n")
      .map((str) => Number(str))
      .reduce(sumReducer, 0)
  )
  .sort()
  .reverse();

const part1 = descendingTotals[0];
const part2 = descendingTotals.slice(0, 3).reduce(sumReducer, 0);

console.log("Part 1", part1);
console.log("Part 2", part2);
