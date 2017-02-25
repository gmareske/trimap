const canvas = document.getElementById("theCanvas");
var   ctx    = canvas.getContext("2d");

const C_HEIGHT = canvas.height;
const C_WIDTH  = canvas.width;
const N_LINES  = 10;

ctx.save();

var drawLine  = function(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
const drawGraph = function() {
    let mult = C_HEIGHT / N_LINES;
    ctx.strokeStyle = "rgb(222, 222, 222)";
    for (i = 0; i <= N_LINES; i++) {
	drawLine(mult * i, 0, mult * i, C_HEIGHT);
	drawLine(0, mult * i, mult * i, 0);
	drawLine(mult * i, C_HEIGHT, C_HEIGHT, mult * i);
	drawLine(C_HEIGHT - (mult * i), 0, C_HEIGHT, mult * i);
	drawLine(0, C_HEIGHT - (mult * i), mult * i, C_HEIGHT);
    }
}

drawGraph();
