// Global Variables
const hangmanImage = document.querySelector(".hangmanBox img")
const wordDisplay = document.querySelector(".wordDisplay")
const guessesText = document.querySelector(".guessesText b")
const keyboardDiv = document.querySelector(".keyboard")
const gameModal = document.querySelector(".gameModal")
const playAgainBtn = document.querySelector(".playAgain")
const timerDisplay = document.querySelector("#timerDisplay")

let currentWord, correctLetters, wrongGuessCount
const maxGuesses = 6
let guessTimeOut
let remainingTime
const guessTimeLimit = 20
let guessedLetters = []
let skipWrongGuess = false

// Functions

const resetGame = () => {
    // Resetting all game variables 
    correctLetters = []
    wrongGuessCount = 0
    guessedLetters = []
    skipWrongGuess = false
    hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    gameModal.classList.remove("show")
    startGameTimer()
}

const startGameTimer = () => {
    // Timer for game
    remainingTime = guessTimeLimit
    timerDisplay.innerText = remainingTime

    clearInterval(guessTimeOut)
    guessTimeOut = setInterval(() => {
        remainingTime--
        timerDisplay.innerText = remainingTime;

        if (remainingTime === 0) {
            if (!skipWrongGuess) {
                wrongGuessCount++
                hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
                guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`

                if (wrongGuessCount === maxGuesses) {
                    clearInterval(guessTimeOut)
                    return gameOver(false)
                }
            }

            startGameTimer()
        }
    }, 1000)
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    // Hide word from console
    //console.log(word)
    document.querySelector(".hintText b").innerText = hint
    resetGame()
}

const gameOver = (isVictory) => {
    // Showing modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`
        gameModal.querySelector("img").src = `img/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show");

        clearInterval(guessTimeOut)
    }, 300)
}

const triggerRandomEvent = () => {
    const events = ['restore_attempt', 'reveal_letter']
    const randomEvent = events[Math.floor(Math.random() * events.length)]

    switch (randomEvent) {
        case 'restore_attempt':
            if (wrongGuessCount > 0) {
                wrongGuessCount--
                hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
                guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
                alert('🎉 Surprise! Luck decided to be on your side and gave you a lost attempt back!')
            }
            break

        case 'reveal_letter':
            // Reveal a random letter from the word
            const unrevealedIndices = [...currentWord].map((letter, index) => {
                return (!correctLetters.includes(letter) && !guessedLetters.includes(letter)) ? index : null
            }).filter(index => index !== null)

            if (unrevealedIndices.length > 0) {
                const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)]
                const letterToReveal = currentWord[randomIndex]

                // Reveal the letter
                correctLetters.push(letterToReveal)
                wordDisplay.querySelectorAll("li")[randomIndex].innerText = letterToReveal
                wordDisplay.querySelectorAll("li")[randomIndex].classList.add("guessed")

                alert(`🕵️‍♂️ A random letter has been revealed! It looks like the in-game spy decided to give you a hand! "${letterToReveal}"`)
            }
            break

        default:
            break
    }
};

const initGame = (button, clickedLetter) => {
    if (guessedLetters.includes(clickedLetter)) {
        // If the letter has been guessed before
        return
    }

    guessedLetters.push(clickedLetter)

    if (currentWord.includes(clickedLetter)) {
        // Show all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
        if (!skipWrongGuess) {
            wrongGuessCount++
            hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`
            guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
        }

        if (Math.random() < 0.2) {
            triggerRandomEvent()
        }

        if (wrongGuessCount === maxGuesses) return gameOver(false)
    }

    button.disabled = true

    if (correctLetters.length === currentWord.length) return gameOver(true)

    startGameTimer()
};

// Event Listeners

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerHTML = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)
