var stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 1000
});

var layer = new Konva.Layer();
const T_SIZE = 10;

const Triangle = function(x, y, color) {
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
	stroke: color,
  strokeWidth: 1
    });
}
const mTriangle = function(x, y, color) {
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
	stroke: color,
  strokeWidth: 1,
  draggable: true
    });
}
const drawGraph = function() {
  for (i = 0; i <= stage.width(); i += 2*T_SIZE) {
    var verticalLine = new Konva.Line({
      points: [i , 0, i , stage.height()],
      stroke: 'rgb(222, 222, 222)',
      strokeWidth: 1
    });
    verticalLine.move ({
      x: 20,
      y: 20
    });
    layer.add(verticalLine);
  }

  for (i = 0; i <= stage.width(); i += T_SIZE * 4) {
     for (j = 0; j <= stage.height(); j += T_SIZE * 2 ) {
         var triangle = new Triangle(i, j, 'rgb(222,222,222)');
         triangle.move ({
           x: 20,
           y: 30
         });
         layer.add(triangle);
       }
  }
  var horizontalLine = new Konva.Line({
    points: [0, 0, stage.width(), 0],
    stroke: 'rgb(222, 222, 222)',
    strokewidth: 1
  })

  horizontalLine.move({
    x: 20,
    y: 20
  });
  layer.add(horizontalLine);

}
function spawnTile() {
  tile.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
  });
  tile.on('mouseout', function() {
      document.body.style.cursor = 'default';
  });
  layer.add(tile);
}
drawGraph();
stage.add(layer);

$(document).ready(function(){
  $('#tile').click(function(){
    spawnTile();
    stage.add(layer);
  });
});
