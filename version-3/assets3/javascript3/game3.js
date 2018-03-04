//choose a random word (maybe use array of predetermined words...)
//have document dispay number of blanks as letters in word 

var userGuess = "";
var wordDisplay = document.getElementById("word-display");
var lettersCorrect = 0;
var guessesLeft = 6;
var guessedArray = [];
var wins = 0;
var guessedRight = false;
var stopGame = false;



//generate the first word
var wordIndex = 0;
newWord();
//set up board
updateField("guessed-letters",guessedArray);
updateField("guesses-left",guessesLeft);
updateField('message-text', "Press any key to get started")

//guessing letters
//start of on-key-up function ---------------------------------------------------------
document.onkeyup = function(event){ 
    //if stopGame is true, pause untill space bar is hit, then go onto next word
    if(stopGame == true){
        if(event.code == "Space"){
            wordIndex++;
            newWord();
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
        updateField('message-text', "That's not a letter")
        return;
    }

    //check if the letter has been used before if so, ask them to pick a new letter
    if(guessedArray.indexOf(userGuess) >= 0){
        console.log("you already guessed that letter");
        updateField('message-text', "You already guessed that letter")
        return;
    }
      
    //check if letter is in the word (i.e. if they guessed correctly)
    if(currentWord.indexOf(userGuess) >= 0){
        // tell user they guessed right
        updateField("message-text", "you guessed '"+userGuess+ "'. That's correct!");
        //set guessedRight to true 
        guessedRight = true;
        //display correct letters on the board
        placeLetter();
    
     }else{
        //tell usere they guessed wrong
        updateField("message-text","you guessed '"+userGuess+ "'. WRONG!");
        //set guessedRight to false
        guessedRight = false;
        //decrease guesses by 1
        guessesLeft--;
        //update guesses left
        updateField("guesses-left",guessesLeft);
     }

    //update letters guessed array
    guessedArray.push(userGuess);
    updateField("guessed-letters",guessedArray);
    
    //check if they solved the word
    if(lettersCorrect >= currentWord.length){
        updateField("message-text", "YOU WIN!! <br> press space to continue");
        stopGame = true;
        wins++;
        updateField("wins-text", wins)
        //newWord();
        
    }
    //if the guesses is zero, then you lose the game... give option to start over...
    //check if they ran out of guesses
    if(guessesLeft <= 0){
        updateField("message-text", "YOU LOOSE, SIR!! I SAID GOOD DAY!! <br> press space to continue"); 
        stopGame = true;
        //newWord();
        
    }
} //end of on-key-up function ----------------------------------------------------------------

// Create function to generate new word
function newWord(){
    var wordBank = ["guitar", "mandolin", "banjo", "violin", "cello", "ukelele", "bass", "viola"];
    console.log(wordIndex)
    console.log(wordBank.length)
    if(wordIndex >= wordBank.length){
        updateField("message-text", "all out of words <br> you got "+wins+" out of 8 words right!");
        return;
    }

    currentWord=wordBank[wordIndex];
    wordDisplay.innerHTML = createDisplay(currentWord);

    //upddate message board
    updateField("message-text", "Next Word! Press any key to get started")
    //resetting parameters
    guessedArray = [];
    updateField("guessed-letters",guessedArray);
    guessesLeft = 6
    updateField("guesses-left",guessesLeft);
    lettersCorrect = 0;
    //reset stopGame
    stopGame = false;

    /**/

    
    
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