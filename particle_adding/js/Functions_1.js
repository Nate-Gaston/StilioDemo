var tagArray2 = ["2b005b9c1a", 
                "2b005b95be", 
                "2b005badc7", "2b005bc67d", "2b005b934f", "2b005ba81a", "2b005b95b0", "2b005bbc0a", "2b005bca58", "2b005bdf71", "2b005bc51f", "2b005b7637", "2b005bbe47", "2b005b7676", "2b005bc2e5", "2b005b8c66", "2b005bdc6a", "2b005ba589", "2b005b8401", "2b005bdc24", "0b0095056c", "2b005b7ffc", "2b005bdfdc", "01056df998"];
var tagArray = ["2b005b7ffc", 
"2b005bdc6a","01050023ac","2b005b8401",
"2b005b8c66","2b005bdf71", "2b005bc67d","2b005bbe47","2b005b7676","2b005ba81a", "2b005b7637","2b005bc2e5", "2b005b95be", "2b005b9c1a", "2b005bc51f", "2b005bdc24","2b005bbc0a", "2b005badc7", "2b005ba589","2b005b934f", "2b005b95b0", "2b005bca58", "0b0095056c", "2b005bdfdc", "01056df998"];

//universals
var emotion = "nothing";

function compareArray(){
    for(var i = 0;i<tagArray.length;i++){
        var search = "";
        for(var a = 0;a<tagArray2.length;a++){
             if(tagArray[i] == tagArray2[a]){
                //found something
                 search = tagArray[i];
            }
            
        }
       if(search == ""){
           console.log(tagArray[i]);
       }
    }
}

//particle Numbers
var visible_par = 16;


//angry, stressed, sad, joy, calm


//sets the current emotion
function setEmotion(tagId){
  
    
    var j = 0;
    
    for(var i=0; i<tagArray.length; i++){
            if(tagId == tagArray[i]){
            j = 1;
            //check for type
            //0 - 4
                if(i < 5){
                    //angry
                    emotion = "angry";
                    
                    createParticles(emotion,"#f44336",visible_par);


                }
                //5 - 9
                if(i >= 5 && i < 10 ){
                    //happy
                    emotion = "stress"; //#212121
                    //createHapPar();
                    createParticles(emotion,"#212121",(visible_par));
                  
                }
                //10 - 14
                if(i >= 10 && i < 15){
                    //sad
                    emotion = "sad";
                    //sadPar(); #0050a4
                    //1d8ece
                    createParticles(emotion,"#003366",visible_par*1.3);
                    

                }
                //14 - 19
                if(i >= 15 && i < 19){
                    //calm
                    emotion = "happy"; //#ffeb3b
                    //calmPar();
                    createParticles(emotion,"#ffeb3b",visible_par*0.5);
                    
                    j = 1;
                }
                //20 + 
                if(i >= 19){
                    //calm #a9c45e
                    emotion = "calm";
                    createParticles(emotion,"#a9c45e",visible_par);
                    
                }
            
            }
            
        }    
    cacheData();
    colourBg();
}



/*>>>>>> CANVAS UPDATING FUNCTIONS <<<<<<*/
function tick(event) {
    //var w = canvas.width + maxRadius * 2;
	//var h = canvas.height + maxRadius * 2;
	var l = stage.numChildren;
        
    updateVars();
	//movement ONLY (TBD)
    if(gather == true){
        gather_particles(shape, l);
    }
    
    /*if(freeMove == true){
        //put the movement's in here
          //Base: 0 - 59
        for (var i = 0; i < visible_par; i++) {
            var shape = stage.getChildAt(i);
            defaultMove(shape);

        }

        //Angry: 60 - 119
        for (var i = visible_par; i < vis_angry; i++){
            var shape = stage.getChildAt(i);
            defaultMove(shape);
            pulse(shape);
            shake(shape,0.4);

        }

        //Happy: 120 - 179
        for (var i = vis_angry; i < vis_happy; i++){
            var shape = stage.getChildAt(i);
            //defaultMove(shape);
            //repulseCenter(shape);
            popping(shape);
        }

        //Calm: 180 - 239
        for (var i = vis_happy; i < vis_calm; i++) {
           var shape = stage.getChildAt(i);
            defaultMove(shape);

        }

        //sad: 240 - 359
        for (var i = vis_calm; i < vis_sad; i++) {
            var shape = stage.getChildAt(i);
            //defaultMove(shape);
            falling(shape);
        }

        //Stressed: 300 - 360
        for (var i = vis_sad; i < vis_stress; i++) {
            var shape = stage.getChildAt(i);
            //defaultMove(shape);
            shake(shape,0.7);

        }
    }*/
    
    if(freeMove == true){
        for(var i =0;i < l;i++){
            var shape = stage.getChildAt(i);
            if(shape.pType == "base"){
                 defaultMove(shape,1);
            }
            if(shape.pType == "angry"){
                defaultMove(shape,shape.defaultSpeed);
                pulse(shape);
                shake(shape,0.2);
                calmMove(shape);
            }
            if(shape.pType == "happy"){
                popping(shape);
                defaultMove(shape,shape.defaultSpeed);
                
            }
            if(shape.pType == "sad"){
                falling(shape);
                defaultMove(shape,shape.defaultSpeed);
            }
            if(shape.pType == "calm"){
                defaultMove(shape,shape.defaultSpeed);
                calmMove(shape);
                
            }
            if(shape.pType == "stress"){
                shake(shape, 1);
                defaultMove(shape,shape.defaultSpeed);
            }
            
        }
    }
    
    //exclusionZone();
    
    if(count%15==0){
        reduceBg();
        
    }
      
    

    
    
    
    
    
    
    
    
    count++;
    
    //final event
	stage.update(event);
}

window.onkeydown = function(event) {
     if (event.keyCode === 32) {
        //do something
        switch_one();
        //stage.addChild(new createjs.Shape()).set({x:100,y:100}).graphics.f("red").dc(0,0,50);
        //createAngryPar2();
         compareArray();
        
     }
  }


//default, reandom movement
function defaultMove(shape,pSpeed){
    var w = canvas.width + maxRadius * 2;
	var h = canvas.height + maxRadius * 2;
    
    var speed = pSpeed;
    
    shape.x = (shape.x + maxRadius + (shape.velX * speed) + w) % w - maxRadius;
    shape.y = (shape.y + maxRadius + (shape.velY * speed) + h) % h - maxRadius;
        
}


function randomParticlePos(shape){
    //default scale and opacity
    shape.scaleX = 0.3;
    shape.scaleY = 0.3;
    shape.alpha = 1;       
    
    //random Position
    shape.x = Math.random() * canvas.width;
    shape.y =Math.random() * canvas.height;
    
    //new velocity
    shape.velX = Math.random() * 2 - 1;  
    shape.velY = Math.random() * 2 - 1;
    
}


function falling(parShape){
    //reduce a random amount between 0 and 0.03 tick. 
    var number = (Math.floor(Math.random() * 100));
    var pRate = number * 0.01;
    
    if(parShape.scaleX > 0.002){
        parShape.scaleX = parShape.scaleX - Math.abs(pRate)*0.0007;
        parShape.scaleY = parShape.scaleY - Math.abs(pRate)*0.0007;
        parShape.alpha = parShape.alpha - (Math.random()*0.007);
    
    }
    
    
    if(parShape.scaleX < 0.002){
        randomParticlePos(parShape);
        
        
    }
    
    //high default move for several ticks
    if(parShape.defCount < 70){
        parShape.defCount++;
        parShape.defaultSpeed = 3;
        
        
    }
    if(parShape.defCount == 70){
        parShape.defaultSpeed = 0.3
    }
    
    
}


function shake(parShape, rate){	
    var shape = parShape;

    var chance = Math.random() * 10;
    var jspeed = rate;
        
    
    var jiggleX = (Math.random() * 10 - 5) * jspeed;
    var jiggleY = (Math.random() * 10 - 5) * jspeed
    
    //do the jiggle
    shape.x = (shape.x + jiggleX);
    shape.y = (shape.y + jiggleY);
    
    
    //high default move for several ticks
    if(shape.defCount < 70){
        shape.defCount++;
        shape.defaultSpeed = 3;
        
        
    }
    if(shape.defCount == 70){
        if(shape.type == "angry"){
            shape.defaultSpeed = 1.4;
        }else{
            shape.defaultSpeed = 0.6;
        } 
        }
    }


function pulse(shape){
    var veloX = 10;
    var veloY = (veloX/16)*9;//9/16 of velox for 16/9 ratio 
    var s = Math.abs(shape.velX);
    
    var r = shape.firstRan;
    
    //random direction
    if(count > 3000){
        if(count%(r) == 0){
            shape.velX = Math.random() * 2 - 1;
            shape.velY = Math.random() * 2 - 1; 
            console.log("new direction");
        }
    }
 
    /*---- pulsing ----*/
    
    //grow
    
    var mmX = shape.mX + 0.08;
    
    if(shape.J ==1){
        shape.scaleX = shape.scaleX + (s * 0.025);
        shape.scaleY = shape.scaleY + (s * 0.025);
    }
    //shrink
    if(shape.J == 0){
        //shape.scaleX = shape.scaleX - (s * 0.01);
        //shape.scaleY = shape.scaleY - (s * 0.01);
        shape.scaleX = shape.scaleX - (s * 0.025);
        shape.scaleY = shape.scaleY - (s * 0.025);
    }
    //max check
    if(shape.scaleX > mmX){
       shape.J = 0;
    }
    //min check
    if(shape.scaleX < 0.05){
        shape.J = 1;
        //shape.scaleX = 0.05;
        //shape.scaleY = 0.05;
    }
    
}

function repulseCenter(shape){
    var w = canvas.width + maxRadius * 2;
	var h = canvas.height + maxRadius * 2;
    var veloX = Math.random()*3;
    var veloY = Math.random()*3;
    
    //move to center
     if(shape.x > centerX){
        shape.x = shape.x + veloX;
    }
    else if(shape.x < centerX){
        shape.x = shape.x - veloX;
    }
    //y
    if(shape.y > centerY){
        shape.y = shape.y + veloY;
    }
    else if(shape.y < centerY){
        shape.y = shape.y - veloY;
    }
    
    //new position upon edge of doc
    
    if((shape.x < (0) || shape.x > (w)) || (shape.y < (0) || shape.y > (h))){
        //new position
        //shape.x = Math.random() * canvas.width/4;
        shape.x = centerX + Math.random()*100-50;
        shape.y = centerY + Math.random()*100-50;
        //shape.y = centerY;    
    }
    
        
    
        
        
}

//increase in size
function popping(shape){
    var rate = Math.random()*0.005;
    var pop = (Math.random()*0.4)+0.4
    
    //increase in size
    shape.scaleX = shape.scaleX + rate*1.1;
    shape.scaleY = shape.scaleY + rate*1.1;
    
    //pop at certain size
    if(shape.scaleX > 0.2){
        shape.alpha = 0.4;
        shape.scaleX = shape.scaleX + rate*2;
        shape.scaleY = shape.scaleY + rate*2;
        
        if(shape.scaleX > pop){
            //shape.visible = true;
            randomParticlePos(shape);
            shape.scaleX = 0.1;
            shape.scaleY = 0.1;
        }
    }

    if(shape.defCount < 70){
        shape.defCount++;
        shape.defaultSpeed = 5;
        
        
    }
    if(shape.defCount == 70){
        shape.defaultSpeed = 0;
    }
}


function calmMove(shape){
    var rand = 100+(Math.round(shape.firstRan)*80);     
    if(count % rand == 0){
        shape.velX = Math.random() * 2 - 1;
        shape.velY = Math.random() * 2 - 1; 
    }
    
    if(shape.defCount < 70){
        shape.defCount++;
        shape.defaultSpeed = 3;
    }
    
    if(shape.defCount == 70){
        if(shape.type == "angry"){
            shape.defaultSpeed = 1.4;
        }else{
            shape.defaultSpeed = 0.8;
        } 
        }
    }