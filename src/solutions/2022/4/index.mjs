import intersection from "lodash/intersection.js";
import { readFile } from "../../../util/index.mjs";

const parsePair = (str) => {
  const [_, low, high] = str.match(/^(\d+)-(\d+)$/);
  return [low, high].map(Number);
};

const createRange = ([low, high]) =>
  [...Array(high - low + 1).keys()].map((el) => el + low);

const input = readFile("./input.txt");
const lines = input.split("\n");
const rangePairs = lines.map((line) =>
  line.split(",").map(parsePair).map(createRange)
);

const hasRedundantRange = (rangePair) =>
  rangePair.map((r) => r.length).includes(intersection(...rangePair).length);
const hasOverlappingRange = (rangePair) =>
  intersection(...rangePair).length > 0;

const part1 = rangePairs.filter(hasRedundantRange).length;
const part2 = rangePairs.filter(hasOverlappingRange).length;

console.log("Part 1", part1);
console.log("Part 2", part2);
