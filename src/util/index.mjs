import fs from "fs";

export const readFile = (path, trimStart = true, trimEnd = true) => {
  let str = fs.readFileSync(path).toString();
  if (trimStart) {
    str = str.trimStart();
  }
  if (trimEnd) {
    str = str.trimEnd();
  }
  return str;
};
export const sumReducer = (acc, cur) => acc + cur;
export const toCharArray = (str) => str.split("");
export const isUpperCase = (str) => str.toUpperCase() === str;
export const createRange = ([low, high]) =>
  [...Array(high - low + 1).keys()].map((el) => el + low);