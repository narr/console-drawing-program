'use strict';

const canvas = require('./index');

describe('Create canvas', () => {
  test('Canvas should be not created if width or height is 0', () => {
    const canvasData = canvas.createCanvas({
      w: 0,
      h: 5,
    });
    expect(canvasData).toBeUndefined();

    const canvasData2 = canvas.createCanvas({
      w: 5,
      h: 0,
    });
    expect(canvasData2).toBeUndefined();
  });

  test('Canvas size should be equal to (Width + 2) * (Height + 2)', () => {
    const canvasData = canvas.createCanvas({
      w: 5,
      h: 5,
    });
    const y = canvasData[0];
    const x = canvasData[1];
    expect(y.length * x.length).toBe(49);
  });
});
