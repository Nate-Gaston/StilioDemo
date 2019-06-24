var canvas;
var stage;
var shape;

var maxRadius = 5;
var maxSize = 100;



var count = 0;


var centerX;
var centerY;
var firstRan;




function init() {
    //set colours


    // create a new stage and point it at our canvas:
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);

    centerX = canvas.width/2;//+55
    centerY = canvas.height/2;//+145
    console.log("Center: " + centerX + "," + centerY);

    // create a large number of slightly complex vector shapes, and give them random positions and velocities:
    for (var i = 0; i < 10; i++) {
        stage.addChild(basePar());
    }



    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
    cacheData();
}

function cacheData() {
    // iterate all the children except the fpsLabel, and set up the cache:
    var l = stage.numChildren - 1;
    for (var i = 0; i < l; i++) {
      var shape = stage.getChildAt(i);

      shape.cache(-maxSize, -maxSize, maxSize * 2, maxSize * 2);

    }
  }

function basePar(){
    var shape = new createjs.Shape();
        shape.pType = "base";
    shape.graphics.beginFill("#D3d3d3").drawCircle(0, 0, maxSize);

    shape.x = Math.random() * canvas.width;
    shape.y = Math.random() * canvas.height;
    shape.velX = Math.random() * 2 - 1; //num1 should be half of num 2 >> speed and direction.
    shape.velY = Math.random() * 2 - 1;

    firstRan = Math.floor(Math.random() * 30)*0.01;

    // turn snapToPixel on for all shapes - it's set to false by default on Shape.
	// it won't do anything until stage.snapToPixelEnabled is set to true.
    shape.snapToPixel = true;

    shape.scaleX = firstRan;
    shape.scaleY = firstRan;
    shape.alpha = 0.4;

    return(shape);

}


function testPar(){
    for(var i = 0; i <10;i++){
        var circ = new createjs.Shape();
        circ.graphics.beginFill("red").drawCircle(0, 0, maxSize);
        //circ.x = Math.random() * canvas.width;
        //circ.y = Math.random() * canvas.height;
        circ.x = centerX;
        circ.y = centerY;
        circ.pType = "base";
        circ.velX = Math.random() * 2 - 1; //num1 should be half of num 2 >> speed and direction.
        circ.velY = Math.random() * 2 - 1;

        firstRan = Math.floor(Math.random() * 30)*0.01;

        circ.snapToPixel = true;

        circ.scaleX = firstRan;
        circ.scaleY = firstRan;
        circ.J = Math.round(Math.random()*1);

        stage.addChild(circ);
    }

}


function createParticles(type,colour,num){
    for(var i = 0; i <num;i++){
        var particle = new createjs.Shape();

        var randomScale = (Math.random() * 30)*0.01;

        particle.graphics.beginFill(colour).drawCircle(0,0,maxSize);

        particle.pType = type;

        particle.x=centerX;
        particle.y=centerY;
        particle.velX = Math.random() * 2 - 1; //num1 should be half of num 2 >> speed and direction.
        particle.velY = Math.random() * 2 - 1;

        particle.firstRan = (Math.random() * 30);

        particle.snapToPixel = true;

        particle.defaultSpeed = 1;
        particle.defCount = 0;

        particle.scaleX = randomScale;
        particle.scaleY = randomScale;
        particle.mX = particle.scaleX;

        particle.J = Math.round(Math.random()*1);
        particle.alpha = 0.9;

        stage.addChild(particle);

    }
}
