const hangmanImage =  document.querySelector(".hangmanBox img")
const wordDisplay =  document.querySelector(".wordDisplay")
const guessesText =  document.querySelector(".guessesText b")
const keyboardDiv = document.querySelector(".keyboard")
const gameModal = document.querySelector(".gameModal")
const playAgainBtn = document.querySelector(".playAgain")
const timerDisplay = document.querySelector("#timerDisplay")

//console.log(playAgainBtn)


let currentWord, correctLetters, wrongGuessCount
const maxGuesses = 6
let guessTimeOut
let remainingTime
const guessTimeLimit = 10



const resetGame = () => {
    // ressetting all game variables and UI elements//
    correctLetters = []
    wrongGuessCount = 0
    hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    gameModal.classList.remove("show")
    startGameTimer()
}


const startGameTimer = () => {
//timer for game
remainingTime = guessTimeLimit
timerDisplay.innerText = remainingTime

    clearInterval(guessTimeOut)
    guessTimeOut =setInterval(() => {
        remainingTime--
        timerDisplay.innerText = remainingTime

        if (remainingTime === 0) {
        wrongGuessCount++
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`

        if (wrongGuessCount === maxGuesses) {
            clearInterval(guessTimeOut)
            return gameOver(false)
        }

        startGameTimer()
    }

   }, 1000)
}


const getRandomWord = () =>  {
    const {word , hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    //Hide word from console//
    //console.log(word)
    document.querySelector(".hintText b").innerText = hint
    resetGame()
}


const gameOver = (isVictory) => {
    //showing modal with relevant details//
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`
        gameModal.querySelector("img").src = `img/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show")

        clearInterval(guessTimeOut)

    }, 300)
}


const initGame = (button, clickedLetter) => {
    // checking if clickedLetter is exist on the currentWord//
    if (currentWord.includes(clickedLetter)) {
        //showing all correct letters on the word display//
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
       // console.log(clickedLetter, "is exist on the word")//
    } else {
        // if clicked letter doesn't exist then update the wrongGuessCount and hangman img//
        wrongGuessCount++
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
        //console.log(clickedLetter, "is not exist on the word")
    }

    button.disabled = true
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`


    //calling gameOver function if any of these condition meets//
    if(wrongGuessCount === maxGuesses) return gameOver(false)
    if(correctLetters.length === currentWord.length) return gameOver(true)

        startGameTimer()

   // console.log(clickedLetter)
}

// creating keyboard buttons and adding event listeners//

for (let i =97; i <=  122; i++) {
    const button = document.createElement("button")
    button.innerHTML = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener("click" , getRandomWord)

