'use strict';

function doGetRectangleData(smallX, smallY, bigX, bigY) {
  const rectangleData = [];
  const xEnd = bigX + 1;
  const yEnd = bigY;
  // top line
  for (let x = smallX; x < xEnd; x++) {
    rectangleData.push([x, smallY]);
  }
  // bottom line
  for (let x = smallX; x < xEnd; x++) {
    rectangleData.push([x, bigY]);
  }
  // left line
  for (let y = smallY + 1; y < yEnd; y++) {
    rectangleData.push([smallX, y]);
  }
  // right line
  for (let y = smallY + 1; y < yEnd; y++) {
    rectangleData.push([bigX, y]);
  }
  return rectangleData;
}

function getRectangleData(x1, y1, x2, y2) {
  let rectangleData;
  if (x1 < x2) {
    if (y1 < y2) {
      rectangleData = doGetRectangleData(x1, y1, x2, y2);
    } else {
      rectangleData = doGetRectangleData(x1, y2, x2, y1);
    }
  } else {
    if (y1 < y2) {
      rectangleData = doGetRectangleData(x2, y1, x1, y2);
    } else {
      rectangleData = doGetRectangleData(x2, y2, x1, y1);
    }
  }
  return rectangleData;
}

function newRectangle(data) {
  const rectangleData = getRectangleData(data.x1, data.y1, data.x2, data.y2);
  return rectangleData;
}

module.exports = newRectangle;
