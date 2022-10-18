const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');


async function init() {


function addletter (letter) {

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

init();
