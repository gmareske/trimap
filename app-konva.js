var stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 1000
});
const DIRECTION = {
    RIGHT: -1,
    LEFT: 1,
    UP: 1,
    DOWN: -1,
  };
// set up layer
var layer = new Konva.Layer();
// size of triangles
const T_SIZE = 10;
const PLAYER_LIMIT = 10;
var playerCount = 0;

// Door Array... these things should always be on top!
var D_ARRAY = []
const doorsOnTop = function() {
    D_ARRAY.map(function(d) {
	d.moveToTop();
    });
}
// custom shape for triangles on the graph, these dont move
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
// custom shape that can be dragged on the grid
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
	shadowColor: 'black',
	shadowBlur: 3,
	//  shadowOffset: {x : 3, y : 3},
	//  shadowOpacity: 0.7,
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
// draws some triangles
const someTriangles = function(x, y, width, height) {
    return new Konva.Shape({
  	sceneFunc: function(context) {
	    var j = 2;
	    context.beginPath();
	    context.moveTo(x, y);
	    for (j = 0; j < height; j++){
		for (i = 1; i <= width; i++){
		    context.lineTo(x + i * 2 * T_SIZE, y - i * T_SIZE);
		    context.lineTo(x + (i + 1) * 2 * T_SIZE + 2 * j * T_SIZE, y - (i - 1) * T_SIZE + j * T_SIZE);
		    context.lineTo(x +  (j+1)* 2 * T_SIZE, y + (j+1) * T_SIZE);
		    context.closePath();
		}
	    }
	    context.fillStrokeShape(this);
  	},
  	stroke: 'black',
	strokeWidth: 1,
	draggable: true,
	shadowColor: 'black',
	shadowBlur: 3,
	//shadowOffset: {x : 3, y : 3},
	//shadowOpacity: 0.7,
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
// Complete walls
const Wall = function(x,y,width,height,direction=-1) {
    return new Konva.Shape({
  	sceneFunc: function(context) {
  	    context.beginPath();
  	    context.moveTo(x,y);
  	    context.lineTo(x, y - T_SIZE*height);
  	    context.lineTo(x +  direction*T_SIZE*2*width, y - (T_SIZE)*(height+width));
  	    context.lineTo(x + direction*T_SIZE*2*width, y - T_SIZE * width);
  	    context.closePath();
  	    context.fillStrokeShape(this);
  	},
  	stroke: 'black',
  	strokeWidth: 1,
  	draggable: true,
	dragBoundFunc: function(pos) {
            var newX = Math.floor(pos.x / 20);
            var newY = Math.floor(pos.y / 10);
            return {
		x: newX * 20,
		y: newY * 10
            };
	}
    });
}
// partial wall
const partialWall = function(x,y,width,height,direction=-1, pdirection) {
    return new Konva.Shape({
	sceneFunc: function(context) {
	    if (pdirection === -1 ) {
		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(x +  direction*T_SIZE*2*width, y - (T_SIZE)*(height+width));
		context.lineTo(x + direction*T_SIZE*2*width, y - T_SIZE * width);
		context.closePath();
		context.fillStrokeShape(this);
	    } else {
		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(x, y - T_SIZE*height);
		context.lineTo(x +  direction*T_SIZE*2*width, y - (T_SIZE)*(height+width));
		context.closePath();
		context.fillStrokeShape(this);
	    }
	},
	stroke: 'black',
	strokeWidth: 1,
	draggable: true,
	dragBoundFunc: function(pos) {
	    var newX = Math.floor(pos.x / 20);
	    var newY = Math.floor(pos.y / 10);
	    return {
		x: newX * 20,
		y: newY * 10
	    };
	}
    });
}
// draw the graph of tiles on a layer
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
    });

    horizontalLine.move({
	x: 20,
	y: 20
    });
    layer.add(horizontalLine);

}
// stairs
const stairs = function(x, y, width, height, direction = -1) {
    return new Konva.Shape({
	sceneFunc: function(context) {
	    context.beginPath();
	    context.moveTo(x,y);
	    for (j = 0; j < height; j++) {
		for (i = 1; i <= 5; i++){
		    context.lineTo(x + direction*width*2*T_SIZE, y - T_SIZE*width);
		    context.lineTo(x + direction* (width*2*T_SIZE + 4*i + j * 20), y - T_SIZE*width + 6* i + j*30);
		    context.lineTo(x + direction*(4*i + j*20), y +6*i + j*30);
		    context.closePath();
		}
	    }
	    context.fillStrokeShape(this);
	},
	stroke: 'black',
	strokeWidth: 1,
	draggable: true,
	dragBoundFunc: function(pos) {
	    var newX = Math.floor(pos.x / 20);
	    var newY = Math.floor(pos.y / 10);
	    return {
		x: newX * 20,
		y: newY * 10
	    };
	}
    });
}

const Door = function(x, y, direction) {
    return new Konva.Shape({
	sceneFunc: function(context) {
	    context.beginPath();
	    context.moveTo(x,y);
	    context.lineTo(x, y - T_SIZE*4);
	    context.lineTo(x +  direction*T_SIZE*2*1, y - (T_SIZE)*5);
	    context.lineTo(x + direction*T_SIZE*2*1, y - T_SIZE * 1);
	    context.closePath();
	    context.fillStrokeShape(this);
	},
	fill: 'rgb(253,246,227)',
	stroke: 'black',
	strokeWidth: 1,
	draggable: true,
	dragBoundFunc: function(pos) {
	    var newX = Math.floor(pos.x / 20);
	    var newY = Math.floor(pos.y / 10);
	    return {
		x: newX * 20,
		y: newY * 10
	    };
	}
    });
}

const circle = function(x , y, color) {
  return new Konva.Circle({
    x: x,
    y: y,
    radius: 10,
    fill: color,
    stroke: color,
    strokeWidth: 1,
    draggable: true
  });
}
// spawns a tile on a button click
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
// spawn a grid of tiles
function spawnSomeTiles() {
    let width = Math.floor(parseInt($('#width').val()));
    let height = Math.floor(parseInt($('#height').val()));
    var group = new someTriangles(500, 500, width, height);
    group.on('mouseover', function() {
  	document.body.style.cursor = 'pointer';
    });
    group.on('mouseout', function() {
  	document.body.style.cursor = 'default';
    });
    layer.add(group);
}
// spawn a wall
function spawnWall() {
    let width = Math.floor(parseInt($('#WallWidth').val()));
    let height = Math.floor(parseInt($('#WallHeight').val()));
    let direction = document.getElementsByName('wallDirections')[0].checked;
    if (direction) { // if right is checked
  	direction = DIRECTION.RIGHT;
    } else { // left wall
  	direction = DIRECTION.LEFT;
    }
    let pdirection = document.getElementsByName('partialWallDirections')[0].checked;
    if (pdirection) { // if up is checked
  	pdirection = DIRECTION.UP;
    } else { // down is checked
  	pdirection = DIRECTION.DOWN;
    }
    let partiallity = document.getElementsByName('partialWallDirections')[2].checked;
    if (partiallity){
        var wall = new Wall(500,500,width,height,direction);
    } else {
        var wall = new partialWall(500,500,width, height,direction, pdirection);
    }
    wall.on('mouseover', function() {
  	document.body.style.cursor = 'pointer';
    });
    wall.on('mouseout', function() {
  	document.body.style.cursor = 'default';
    });
    layer.add(wall);
}
// spawn a set of stairs
function spawnStairs() {
    let width = Math.floor(parseInt($('#stairWidth').val()));
    let height = Math.floor(parseInt($('#stairHeight').val()));
    let direction = document.getElementsByName('stairDirections')[0].checked;
    if (direction) {// stairs left
  	direction = DIRECTION.LEFT;
    } else { // stairs right
  	direction = DIRECTION.RIGHT;
    }
    var stair = new stairs(500,500,width, height, direction);
    stair.on('mouseover', function() {
	document.body.style.cursor = 'pointer';
    });
    stair.on('mouseout', function() {
	document.body.style.cursor = 'default';
    });
    layer.add(stair);
}
// spawn a door
function spawnDoor(){
    let direction = document.getElementsByName('doorDirection')[0].checked;
    if (direction){
	direction = DIRECTION.LEFT;
    } else {
	direction = DIRECTION.RIGHT;
    }
    var door = Door(500,500, direction);
    D_ARRAY.push(door);
    door.on('mouseover', function() {
	document.body.style.cursor = 'pointer';
    });
    door.on('mouseout', function() {
	document.body.style.cursor = 'default';
    });
    layer.add(door);
}
function spawnCharacter () {
  var colors = ['red', 'orange', 'yellow', 'green', 'blue',
'purple', 'maroon', 'lightgray', 'gold', 'fuchsia'];
  if (playerCount < PLAYER_LIMIT){
    var char = circle(200, 200, colors[playerCount++]);
    D_ARRAY.push(char);
    char.on('mouseover', function() {
	document.body.style.cursor = 'pointer';
    });
    char.on('mouseout', function() {
	document.body.style.cursor = 'default';
    });
    layer.add(char);
  }
}
function spawnNPCharacter () {
    var char = circle(200, 200, 'black');
    D_ARRAY.push(char);
    char.on('mouseover', function() {
	document.body.style.cursor = 'pointer';
    });
    char.on('mouseout', function() {
	document.body.style.cursor = 'default';
    });
    layer.add(char);
  }
// draw the graph
drawGraph();
// add the layer to stage
stage.add(layer);

/* Saving and Loading */
const save = function() {
    let fileParts = [stage.toJSON()];
    let b = new Blob(fileParts, {type: 'text/plain'}); // file blob
    let dlink = window.URL.createObjectURL(b); // create a url for it

    let btn = document.createElement('a'); // create link to download
    document.body.append(btn);
    btn.setAttribute('href', dlink); // point to dlink
    // the 2nd argument is the name of the downloaded file
    btn.setAttribute('download', 'download.json');
    btn.click(); // prompt for download
    btn.remove(); // clean up
}
// wire up buttons to spawn functions
$(document).ready(function(){
    $('#tile').click(function(){
  	spawnTile();
  	stage.add(layer);
	doorsOnTop();
    });
    $('#TileGrid').click(function(){
  	spawnSomeTiles();
  	stage.add(layer);
	doorsOnTop();
    });
    $('#Wall').click(function() {
  	spawnWall();
  	stage.add(layer);
	doorsOnTop();
    });
    $('#Stairs').click(function() {
  	spawnStairs();
  	stage.add(layer);
	doorsOnTop();
    });
    $('#saveBtn').click(function() {
	doorsOnTop();
	save();
    });
    $('#door').click(function() {
    	spawnDoor();
	stage.add(layer);
    });
    $('#character').click(function() {
      spawnCharacter();
  stage.add(layer);
    });
    $('#npcharacter').click(function() {
      spawnNPCharacter();
  stage.add(layer);
    });
});
