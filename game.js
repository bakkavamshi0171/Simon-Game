const buttonColors=["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[];

let level = 0;
let started =false;

$(document).on("keypress",function(){
    if(!started){
    nextSequence();
    started = true;
    }
})

$(".btn").on("click",function(){
    let userChosenColor = (this.id);
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userChosenColor.length - 1);
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        console.log(gamePattern);
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");
        console.log(userClickedPattern);
        playSound("wrong");

        $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // selecting button and adding animation
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // music has been adding to chosencolor
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    
}

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
         $("#"+currentColour).removeClass("pressed"); } , 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
  }