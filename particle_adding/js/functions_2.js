var gather = false;
var gatherEnd = true;
var freeMove = true;
var a = 0;

function gather_particles(l){
    //freeMove = false;

        for(var i =0;i < l;i++){
            var shape = stage.getChildAt(i);

            var xMax= centerX - 20;
            var xMin= centerX + 20;

            var yMin = centerY + 20;
            var yMax = centerY - 20;


            var randomX = (Math.random() * (xMin - xMax)) + xMax;
            var randomY = (Math.random() * (yMin - yMax)) + yMax;


            shape.x = randomX;
            shape.y = randomY;
            randomParticleVel(shape);

            }
}

function gather_End(shape){
    randomParticleVel(shape);

}



function switch_one(){
  createParticles("angry","#f44336",20);
createParticles("stress","#212121",20);
createParticles("sad","#003366",20);
createParticles("happy","#ffeb3b",20);
createParticles("calm","#a9c45e",20);


  /*  if(gather == true){
        gather = false;
        freeMove = true;
    } else {
        gather = true;
        freeMove = false;
    }*/
}


function randomParticleVel(shape){
    //default scale and opacity

    //random Position
    //shape.x = Math.random() * canvas.width;
    //shape.y =Math.random() * canvas.height;

    //new velocity
    shape.velX = Math.random() * 2 - 1;
    shape.velY = Math.random() * 2 - 1;

}

//vars for exclusion
var exZone = 400;
var exX = centerX + exZone;
var exY = centerY + exZone;

function exclusionZone(){
    var l = stage.numChildren;
    for(var i = 0;i<l;i++){
        var shape = stage.getChildAt(i);


        //positve x value
        if(shape.X > centerX){
            if(shape.X < exX){
                randomParticleVel(shape);
            }
        }
        //pos
        if(exY > shape.Y > centerY){
            if(shape.X < exX){
                randomParticleVel(shape);
            }
        }

        //negatives
        //negative x vlaue
        if(shape.X < centerX){
            if(shape.X > (-exX)){
                randomParticleVel(shape);
            }
        }

        //negative x vlaue
        if(shape.Y < centerY){
            if(shape.Y > (-exY)){
                randomParticleVel(shape);
            }
        }
    }

}


//change the bg colour based on the proportion of "red" "blue" "green" tokens

function colourBg(){
    switch(emotion)
    {
          case "angry":
            //angry_tokens++;
            document.getElementById("two").style.backgroundColor = "black"; //black
            bgList.push("black");
              break;
          case "happy":
              document.getElementById("two").style.backgroundColor = "#80deea"; //cyan
              bgList.push("#80deea");
              break;
          case "sad":
            //003366
              document.getElementById("two").style.backgroundColor = "#1d8ece"; //midnightblue
              bgList.push("#1d8ece");
              break;
          case "stress":
            document.getElementById("two").style.backgroundColor = "#8B0000"; //red
            bgList.push("#8B0000");
            break;
        case "calm":
            //"#f9df7b
            document.getElementById("two").style.backgroundColor = "#FFFF33"; //pastel yellow
            bgList.push("#f9df7b");
              break;
          default:
            window.location.reload(true);
            break;
    }
    bgOpacity = 0.9;
}

//0:Stress, 1: Sad, 2:Calm , 3:Joy, 4:Angry
//var bgColors = ["#FF9800","#386bea","#","#ffc107","#00796b"];

var bgColors = ["red","black","#FAEd27","80deea","midnightble"];
var bgList = [];
var bgOpacity = 0.9;

//add a bg color to the list with every token.
//slow the rate of decay based on the proportion of tokens
//randomly pick another bg color (of allowed BGs)
function randomBgColor(){
    //document.getElementById("two").style.opacity = bgOpacity;
    var r = Math.round(Math.random()*bgList.length-1)
    var color1 = bgList[r];
    console.log(r);
    console.log(bgList.length);
    console.log(color1);

    document.getElementById("two").style.backgroundColor = color1;
    //gather_End();



}

//called very 10 frames to reeduce bg opacity by 0.01
//if opacity is lower than 0.4, new bg color
function reduceBg(){
    if(bgOpacity < 0.2){
        randomBgColor();
        bgOpacity = 0.9;
        //gather_particles(stage.numChildren);
    }
    document.getElementById("two").style.opacity = bgOpacity;
    bgOpacity = bgOpacity - 0.003;


}


function updateVars(){
    vis_angry = visible_par + visible_par;
    vis_happy = vis_angry + visible_par;
    vis_calm = vis_happy + visible_par;
    vis_sad = vis_calm + visible_par;
    vis_stress = vis_sad + visible_par;
}
