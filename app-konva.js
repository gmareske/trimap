var stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 1000
});

var layer = new Konva.Layer();
const T_SIZE = 20;

const Triangle = function(x, y) {
    return new Konva.Shape({
	sceneFunc: function(context) {
	    context.beginPath();
	    context.moveTo(x, y);
	    context.lineTo(x + T_SIZE*2, y + T_SIZE);
	    context.lineTo(x + T_SIZE*4, y);
	    context.lineTo(x + T_SIZE*2, y - T_SIZE);
	    context.lineTo(x, y);
	    context.closePath();
	    context.fillStrokeShape(this);
	},
	stroke: 'rgb(222,222,222)'
    });
}

const drawGraph = function() {
    // adds a bunch of triangles to make our graph
    for (i = 0; i <= stage.width(); i += T_SIZE * 4) {
	for (j = 0; j <= stage.height(); j += T_SIZE * 2 ) {
	    layer.add(new Triangle(i, j));
	}
    }
    // should add the vertical lines but it doesn't
    for (i = 0; i <= stage.width(); i += T_SIZE) {
	layer.add(new Konva.Line({
	    points: [i, stage.height()],
	    stroke: 'rgb(222, 222, 222)',
	    strokeWidth: 2
	}));
    }
}

drawGraph();
stage.add(layer);
