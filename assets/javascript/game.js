//choose a random word (maybe use array of predetermined words...)
//have document dispay number of blanks as letters in word 

//var wordLength = 4;
var wordDisplay = document.getElementById("word-display");

//wordDisplay.innerHTML = '<div class="letter-holder">hello</div>';


wordDisplay.innerHTML = createDisplay(5);



function createDisplay(wordLength){
    // declare empty string variable
    var displayContent = "";
    // for each letter in the word, add a new <div> element to the HTML with a "_"
    for (var i=0; i < wordLength; i++){
        displayContent = displayContent+'<div class="letter-holder">_</div>';
    }
    return displayContent;

}