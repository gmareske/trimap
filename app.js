const canvas = document.getElementById("theCanvas");
var   ctx    = canvas.getContext("2d");

const C_HEIGHT = canvas.height;
const C_WIDTH  = canvas.width;
const N_LINES  = 25;

ctx.save();

// draws a line from point x1, y1 to x2, y2
var drawLine  = function(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

// draws the lines that make up our isometric graph
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

    for (i = 1; i < N_LINES; i++) {
	drawLine(0, C_HEIGHT*0.5+ mult*0.5*i, C_HEIGHT, mult*0.5*i);
	drawLine(0, mult*0.5*i, C_HEIGHT, C_HEIGHT*0.5 + mult*0.5*i);	
    }

}
// struct for a point
function Point(x,y) {
    this.x = x;
    this.y = y;
}

// do not use
const calcPoint = function(x,y) {
    let mult = C_HEIGHT / N_LINES;
    if (x % 2 == 0) {
	return new Point(x * 20, y*mult*0.5 + mult*0.25);
    } else {
	return new Point(x * 20, y * mult * 0.5);
    }
}

// global points array
var G_POINTS = [];
// generate all the intersections on the graph
const genPoints = function() {
    let mult = (C_HEIGHT / N_LINES) / 2;
    for (i=0; i < N_LINES * 2; i++) {
	if (i % 2 == 0) {
	    for (j = 0; j < N_LINES * 2; j++ ) {
		G_POINTS.push(new Point(i*mult, j*mult));
	    }
	} else {
	    for (j = 0; j < N_LINES * 2; j++ ) {
		G_POINTS.push(new Point(i*mult, j*mult + mult/2));
	    }
	}
    }
}
genPoints();
drawGraph();
