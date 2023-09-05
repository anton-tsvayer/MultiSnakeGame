var trackPad = document.getElementById('track-pad');
var joystick = document.getElementById('joystick');
var controller = document.getElementById('controller');
const mousePosText = document.getElementById('mouse-pos');

// let localMousePos = { x: undefined, y: undefined };
let globalMousePos = { x: undefined, y: undefined };

trackPad.addEventListener('mousedown', joysDown);
trackPad.addEventListener('touchstart', joysDown);
trackPad.addEventListener('mouseup', joysUp);
trackPad.addEventListener('touchend', joysUp);
window.addEventListener('mouseup', joysUp);
window.addEventListener('touchend', joysUp);


function joysTracker(event) {
    globalMousePos = { x: event.clientX, y: event.clientY };
    mousePosText.textContent = `(${globalMousePos.x}, ${globalMousePos.y})`;
    joysAnim(event);
}

function joysTrackerPhone(event) {
    var touch = event.touches[0];
    globalMousePos = { x: touch.clientX, y: touch.clientY };
    mousePosText.textContent = `(${globalMousePos.x}, ${globalMousePos.y})`;
    joysAnim(event);
}

let radiusCont = parseInt(getComputedStyle(controller).width)/2;
let radiusJoys = getComputedStyle(joystick).width;
radiusJoys = parseInt(radiusJoys) / 2;

let joysX = window.innerWidth - radiusJoys - parseInt(getComputedStyle(joystick).margin);
let joysY = window.innerHeight - radiusJoys - parseInt(getComputedStyle(joystick).margin);

controller.style.left = joysX - radiusCont + 'px';
controller.style.top = joysY - radiusCont + 'px';

var deltaX = undefined;
var deltaY = undefined;

function joysAnim() {
    deltaX = globalMousePos.x - joysX;
    deltaY = globalMousePos.y - joysY;

    if ((deltaX <= radiusJoys && deltaX >= -radiusJoys) &&
        (deltaY <= radiusJoys && deltaY >= -radiusJoys)) {
        controller.style.top = globalMousePos.y - radiusCont + 'px';
        controller.style.left = globalMousePos.x - radiusCont + 'px';
    }
    else {
        // controller.style.left = joysX - 25 + 'px';
        // controller.style.top = joysY - 25 + 'px';
        let k = deltaX / deltaY;

        // Math.pow(radius, 2) - Math.pow(k, 2)
        let y = Math.pow(radiusJoys, 2) / (Math.pow(k, 2) + 1);

        // y^2 = r^2 * k^2 / k^2+1
        let x = Math.pow(radiusJoys, 2) * Math.pow(k, 2) / (Math.pow(k, 2) + 1);

        // console.log(deltaX);
        // console.log(deltaY);
        // console.log('––––––––––––––––––––');

        deltaX < 0
            ? x = -(Math.sqrt(x))
            : x = Math.sqrt(x);

        deltaY < 0
            ? y = -(Math.sqrt(y))
            : y = Math.sqrt(y);

        x = Math.floor(x);
        y = Math.floor(y);

        // console.log(x);
        // console.log(y);
        // console.log('––––––––––––––––––––');

        controller.style.left = joysX + x - radiusCont + 'px';
        controller.style.top = joysY + y - radiusCont + 'px';

    }
}

function joysDown() {
    console.log('down');
    window.addEventListener('mousemove', joysTracker);
    window.addEventListener('touchmove', joysTrackerPhone);
}

function joysUp() {
    console.log('up');
    window.removeEventListener('mousemove', joysTracker);
    window.removeEventListener('touchmove', joysTracker);
    // localMousePos = { x: undefined, y: undefined };
    controller.style.left = joysX - radiusCont + 'px';
    controller.style.top = joysY - radiusCont + 'px';
}









var snake = document.getElementById('snake');

function moveSnake() {
    let k = deltaX / deltaY;

    let vectorXY = 5;

    let vectorY = Math.abs(Math.floor(Math.sin(Math.atan(k))*vectorXY));
    let vectorX = Math.abs(Math.floor(Math.cos(Math.atan(k))*vectorXY));

    console.log(vectorX);
    console.log(vectorY);

    if (deltaY < 0 && deltaX < 0) {
        vectorX *= -1;
        vectorY *= -1;
    }
    else if (deltaY < 0 && deltaX > 0) {
        vectorX *= -1;
        vectorY *= 1;
    }
    else if (deltaY > 0 && deltaX > 0) {
        vectorX *= 1;
        vectorY *= 1;
    }
    else if(deltaY > 0 && deltaX < 0) {
        vectorX *= 1;
        vectorY *= -1;
    }
    // if (deltaY < 0) vectorX *= -1;
    // if (deltaX < 0) vectorY *= -1;


    

    snake.style.left = vectorY + parseInt(getComputedStyle(snake).left) + 'px';
    snake.style.top = vectorX + parseInt(getComputedStyle(snake).top) + 'px';
}

function oscilator() {
    setInterval(moveSnake, 20);
}

oscilator();