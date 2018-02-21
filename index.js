'use strict';

const inquirer = require('inquirer');
const constant = require('./constant');
const validator = require('./validator');
const canvas = require('./canvas');

let canvasData;

function hasCanvasData() {
  if (canvasData) {
    return true;
  }
  console.log(constant.ERR_MSG.NO_CANVAS);
  return false;
}

function handleCommand(data) {
  if (data.command === constant.VALIDATE_RESULT.INCORRECT_COMMAND) {
    console.log(constant.VALIDATE_RESULT.INCORRECT_COMMAND + '..!!');
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.NEW_CANVAS) {
    console.log(data);
    canvasData = canvas.createCanvas(data);
    canvas.render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.NEW_LINE && hasCanvasData()) {
    console.log(data);
    canvas.newLine(data, canvasData);
    canvas.render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.NEW_RECTANGLE && hasCanvasData()) {
    console.log(data);
    canvas.newRectangle(data, canvasData);
    canvas.render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.FILL && hasCanvasData()) {
    console.log(data);
    canvas.fill(data, canvasData);
    canvas.render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.QUIT) {
    console.log(constant.VALIDATE_RESULT.QUIT + '..!!');
    process.exit();
  }
}

function ask() {
  inquirer.prompt([constant.QUESTION]).then(answers => {
    console.log('\n');
    const data = validator(answers.command);
    handleCommand(data);
    console.log('\n');
    ask();
  });
}

ask();
