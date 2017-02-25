const canvas = document.getElementById("theCanvas");
var   ctx    = canvas.getContext("2d");

const C_HEIGHT = canvas.height;
const C_WIDTH  = canvas.width;
const N_LINES  = 25;

ctx.save();

var drawLine  = function(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
const drawGraph = function() {
    let mult = C_HEIGHT / N_LINES ;
    ctx.strokeStyle = "rgb(222, 222, 222)";
    drawLine(0,0, C_HEIGHT, 0);
    drawLine(0,C_HEIGHT,C_HEIGHT,C_HEIGHT);
    for (i = 0; i <= N_LINES * 2; i++) {
	drawLine(0.5 * mult * i, 0, 0.5 * mult * i, C_HEIGHT);
    }
    
    for (i = 0; i <= N_LINES ; i++) {
	drawLine(mult*i,0, 0, mult*0.5*i);
	drawLine(C_HEIGHT- mult* i,0,C_HEIGHT, mult*0.5*i);
	drawLine(mult*i, C_HEIGHT, 0, C_HEIGHT-mult*0.5*i);
	drawLine(C_HEIGHT - mult *i, C_HEIGHT, C_HEIGHT, C_HEIGHT - mult*0.5*i);

    }

    for (i = 1; i < N_LINES; i++){
	drawLine(0, C_HEIGHT*0.5+ mult*0.5*i, C_HEIGHT, mult*0.5*i);
	drawLine(0, mult*0.5*i, C_HEIGHT, C_HEIGHT*0.5 + mult*0.5*i);	
    }
    
  /*  mult = mult / 2;
    for (i = 0; i <= N_LINES * 4; i++) {
	
	drawLine(mult * i, 0, mult * i, C_HEIGHT);
	drawLine(0, mult * i, mult * i, 0);
	drawLine(mult * i, C_HEIGHT, C_HEIGHT, mult * i);
	drawLine(C_HEIGHT - (mult * i), 0, C_HEIGHT, mult * i);
	drawLine(0, C_HEIGHT - (mult * i), mult * i, C_HEIGHT);
    }*/
}

drawGraph();
