// const { deltaX, deltaY } = require("./joystick");

// alert(deltaX.back);
// alert(deltaY.back);

var snake = document.getElementById('snake');

function moveSnake() {
    console.log("Signal");
    let k = deltaX / deltaY;

    let vectorX = 5;

    deltaX > 0
    ? vectorX *= -1
    : vectorX *= 1;

    let vectorY = k*vectorX;

    snake.style.left = vectorX + parseInt(getComputedStyle(snake).left) + 'px';
    snake.style.top += vectorY + parseInt(getComputedStyle(snake).top) + 'px';
}

function oscilator() {
    setInterval(moveSnake, 300);
}

// oscilator();