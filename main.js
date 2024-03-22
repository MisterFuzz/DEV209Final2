var canvas = document.createElement("canvas");
canvas.id = "Game";
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 659;
var countDown = 5;
var score = 0;
var continueGame = true;
document.body.appendChild(canvas);

var audio = new Audio('sounds/splash.ogg');
var audio2 = new Audio('sounds/explode1.ogg');
var audio3 = new Audio('sounds/lavapop.ogg');

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/ice.jpg";
// car image
var carReady = 0;
var carImageUp = new Image();
carImageUp.onload = function () {
    carReady += 1;
};
var carImageDown = new Image();
carImageDown.onload = function () {
    carReady += 1;
};
var carImageLeft = new Image();
carImageLeft.onload = function () {
    carReady += 1;
};
var carImageRight = new Image();
carImageRight.onload = function () {
    carReady += 1;
};
carImageUp.src = "images/car1_6.png";
carImageDown.src = "images/car1_8.png";
carImageLeft.src = "images/car1_7.png";
carImageRight.src = "images/car1_5.png";
// gas image
var gasReady = false;
var gasImage = new Image();
gasImage.onload = function () {
    gasReady = true;
};
gasImage.src = "images/gas2.png";

var orbReady = false;
var orbImage = new Image();
orbImage.onload = function () {
    orbReady = true;
};
orbImage.src = "images/orb.png";

holeReady = false;
var holeImage = new Image();
holeImage.onload = function () {
    holeReady = true;
};
holeImage.src = "images/hole.png";

var car = {
    xSpeed: 10, // movement in pixels per second
    ySpeed: 10,
    x: canvas.width / 2, // where on the canvas are they?
    y: canvas.height / 2 // where on the canvas are they?
};
var gas = {
    // for this version, the gas does not move, so just and x and y
    x: 0,
    y: 0
};
var orb = {
    // for this version, the gas does not move, so just and x and y
    x: 0,
    y: 0
};
var hole = {
    x: 0,
    y: 0
};

var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the car image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

var carDirection = carImageUp;

var rotateDraw = function () {
    if (38 in keysDown) { //  holding up key
        ctx.drawImage(carImageUp, car.x, car.y);
        carDirection = carImageUp;
    }
    else if (40 in keysDown) { //  holding down key
        ctx.drawImage(carImageDown, car.x, car.y);
        carDirection = carImageDown;
    }
    else if (37 in keysDown) { // holding right key
        ctx.drawImage(carImageRight, car.x, car.y);
        carDirection = carImageRight;
    }
    else if (39 in keysDown) { // holding Left key
        ctx.drawImage(carImageLeft, car.x, car.y);
        carDirection = carImageLeft;
    }
    else {
        ctx.drawImage(carDirection, car.x, car.y);
    }
}

var gameOver = function () {
    document.getElementById("Game").remove();
    var endMessage = document.createElement("h1");
    endMessage.innerText = "YOU DIED";
    document.body.appendChild(endMessage);
};

var update = function (modifier) {
    if (
        car.x <= (gas.x + 64)
        && gas.x <= (car.x + 64)
        && car.y <= (gas.y + 32)
        && gas.y <= (car.y + 32)
    ) {
        countDown = 5;
        audio3.play();
        reset();       // start a new cycle
    }
    if (
        car.x <= (orb.x + 64)
        && orb.x <= (car.x + 64)
        && car.y <= (orb.y + 32)
        && orb.y <= (car.y + 32)
    ) {
        var audio = new Audio('sounds/successful_hit.ogg');
        audio.play();
        score += 1;
        reset();      // start a new cycle
    }

    if (
        car.x <= (orb.x + 64)
        && hole.x <= (car.x + 64)
        && car.y <= (hole.y + 32)
        && hole.y <= (car.y + 32)
    ) {
        var audio = new Audio('sounds/splash.ogg');
        audio.play();
        gameOver();       // start a new cycle
    }

    if (38 in keysDown) { //  holding up key
        car.ySpeed -= 20;
    }
    if (40 in keysDown) { //  holding down key
        car.ySpeed += 20;
    }
    if (37 in keysDown) { // holding left key
        car.xSpeed -= 20;
    }
    if (39 in keysDown) { // holding right key
        car.xSpeed += 20;
    }

    car.y += car.ySpeed * modifier;
    car.x += car.xSpeed * modifier;
    
    if (car.xSpeed > 0) {
        car.xSpeed -= 5;
    }
    if (car.xSpeed < 0) {
        car.xSpeed += 5;
    }
    if (car.ySpeed > 0) {
        car.ySpeed -= 5;
    }
    if (car.ySpeed < 0) {
        car.ySpeed += 5;
    }

    if (car.x < 0)
    {
        car.x = canvas.width;
    }
    if (car.x > canvas.width)
    {
        car.x = 0;
    }
    if (car.y < 0)
    {
        car.y = canvas.height;
    }
    if (car.y > canvas.height)
    {
        car.y = 0;
    }
};


var reset = function (player = false) {
//Place the gas somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 96
    gas.x = 32 + (Math.random() * (canvas.width - 96));
    gas.y = 32 + (Math.random() * (canvas.height - 96));
    hole.x = 32 + (Math.random() * (canvas.width - 96));
    hole.y = 32 + (Math.random() * (canvas.height - 96));
    orb.x = 32 + (Math.random() * (canvas.width - 96));
    orb.y = 32 + (Math.random() * (canvas.height - 96));

};

var then = Date.now();
reset();
 // call the main game loop.
// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    if (!continueGame) {
        gameOver();
    }
    else {
        requestAnimationFrame(main);
    }
};
//To continuously call the main game loop function, this tutorial used to execute
//the setInterval method. These days there's a better way, via
//the requestAnimationFrame method.
// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (carReady == 4) {
        rotateDraw();
    }
    if (gasReady) {
        ctx.drawImage(gasImage, gas.x, gas.y);
    }
    if (holeReady) {
        ctx.drawImage(holeImage, hole.x, hole.y);
    }
    if (orbReady) {
        ctx.drawImage(orbImage, orb.x, orb.y);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Fuel up or explode: " + countDown, 32, 32);
    ctx.fillText("Points: " + score, 32, 96);
};


main();
window.setInterval(function() {
    countDown -= 1;
    if (countDown == 0) {
        continueGame = false;
        audio2.play();
    }
}, 1000)
