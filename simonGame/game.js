let buttonColors = ["red","blue","green","yellow"];
let level = 0;
let gamePattern = [];
let userChosenColor = "";
let userPattern = [];
let restart = 0;

//adds next color to gamePattern
function nextSequence(){
  let num = Math.random() * 4;
  let randomNumber = Math.floor(num);
  gamePattern.push(buttonColors[randomNumber]);
  $("#"+ gamePattern[level]).fadeIn().fadeOut().fadeIn();
  playSound(gamePattern[level]);
  level++;
  $("h1").text("Level "+ level);
  userPattern = [];
}
//check pattern function
function check(levelNum){
  if(userPattern[levelNum] == gamePattern[levelNum] && levelNum == gamePattern.length-1){
      setTimeout(function (){
        nextSequence();
      },1000);
  }
  else if(userPattern[levelNum] == gamePattern[levelNum] && levelNum != gamePattern.length-1){
    }
    else{
      gameOver();
      startOver();
    }
}
//Add click events to buttons
  for(let i = 0; i < buttonColors.length; i++){
    $("#"+ buttonColors[i]).click(function(){
      userChosenColor = this.id;
      userPattern.push(userChosenColor);
      check(userPattern.length-1);
      animatePress(userChosenColor);
      playSound(userChosenColor);
    });
  }
//adds key input events
  document.addEventListener("keydown",function(event){
    if(event.key == "a" && level == 0){
      nextSequence();
    }
    if(restart == 1){
      nextSequence();
      restart = 0;
    }
  });
//adds animation to buttons
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
  // gameOver
  function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  }
  //start over
  function startOver(){
      level = 0;
      restart += 1;
      gamePattern = [];
      userPattern = [];
      userChosenColor ="";
  }
  //set restart to setFalse

  //add Sounds to buttonColors
  function playSound(color){
    switch (color) {
      case "red":
        var red = new Audio("sounds/red.mp3");
        red.play();
        break;

      case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

      case "green":
        var green = new Audio("sounds/green.mp3")
        green.play();
        break;
        
      case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
        break;

        default:
          var wrong = new Audio("sounds/wrong.mp3");
          wrong.play();
    }
  }
