import intersection from "lodash/intersection.js";
import {
  readFile,
  sumReducer,
  toCharArray,
  isUpperCase,
} from "../../../util/index.mjs";

const input = readFile("./input.txt");
const lines = input.split("\n");

const charToPriority = (char) =>
  char.charCodeAt(0) +
  (isUpperCase(char) ? 27 - "A".charCodeAt(0) : 1 - "a".charCodeAt(0));

const halve = (str) => [
  str.substring(0, str.length / 2),
  str.slice(-str.length / 2),
];

const part1 = lines
  .map(halve)
  .map((halves) => charToPriority(intersection(...halves.map(toCharArray))[0]))
  .reduce(sumReducer, 0);

const part2 = lines
  .reduce((acc, cur, index) => {
    if (index % 3 === 0) {
      acc.push([cur]);
    } else {
      acc[acc.length - 1].push(cur);
    }
    return acc;
  }, [])
  .map((group) => charToPriority(intersection(...group.map(toCharArray))[0]))
  .reduce(sumReducer, 0);

console.log("Part 1", part1);
console.log("Part 2", part2);
