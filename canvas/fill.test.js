'use strict';

const fill = require('./fill');
const canvasApi = require('./index');
const createCanvas = canvasApi.createCanvas;
const newRectangle = canvasApi.newRectangle;
const newLine = canvasApi.newLine;

describe(
  'fill - it should have all the expected draw values for coordinates of a canvas',
  () => {
    test(
      'test1',
      () => {
        //    step1             step2             result
        //    ------            ------            ------
        //    |xxx |            |xxxA|            |xxxA|
        //    |x x |    ===>    |xox |    ===>    |xoxA|
        //    |xxx |            |xxx |            |xxxA|
        //    |    |            |    |            |AAAA|
        //    ------            ------            ------

        // @ step1
        const canvasData = createCanvas({
          w: 4,
          h: 4,
        });
        newRectangle({
          x1: 1,
          y1: 1,
          x2: 3,
          y2: 3,
        }, canvasData);
        // @ step1

        // @ step2
        const initDrawValue = ' ';
        fill({
          c: 'o',
          x: 2,
          y: 2,
        }, canvasData, initDrawValue);
        fill({
          c: 'A',
          x: 4,
          y: 1,
        }, canvasData, initDrawValue);
        // step2 @

        const resultStr =
          `[
             [
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"},
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"}
             ],

             [
               {"draw": "|"}, {"draw": "x"}, {"draw": "x"},
               {"draw": "x"}, {"draw": " ", "fill": "A"}, {"draw": "|"}
             ],

             [
               {"draw": "|"}, {"draw": "x"}, {"draw": " ", "fill": "o"},
               {"draw": "x"}, {"draw": " ", "fill": "A"}, {"draw": "|"}
             ],

             [
               {"draw": "|"}, {"draw": "x"}, {"draw": "x"},
               {"draw": "x"}, {"draw": " ", "fill": "A"}, {"draw": "|"}
             ],

             [
               {"draw": "|"}, {"draw": " ", "fill": "A"}, {"draw": " ", "fill": "A"},
               {"draw": " ", "fill": "A"}, {"draw": " ", "fill": "A"}, {"draw": "|"}
             ],

             [
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"},
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"}
             ]
           ]`;
        const resultData = JSON.parse(resultStr);

        expect(canvasData).toEqual(resultData);
      });

    test(
      'test2',
      () => {
        //   step1              step2              result
        //   -------            -------            -------
        //   |  x  |            |  xk |            |ooxkk|
        //   |  xxx|    ===>    |  xxx|    ===>    |ooxxx|
        //   |x x  |            |xox  |            |xox  |
        //   |x xxx|            |x xxx|            |xoxxx|
        //   |  x  |            |  x  |            |oox  |
        //   -------            -------            -------

        // @ step 1
        const canvasData = createCanvas({
          w: 5,
          h: 5,
        });
        newRectangle({
          x1: 3,
          y1: 2,
          x2: 5,
          y2: 4,
        }, canvasData);
        newLine({
          x1: 3,
          y1: 1,
          x2: 3,
          y2: 1,
        }, canvasData);
        newLine({
          x1: 1,
          y1: 3,
          x2: 1,
          y2: 4,
        }, canvasData);
        newLine({
          x1: 3,
          y1: 5,
          x2: 3,
          y2: 5,
        }, canvasData);
        // step 1 @

        // @ step 2
        const initDrawValue = ' ';
        fill({
          c: 'k',
          x: 4,
          y: 1,
        }, canvasData, initDrawValue);
        fill({
          c: 'o',
          x: 2,
          y: 3,
        }, canvasData, initDrawValue);
        // step 2 @

        const resultStr =
          `[
             [
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"}, {"draw": "-"},
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"}
             ],

             [
               {"draw": "|"}, {"draw": " ", "fill": "o"}, {"draw": " ", "fill": "o"}, {"draw": "x"},
               {"draw": " ", "fill": "k"}, {"draw": " ", "fill": "k"}, {"draw": "|"}
             ],

             [
               {"draw": "|"}, {"draw": " ", "fill": "o"}, {"draw": " ", "fill": "o"}, {"draw": "x"},
               {"draw": "x"}, {"draw": "x"}, {"draw": "|"}
             ],

             [
               {"draw": "|"}, {"draw": "x"}, {"draw": " ", "fill": "o"}, {"draw": "x"},
               {"draw": " "}, {"draw": "x"}, {"draw": "|"}
             ],

             [
               {"draw": "|"}, {"draw": "x"}, {"draw": " ", "fill": "o"}, {"draw": "x"},
               {"draw": "x"}, {"draw": "x"}, {"draw": "|"}
             ],

             [
              {"draw": "|"}, {"draw": " ", "fill": "o"}, {"draw": " ", "fill": "o"}, {"draw": "x"},
              {"draw": " "}, {"draw": " "}, {"draw": "|"}
             ],

             [
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"}, {"draw": "-"},
               {"draw": "-"}, {"draw": "-"}, {"draw": "-"}
             ]
           ]`;
        const resultData = JSON.parse(resultStr);

        expect(canvasData).toEqual(resultData);
      });
  });
