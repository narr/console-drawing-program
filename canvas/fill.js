'use strict';

let startCoordStack;
let currentCanvasData;
let emptyDrawValue;
let drawValue;

// if a up or down row's coord is connected to its left coord,
// no need to add it to the stack because it has the same start coord.
let noNeedToAddUpRowCoord;
let noNeedToAddDownRowCoord;

function moveUp(coord) {
  const x = coord[0];
  const y = coord[1];
  return [x, y - 1];
}

function moveDown(coord) {
  const x = coord[0];
  const y = coord[1];
  return [x, y + 1];
}

function moveLeft(coord) {
  const x = coord[0];
  const y = coord[1];
  return [x - 1, y];
}

function moveRight(coord) {
  const x = coord[0];
  const y = coord[1];
  return [x + 1, y];
}

function fillColor(coord) {
  const x = coord[0];
  const y = coord[1];
  currentCanvasData[y][x].fill = drawValue;
}

function getNoNeedToAddRowCoordFlag(isUp) {
  return isUp ? noNeedToAddUpRowCoord : noNeedToAddDownRowCoord;
}

function setNoNeedToAddRowCoordFlag(isUp, flag) {
  if (isUp) {
    noNeedToAddUpRowCoord = flag;
  } else {
    noNeedToAddDownRowCoord = flag;
  }
}

function addRowCoordToStack(coord, isUp) {
  if (canFillCoord(coord)) {
    if (!getNoNeedToAddRowCoordFlag(isUp)) {
      const startCoord = getStartCoordForOneRow(coord);
      startCoordStack.push(startCoord);
      setNoNeedToAddRowCoordFlag(isUp, true);
    }
  } else {
    setNoNeedToAddRowCoordFlag(isUp, false);
  }
}

function addUpRowCoordToStack(coord) {
  const upRowCoord = moveUp(coord);
  addRowCoordToStack(upRowCoord, true);
}

function addDownRowCoordToStack(coord) {
  const downRowCoord = moveDown(coord);
  addRowCoordToStack(downRowCoord, false);
}

function proceedWithStartCoord(coord) {
  fillColor(coord);
  setNoNeedToAddRowCoordFlag(true, false);
  setNoNeedToAddRowCoordFlag(false, false);
  addUpRowCoordToStack(coord);
  addDownRowCoordToStack(coord);
}

/**
 * Find the leftest positioned one among connected coordinates from target
 * @param {array} target target coordinate
 * @returns {array} start coordinate
 */
function getStartCoordForOneRow(target) {
  let startCoord = target;
  let loop = true;
  while (loop) {
    let temp = moveLeft(startCoord);
    if (canFillCoord(temp)) {
      startCoord = temp;
    } else {
      loop = false;
    }
  }
  return startCoord;
}

function handleRightCoord(coord) {
  fillColor(coord);
  addUpRowCoordToStack(coord);
  addDownRowCoordToStack(coord);
}

function processLeftToRight(startCoord) {
  let loop = true;
  let current = startCoord;
  while (loop) {
    let next = moveRight(current);
    if (canFillCoord(next)) {
      handleRightCoord(next);
      current = next;
    } else {
      loop = false;
    }
  }
}

function doFill(coord) {
  let loop = true;
  let currentCoord = getStartCoordForOneRow(coord);
  while (loop) {
    proceedWithStartCoord(currentCoord);
    processLeftToRight(currentCoord);
    if (startCoordStack.length < 1) {
      loop = false;
    } else {
      currentCoord = startCoordStack.pop();
    }
  }
}

function canFillCoord(target) {
  const x = target[0];
  const y = target[1];
  if (currentCanvasData[y] && currentCanvasData[y][x]) {
    const coord = currentCanvasData[y][x];
    return !(coord.draw !== emptyDrawValue || coord.fill === drawValue);
  } else {
    return false;
  }
}

function fill(data, canvasData, initDrawValue) {
  startCoordStack = [];
  currentCanvasData = canvasData;
  emptyDrawValue = initDrawValue;
  drawValue = data.c;
  const coord = [data.x, data.y];
  if (canFillCoord(coord)) {
    doFill(coord);
  }
}

module.exports = fill;
