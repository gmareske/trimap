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
  draggable: true,
  dragBoundFunc: function(pos) {
      var newX = Math.floor(pos.x / 20);
      if (newX % 2 === 0){
        var newY = Math.floor(pos.y / 20) + 0.5;
      } else {
        var newY = Math.floor(pos.y / 20);
      }
      return {
        x: newX * 20,
        y: newY * 20
      };
    }
    });
}
const someTriangles = function(x, y, color, width, length) {
    return new Konva.Shape({
	sceneFunc: function(context) {
	    context.beginPath();
	    context.moveTo(x, y);
	    for (i = 0; i <= width; i++) {
		    let xs = T_SIZE*2 + T_SIZE*i*2;
		    let ys = T_SIZE + T_SIZE*i;
		    context.lineTo(x + xs, y + ys);
		    context.lineTo(x + xs * 2, y);
		    context.lineTo(x + xs, y - ys);
		    context.lineTo(x, y);
		    context.closePath();
		    context.fillStrokeShape(this);
	    }
	    
		 
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
  tile = new mTriangle (500, 500, 'black');
  tile.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
  });
  tile.on('mouseout', function() {
      document.body.style.cursor = 'default';
  });
  layer.add(tile);
}
function spawnSomeTiles() {
    let width = Math.floor(parseInt($('#width').val()));
    let height = Math.floor(parseInt($('#height').val()));
    var tile = new someTriangles(stage.width() - 50, stage.height() - 50, 'black', width, height);
    console.log(tile);
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
  $('#TileGrid').click(function(){
    spawnSomeTiles();
    stage.add(layer);
  });
});
