'use strict';

const constant = require('./constant');

function isQuit(str, data) {
  const match = str.match(/^Q$/);
  if (match) {
    data.command = constant.VALIDATE_RESULT.QUIT;
  }
  return match;
}

function isNewCanvas(str, data) {
  const match = str.match(/^C (\d+?) (\d+?)$/);
  const isMatched = match && match.length === 3;
  if (isMatched) {
    data.command = constant.VALIDATE_RESULT.NEW_CANVAS;
    data.w = Number(match[1]);
    data.h = Number(match[2]);
  }
  return isMatched;
}

function isNewLine(str, data) {
  const match = str.match(/^L (\d+?) (\d+?) (\d+?) (\d+?)$/);
  const isMatched = match && match.length === 5;
  if (isMatched) {
    data.command = constant.VALIDATE_RESULT.NEW_LINE;
    data.x1 = Number(match[1]);
    data.y1 = Number(match[2]);
    data.x2 = Number(match[3]);
    data.y2 = Number(match[4]);
  }
  return isMatched;
}

function isNewRectangle(str, data) {
  const match = str.match(/^R (\d+?) (\d+?) (\d+?) (\d+?)$/);
  const isMatched = match && match.length === 5;
  if (isMatched) {
    data.command = constant.VALIDATE_RESULT.NEW_RECTANGLE;
    data.x1 = Number(match[1]);
    data.y1 = Number(match[2]);
    data.x2 = Number(match[3]);
    data.y2 = Number(match[4]);
  }
  return isMatched;
}

function isFill(str, data) {
  const match = str.match(/^B (\d+?) (\d+?) ([a-zA-z])$/);
  const isMatched = match && match.length === 4;
  if (isMatched) {
    data.command = constant.VALIDATE_RESULT.FILL;
    data.x = Number(match[1]);
    data.y = Number(match[2]);
    data.c = match[3];
  }
  return isMatched;
}

module.exports = (command) => {
  const data = {};
  if (isQuit(command, data)) {
    return data;
  }

  if (isNewCanvas(command, data)) {
    return data;
  }

  if (isNewLine(command, data)) {
    return data;
  }

  if (isNewRectangle(command, data)) {
    return data;
  }

  if (isFill(command, data)) {
    return data;
  }
  data.command = constant.VALIDATE_RESULT.INCORRECT_COMMAND;
  return data;
};
