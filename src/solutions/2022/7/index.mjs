import { readFile, sumReducer } from "../../../util/index.mjs";

const input = readFile("./input.txt", false);
const lines = input.split("\n");

class Node {
  constructor({ name, parent, isDir = false, size = undefined }) {
    this.name = name;
    this.parent = parent;
    this.isDir = isDir;
    this.size = size;
    this.children = [];
  }

  addChild({ name, isDir = false, size = undefined }) {
    this.children.push(new Node({ name, parent: this, isDir, size }));
    return this;
  }
}

const tree = new Node({ name: "/", parent: null, isDir: true });
let currentDirNode = tree;

lines.forEach((line) => {
  const lsMatch = line.match(/^\$ ls$/);
  const cdRootMatch = line.match(/^\$ cd \/$/);
  const cdParentMatch = line.match(/^\$ cd \.\.$/);
  const cdMatch = line.match(/^\$ cd (.*)$/);
  const dirMatch = line.match(/^dir (.*)$/);
  const fileMatch = line.match(/^(\d+) (.*)$/);
  if (lsMatch || cdRootMatch) {
    return;
  } else if (cdParentMatch) {
    currentDirNode = currentDirNode.parent;
  } else if (cdMatch) {
    currentDirNode = currentDirNode.children.find(
      ({ name }) => name === cdMatch[1]
    );
  } else if (dirMatch) {
    currentDirNode.addChild({ name: dirMatch[1], isDir: true });
  } else if (fileMatch) {
    currentDirNode.addChild({
      name: fileMatch[2],
      size: Number(fileMatch[1]),
    });
  }
});

const calculateDirSizes = (node) => {
  if (!node.size) {
    node.size = node.children.map(calculateDirSizes).reduce(sumReducer, 0);
  }
  return node.size;
};

const sumSmallDirs = (threshold) => (node) => {
  const thisResult = node.isDir && node.size <= threshold ? node.size : 0;
  const childrenResult = node.children
    .map(sumSmallDirs(threshold))
    .reduce(sumReducer, 0);
  return thisResult + childrenResult;
};

calculateDirSizes(tree);
const part1 = sumSmallDirs(100000)(tree);

const totalSize = 70000000;
const targetFree = 30000000;
const usedSize = tree.size;
const currentFree = totalSize - usedSize;
const needToDelete = targetFree - currentFree;

const findBestToDelete = (minimum) => (node) => {
  const thisResult = node.isDir && node.size >= minimum ? node.size : undefined;
  const childResults = node.children.map(findBestToDelete(minimum));
  const smallest = [thisResult, ...childResults]
    .filter((size) => size !== undefined)
    .sort((a, b) => a - b)[0];
  return smallest;
};
const part2 = findBestToDelete(needToDelete)(tree);

console.log("Part 1", part1);
console.log("Part 2", part2);
