const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5 //All capital letter?, cause not gonna changed 

async function init() {
    let currentGuess = ''; // this is what user input
    let currentRow = 0;

    const res = await fetch("https://words.dev-apis.com/word-of-the-day") //?random=1
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
// const { word } = await res.json(); in one line
    const wordParts = word.split(""); // this is the answer

    console.log(wordParts)

function addLetter (letter) {
    // add letter to the end
    if (currentGuess.length < ANSWER_LENGTH) {
        currentGuess += letter
    } else {
        // replace the last letter
        currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
}

async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH){
        // do noting 
        return;
    }

    // TODO validate the word

    // TODO do all the making ad :"cocrrect", "colose" or "wrong"
    const guessParts = currentGuess.split(""); // user input
    const map = makeMap(wordParts);
 console.log("map", map)


    for (let i=0; i < ANSWER_LENGTH; i++) {
        //mark as correct
        if (guessParts[i] === wordParts[i]) {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
            map[guessParts[i]]--;
            decodeURIComponent
        }
    }

    for (let i=0; i < ANSWER_LENGTH; i++) {
        //mark as correct
        if (guessParts[i] === wordParts[i]) {
            // Do nothing, we already go through
        } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
            // Mark as close
            letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
            map[guessParts[i]]--;
        } else {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");

        }
    }
    // TODO did they win or loose?

    currentRow++;
    currentGuess = '';

}

function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length -1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
}

//getting key board value
    document.addEventListener('keydown', function handleKeyPress (event) {
        const action = event.key;

        console.log(action)

        if (action === 'Enter'){
            commit();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
            //it's a single letter
        } else {
            //do nothing
        }
        //return undefined;
    });
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
    loadingDiv.classList.toggle('hidden', !isLoading);
}

// how many same letters in it
function makeMap (array) {
    const obj = {};
    for (let i= 0; i < array.length; i++) {
        const letter = array[i];
        if ( obj[letter]) {
            obj[letter]++; // obj is empty now, right? donknow
        } else {
            obj[letter] = 1;
        }
    }
    return obj;
}

init();
