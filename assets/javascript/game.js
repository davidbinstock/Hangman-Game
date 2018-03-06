//choose a random word (maybe use array of predetermined words...)
//have document dispay number of blanks as letters in word 

var userGuess = "";
var wordDisplay = document.getElementById("word-display");
var lettersCorrect = 0;
var guessesLeft = 6;
var guessedArray = [""];
var wins = 0;
var guessedRight = false;
var stopGame = false;



//generate the first word
var wordIndex = 0;
newWord();
//set up board
updateLettersGuessedField();
updateField("guesses-left",guessesLeft);
updateField("wins-text", wins);
updateField('message-text', "Press a key to guess a letter");

//guessing letters
//start of on-key-up function ---------------------------------------------------------
document.onkeyup = function(event){ 
    //if stopGame is true, pause untill space bar is hit, then go onto next word
    if(stopGame == true){
        if(event.code == "Space"){
            wordIndex++;
            newWord();
            resetDrawing();
            return;
        }else{
            return;
        }
    }
    //pass the letter pressed (as a string) to userGuess variable
    userGuess = event.key
    console.log("You typed: " + userGuess)
        
    //check if the key is a letter, otherwise tell them to pick a letter
    if(isLetter(userGuess)==false){
        console.log("not a letter")
        updateField('message-text', "That's not a valid guess, please choose a letter")
        //changed message board background color to orange
        document.getElementById("message-board").style.backgroundColor = "#ecb43d"
        return;
    }

    //check if the letter has been used before if so, ask them to pick a new letter
    if(guessedArray.indexOf(userGuess) >= 0){
        console.log("you already guessed that letter");
        updateField('message-text', "You already guessed that letter")
        //changed message board background color to orange
        document.getElementById("message-board").style.backgroundColor = "#ecb43d"
        return;
    }
      
    //check if letter is in the word (i.e. if they guessed correctly)
    if(currentWord.indexOf(userGuess) >= 0){
        //changed message board background color to blue
        document.getElementById("message-board").style.backgroundColor = "#3dbaec"
        // tell user they guessed right
        updateField("message-text", "You guessed '"+userGuess+ " ' <br> CORRECT!");
        //set guessedRight to true 
        guessedRight = true;
        //display correct letters on the board
        placeLetter();
    
     }else{
        //changed message board background color to red
        document.getElementById("message-board").style.backgroundColor = "#fd634e"
        //tell usere they guessed wrong
        updateField("message-text","You guessed '"+userGuess+ "' <br> WRONG!");
        //set guessedRight to false
        guessedRight = false;
        //decrease guesses by 1
        guessesLeft--;
        //update guesses left
        updateField("guesses-left",guessesLeft);
        //draw next body part
        drawBodyPart();
     }

    //update letters guessed array
    guessedArray.push(userGuess);
    updateLettersGuessedField();
    
    //check if they solved the word
    if(lettersCorrect >= currentWord.length){
        updateField("message-text", "You got it! Nice job!! <br> Press space to continue");
        stopGame = true;
        wins++;
        updateField("wins-text", wins)
        //newWord();
        
    }
    //if the guesses is zero, then you lose the game... give option to start over...
    //check if they ran out of guesses
    if(guessesLeft <= 0){
        updateField("message-text", "You didn't get this word... <br> Press space to continue");
        revealWord(); 
        stopGame = true;
        //newWord();
        
    }
} //end of on-key-up function ----------------------------------------------------------------

// Create function to generate new word
function newWord(){
    var wordBank = ["susie", "transmogrifier", "spacemanspiff","gross", "calvinball", "stupendousman", "tracerbullet", "toboggan", "duplicator", "misswormwood", "hamsterhuey", "gooeykablooie"];
    console.log(wordIndex)
    console.log(wordBank.length)
    if(wordIndex >= wordBank.length){
        //changed message board background color to blue
        document.getElementById("message-board").style.backgroundColor = "#3dbaec"
        updateField("message-text", "Aww shucks, we're all out of words <br> You got "+wins+" out of "+wordBank.length+" right!");
        return;
    }
    currentWord=wordBank[wordIndex];
    wordDisplay.innerHTML = createDisplay(currentWord);
    //changed message board background color to blue
    document.getElementById("message-board").style.backgroundColor = "#3dbaec"
    //upddate message board
    updateField("message-text", "Next Word!")
    //resetting parameters
    guessedArray = [""];
    updateLettersGuessedField();
    guessesLeft = 6
    updateField("guesses-left",guessesLeft);
    lettersCorrect = 0;
    //reset stopGame
    stopGame = false;    
}

// this function generates blanks spaces for each letter in the word
function createDisplay(word){
    // declare empty string variable
    var displayContent = "";
    // for each letter in the word, add a new <div> element to the HTML with a "_"
    for (var i=1; i < word.length+1; i++){
        displayContent = displayContent+'<div class="letter-holder position-" id="position-' + i + '">_</div>';
    }
    return displayContent;

}

function updateField(field, newText){
    document.getElementById(field).innerHTML = newText;
}

function updateLettersGuessedField(){
    var text = "";
    for(var i=0; i < guessedArray.length; i++){
        text = text + guessedArray[i] + " ";
        updateField("guessed-letters",text);
    }
}

function isLetter(letter){
    if(letter.match(/^[A-Za-z]$/)){
        return true;
    }else{
        return false;
    }  
}

function placeLetter(){
    for(var i=0; i < currentWord.length; i++){
        //if the letter matches....
        if(userGuess == currentWord[i]){
            console.log("in position " + i);
            // replace the 
            document.getElementById('position-'+(i+1)).innerHTML = currentWord[i];
            lettersCorrect++;
            console.log("solved letters: " + lettersCorrect);

        } else {
            console.log("NOT in position " + i);
        }
    }
}

function drawBodyPart(){
    for(var i=1; i <= 6-guessesLeft; i++){
        var id = "body-part-"+i;
        document.getElementById(id).style.display = "block";
    }
    if(guessesLeft==0){
        document.getElementById("snowman").style.animationName = "swinging"
    }
}

function resetDrawing(){
    document.getElementById("snowman").style.animationName = "";
    for(var i=1; i < 7; i++){
        var id = "body-part-"+i;
        document.getElementById(id).style.display = "none";
    }
}

function revealWord(){
    for(var i=0; i < currentWord.length; i++){
        //if the letter matches....
        if(guessedArray.indexOf(currentWord[i]) < 0){
            document.getElementById('position-'+(i+1)).innerHTML = currentWord[i];
            document.getElementById('position-'+(i+1)).style.color = "red";

        }
    }
}



