import fs from "fs";

export const readFile = (path) => fs.readFileSync(path).toString().trim();
export const sumReducer = (acc, cur) => acc + cur;
export const toCharArray = (str) => str.split("");
export const isUpperCase = (str) => str.toUpperCase() === str;