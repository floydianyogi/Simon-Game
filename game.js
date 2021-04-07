
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  }

  else {
    startOver();
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over"); }, 200 );
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false
}


function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){ $("." + currentColour).removeClass("pressed"); }, 300);
}







// Function playSound

// function playSound(expression) {
//   switch (expression) {
//     case "red":
//       var redSound = new Audio("sounds/red.mp3");
//       redSound.play();
//       break;
//     case "blue":
//       var blueSound = new Audio("sounds/blue.mp3");
//       blueSound.play();
//       break;
//     case "green":
//       var greenSound = new Audio("sounds/green.mp3");
//       greenSound.play()
//       break;
//     case "yellow":
//       var yellowSound = new Audio("sounds/yellow.mp3");
//       yellowSound.play();
//       break;
//     default:
//     console.log(randomChosenColour);
//   }
// }
