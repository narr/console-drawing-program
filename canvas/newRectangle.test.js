'use strict';

const newRectangle = require('./newRectangle');

describe('newRectangle', () => {
  test(
    'it should have all the same coordinates if two coordinates are equal',
    () => {
      const newRectangleData = newRectangle({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      });
      expect(newRectangleData).toContainEqual([0, 0]);

      const newRectangleData2 = newRectangle({
        x1: 2,
        y1: 2,
        x2: 2,
        y2: 2,
      });
      expect(newRectangleData2).toContainEqual([2, 2]);
    });

  test('it should have expected coordinates', () => {
    const newRectangleData = newRectangle({
      x1: 1,
      y1: 1,
      x2: 4,
      y2: 4,
    });
    const resultData = [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4],
      [1, 2],
      [1, 3],
      [4, 2],
      [4, 3],
    ];
    expect(newRectangleData).toEqual(resultData);
  });
});
