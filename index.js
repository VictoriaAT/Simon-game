
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).keypress(function(){
  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
     started = true;
  }

});

$(".btn").click(function(){
  // Almacena el id del boton (clicked)
  var userChosenColour= $(this).attr("id");
  // Guarda los colores en un array
  userClickedPattern.push(userChosenColour);
  //Reproduce el sonido
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");

setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
        nextSequence();
      }, 1000);
      }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function nextSequence(){
  userClickedPattern=[];
  level++;

  $("h1").text("Level "+level);

  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}
