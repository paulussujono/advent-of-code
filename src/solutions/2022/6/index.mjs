import { readFile, createRange } from "../../../util/index.mjs";

const line = readFile("./input.txt", false);

const createUniqueCharsRegex = (uniqLen) => {
  const range = createRange([1, uniqLen - 1]);
  const regexString = range.reduce(
    (acc, cur) =>
      acc +
      range
        .slice(0, cur)
        .map((n) => `(?!\\${n})`)
        .join("") +
      "(.)",
    "(.)"
  );
  return new RegExp(regexString);
};

const part1 = line.search(createUniqueCharsRegex(4)) + 4;
const part2 = line.search(createUniqueCharsRegex(14)) + 14;

console.log("Part 1", part1);
console.log("Part 2", part2);
