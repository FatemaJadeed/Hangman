const hangmanImage =  document.querySelector(".hangmanBox img")
const wordDisplay =  document.querySelector(".wordDisplay")
const guessesText =  document.querySelector(".guessesText b")
const keyboardDiv = document.querySelector(".keyboard")

let currentWord, wrongGuessCount = 0
const maxGuesses = 6

const getRandomWord = () =>  {
    const {word , hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    console.log(word)
    document.querySelector(".hintText b").innerText = hint
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("")
}


const initGame = (button, clickedLetter) => {
    // checking if clickedLetter is exist on the currentWord
    if (currentWord.includes(clickedLetter)) {
        //showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
       // console.log(clickedLetter, "is exist on the word")
    } else {
        // if clicked letter doesn't exist then update the wrongGuessCount and hangman img
        wrongGuessCount++
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
        //console.log(clickedLetter, "is not exist on the word")
    }

    button.disabled = true
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
   // console.log(clickedLetter)
}

// creating keyboard buttons and adding event listeners

for (let i =97; i <=  122; i++) {
    const button = document.createElement("button")
    button.innerHTML = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()

