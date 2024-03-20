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

