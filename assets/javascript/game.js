//choose a random word (maybe use array of predetermined words...)
//have document dispay number of blanks as letters in word 

var userGuess = "";
var currentWord = "minister";
var wordDisplay = document.getElementById("word-display");
var solvedCounter = 0;
var guessesLeft = 10;
var guessedArray = [];
var guessedRight = false;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

//generate the <div>s for the word
wordDisplay.innerHTML = createDisplay(currentWord.length);

//guessing letters
//start of on-key-up function ---------------------------------------------------------
document.onkeyup = function(event){ 
    //pass the letter pressed (as a string) to userGuess variable
    userGuess = event.key
    console.log("You typed: " + userGuess)
        
    //check if the key is a letter, otherwise tell them to pick a letter
    if(alphabet.indexOf(userGuess) < 0){
        console.log("not a letter")
        document.getElementById('message-text').innerHTML = "That's not a letter"
        return;
    }

    //check if the letter has been used before if so, ask them to pick a new letter
    if(guessedArray.indexOf(userGuess) >= 0){
        console.log("you already guessed that letter");
        document.getElementById('message-text').innerHTML = "You already guessed that letter"
        return;
    }

     
    
    //reset the guessedRight value so that loop can properly moniter if this guess was correct
    guessedRight = false;

    //for each letter in the word, check if the guessed letter matches
    for(var i=0; i < currentWord.length; i++){
        //if the letter matches....
        if(userGuess == currentWord[i]){
            console.log("in position " + i);
            // replace the 
            document.getElementById('position-'+(i+1)).innerHTML = currentWord[i];
            solvedCounter++;
            console.log("solved letters: " + solvedCounter);
            guessedRight = true;

        } else {
            console.log("NOT in position " + i);
        }
    }
    //if after the for loop, the value of guessedRight is still false, that means that the guess was not correct and guesses left should decrease by one
    if(guessedRight == false){
        guessesLeft--;
        document.getElementById('message-text').innerHTML = "You just guessed: " + userGuess + ". WRONG!!"
    } else {
        document.getElementById('message-text').innerHTML = "You just guessed: " + userGuess + ". CORRECT!!"
    }

    guessedArray.push(userGuess);

    console.log("guesses left: " + guessesLeft);
    console.log("letters guessed: " + guessedArray);

    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("guessed-letters").innerHTML = guessedArray;

    // if the solvedCounter = the length of the word (i.e. all letters have been guessed right) then wins should increase and the game should resatart

    //if the guesses is zero, then you lose the game... give option to start over...



} //end of on-key-up function ----------------------------------------------------------------


document.getElementById('test').innerHTML = currentWord[0]+currentWord[1]+currentWord[2]+currentWord[3]+currentWord[4]; 

// Create function to generate new word

// this function generates blanks spaces for each letter in the word
function createDisplay(wordLength){
    // declare empty string variable
    var displayContent = "";
    // for each letter in the word, add a new <div> element to the HTML with a "_"
    for (var i=1; i < wordLength+1; i++){
        displayContent = displayContent+'<div class="letter-holder position-" id="position-' + i + '">_</div>';
    }
    return displayContent;

}