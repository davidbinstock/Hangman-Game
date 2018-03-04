var wordBank = ["guitar", "mandolin", "banjo", "violin", "cello", "ukelele", "bass", "viola"]
var wordIndex = 0;
var marqueeWord = document.getElementById("marquee-word");
var message = document.getElementById("message");
var currentWord = wordBank[wordIndex];
var wordHolder = [];
var userGuess = "you shouldn't see this...";
var lettersGuessed = [];
var lettersCorrect = 0;
var guessesLeft = 5;
var scoreBoardGuesses = document.getElementById("guesses-left");
var scoreBoardLetters = document.getElementById("letters-left");




generateMarquee();
updateMarquee();
updateScoreBoard();

// start of on-key-up function ------------------------------------------------------
document.onkeyup = function(event){
  userGuess = event.key;
  //check if letter is alphabetic, if yes continue, if not return and prompt user to input letter
  if(isLetter(userGuess) == false){
    message.innerHTML = ("that's not a letter");
    return;
  }
  //check if letter was guessed already
  if(lettersGuessed.indexOf(userGuess) >= 0){
    message.innerHTML = ("you already guessed that letter");
    return;
  }
  
  //check if letter is in current word
  if(currentWord.indexOf(userGuess) >= 0){
      message.innerHTML = ("you guessed '"+userGuess+ "'. That's correct!");
      updateMarquee();
   }else{
      message.innerHTML = ("you guessed '"+userGuess+ "'. WRONG!");
      guessesLeft--;
   }
  //add guessed letter to lettersguessed array
  lettersGuessed.push(userGuess);
  updateGuessedLetters();
  updateScoreBoard();
  
  //check if they solved the word
  if(lettersCorrect >= currentWord.length){
    message.innerHTML = ("YOU WIN!!");
    nextWord();
    return;
  }
  
  //check if they ran out of guesses
    if(guessesLeft <= 0){
    message.innerHTML = ("YOU LOOSE, SIR!! I SAID GOOD DAY!!");
    nextWord();
    return;
  }
  
} // end of on-key-up function -------------------------

function nextWord(){
  wordIndex++;
  
  if(wordIndex >= wordBank.length){
    message.innerHTML = ("all out of words");
    return;
  }
  userGuess = ""
  wordHolder=[];
  lettersGuessed = [];
  lettersCorrect = 0;
  guessesLeft = 5
  //pick new word
  currentWord = wordBank[wordIndex]
  updateGuessedLetters();
  updateScoreBoard();
  generateMarquee();
  updateMarquee();
  alert("newgame")
}


function updateScoreBoard(){
  scoreBoardGuesses.innerHTML =  guessesLeft;
  scoreBoardLetters.innerHTML =  (currentWord.length - lettersCorrect);
  
}

function updateGuessedLetters(){
  document.getElementById("letters-guessed").innerHTML = lettersGuessed;
}

function isLetter(letter){
  if(letter.match(/^[A-Za-z]+$/)){
    document.getElementById("is-letter").innerHTML = "true";
    return true;
    
  }else{
    document.getElementById("is-letter").innerHTML = "false";
    return false;
  }  
}

function generateMarquee(){
  for(var i=0; i < currentWord.length; i++){
    wordHolder.push("_");
  }
}

function updateMarquee(){
  for(var i=0; i < currentWord.length; i++){
    if(userGuess == currentWord[i]){
      wordHolder[i] = userGuess;
      lettersCorrect++;
     }
  }
  marqueeWord.innerHTML = ""
  for(var i=0; i < currentWord.length; i++){
    marqueeWord.innerHTML= marqueeWord.innerHTML + " " +wordHolder[i]
  }
}