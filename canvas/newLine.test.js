'use strict';

const newLine = require('./newLine');

describe('newLine', () => {
  test('it should have a length, 1 if two coordinates are equal', () => {
    const newLineData = newLine({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    });
    expect(newLineData).toHaveLength(1);

    const newLineData2 = newLine({
      x1: 2,
      y1: 2,
      x2: 2,
      y2: 2,
    });
    expect(newLineData2).toHaveLength(1);
  });

  test('it should have the same y coordinate', () => {
    const newLineData = newLine({
      x1: 1,
      y1: 1,
      x2: 4,
      y2: 1,
    });
    const y = 1;
    const result = y === newLineData[0][1] &&
      y === newLineData[1][1] &&
      y === newLineData[2][1] &&
      y === newLineData[3][1];

    expect(result).toBe(true);
  });

  test('it should have the same x coordinate', () => {
    const newLineData = newLine({
      x1: 1,
      y1: 1,
      x2: 1,
      y2: 4,
    });
    const x = 1;
    const result = x === newLineData[0][0] &&
      x === newLineData[1][0] &&
      x === newLineData[2][0] &&
      x === newLineData[3][0];

    expect(result).toBe(true);
  });

  test('it should have expected coordinates', () => {
    const newLineData = newLine({
      x1: 1,
      y1: 1,
      x2: 4,
      y2: 4,
    });
    const resultData = [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ];
    expect(newLineData).toEqual(resultData);
  });
});
