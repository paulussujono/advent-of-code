import { readFile, sumReducer } from "../../../util/index.mjs";

const input = readFile("./input.txt");
const lines = input.split("\n").map((line) => line.split(" "));

const values = { X: 1, Y: 2, Z: 3 };
const outcomeMap = {
  // rock
  X: { A: 3, B: 0, C: 6 },
  // paper
  Y: { A: 6, B: 3, C: 0 },
  // scissors
  Z: { A: 0, B: 6, C: 3 },
};

const part1 = lines
  .map(([opp, you]) => {
    return values[you] + outcomeMap[you][opp];
  })
  .reduce(sumReducer, 0);

const outcomeValue = { X: 0, Y: 3, Z: 6 };
const whatToPlayMap = {
  // lose
  X: { A: "Z", B: "X", C: "Y" },
  // draw
  Y: { A: "X", B: "Y", C: "Z" },
  // win
  Z: { A: "Y", B: "Z", C: "X" },
};

const part2 = input
  .split("\n")
  .map((line) => line.split(" "))
  .map(([opp, outcome]) => {
    const youPlay = whatToPlayMap[outcome][opp];
    return values[youPlay] + outcomeValue[outcome];
  })
  .reduce(sumReducer, 0);

console.log("Part 1", part1);
console.log("Part 2", part2);
