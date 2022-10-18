const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5 //All capital letter?, cause not gonna changed 
const ROUNDS = 6;


async function init() {
    let currentGuess = ''; // this is what user input
    let currentRow = 0;
    let isLoading = true;


    const res = await fetch("https://words.dev-apis.com/word-of-the-day") //?random=1
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
// const { word } = await res.json(); in one line
    const wordParts = word.split(""); // this is the answer
    let done = false;

    setLoading(false);
    isLoading = false;
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

    
    //  validate the word
    isLoading = true;
    setLoading(true);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
        method: "POST",
        body: JSON.stringify({ word: currentGuess})
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;
    // const { validWord } = resObj;
console.log("validWord??", validWord);
    isLoading = false;
    setLoading(false);

    if (validWord == false) {
        markInvalidWord();
        return;
    }
    //  do all the making ad :"cocrrect", "colose" or "wrong"
    const guessParts = currentGuess.split(""); // user input
    const map = makeMap(wordParts);
    console.log("map", map)


    for (let i=0; i < ANSWER_LENGTH; i++) {
        //mark as correct
        if (guessParts[i] === wordParts[i]) {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
            map[guessParts[i]]--;
        }
    }

    for (let i=0; i < ANSWER_LENGTH; i++) {
        //mark as correct
        if (guessParts[i] === wordParts[i]) {
            // Do nothing, we already did it
        } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
            // Mark as close
            letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
            map[guessParts[i]]--;
        } else {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
        }
    }
    currentRow++;
    // win or loose? donknow why? BG color change to green after alert!!
    if (currentGuess === word) {
        //win
        console.log('win')
        alert('You win!')
        done = true;
        return;
    } else if (currentRow === ROUNDS) {
        alert(`You lose, the word was ${word}`);
        done = true;
    }
    currentGuess = '';
}

function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length -1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
}

function markInvalidWord() {
    alert('not a valid word!');
}

//getting key board value
    document.addEventListener('keydown', function handleKeyPress (event) {
        if (done || isLoading) {
            //do nothing
            return;
        }


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
