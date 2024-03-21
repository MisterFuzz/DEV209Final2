var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
bgReady = true;
};
bgImage.src = "images/background.png";
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
heroReady = true;
};
heroImage.src = "images/hero.png";
// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
monsterReady = true;
};
monsterImage.src = "images/monster.png";

var then = Date.now();
//reset();
 // call the main game loop.
// The main game loop
var main = function () {
render();
// Request to do this again ASAP using the Canvas method,
// it’s much like the JS timer function “setInterval, it will
// call the main method over and over again so our players
// can move and be re-drawn
requestAnimationFrame(main);
};
//To continuously call the main game loop function, this tutorial used to execute
//the setInterval method. These days there's a better way, via
//the requestAnimationFrame method.
// Draw everything in the main render function
var render = function () {
if (bgReady) {

ctx.drawImage(bgImage, 0, 0);
}};

main();