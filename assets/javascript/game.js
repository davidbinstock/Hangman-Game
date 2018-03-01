//choose a random word (maybe use array of predetermined words...)
//have document dispay number of blanks as letters in word 

var userGuess = "";
var currentWord = "minister";
var wordDisplay = document.getElementById("word-display");
var solvedCounter = 0;
var guessesLeft = 10;
var guessedArray = [];
var guessedRight = false;

//generate the <div>s for the word
wordDisplay.innerHTML = createDisplay(currentWord.length);

//guessing letters
document.onkeyup = function(event){
    userGuess = event.key
    guessedRight = false;

    console.log("You Guessed: " + userGuess)
    for(var i=0; i < currentWord.length; i++){
        if(userGuess == currentWord[i]){
            console.log("in position " + i);
            document.getElementById('position-'+(i+1)).innerHTML = currentWord[i];
            solvedCounter++;
            console.log("solved letters: " + solvedCounter);
            guessedRight = true;

        } else {
            console.log("NOT in position " + i);
        }
    }

    if(guessedRight == false){
        guessesLeft--;
    }
    guessedArray.push(userGuess);

    console.log("guesses left: " + guessesLeft);
    console.log("letters guessed: " + guessedArray);

    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("guessed-letters").innerHTML = guessedArray;



}


document.getElementById('test').innerHTML = currentWord[0]+currentWord[1]+currentWord[2]+currentWord[3]+currentWord[4]; 



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