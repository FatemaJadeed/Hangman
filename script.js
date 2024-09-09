document.addEventListener('DOMContentLoaded' , () => {
    const words = ['hangman' , 'rabbit' , 'strawberry' , 'coffee' , 'switzerland' , 'mercedes' ,
       'puzzle' , 'sunshine' , 'california' , 'freedom' , 'elephant' , 'rainbow' , 'Guitar' ]
    
       let selectedWord = ''
       let gussedLetters = []
       let incorrectGuesses = 6



       const wordDisplay = document.querySelector('.wordDisplay')
       const gussesText = document.querySelector('.guessesText b')
       const gameModal = document.querySelector('.gameModal')
       const playAgainButton = document.querySelector('playAgain')
       const keyboard = document.querySelector('.keyboard')
       const hangmanImage = document.querySelector('.hangmanBox img')


// Setup keyboard
       const setupKeyboard = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'
        keyboard.innerHTML = ''
        alphabet.split('').forEach(letter => {
            const button = document.createElement('button')
            button.textContent = letter
            button.addEventListener('click' , () => handleGuess(letter))
            keyboard.appendChild(button)

        })
       }



// Choose random word
       const chooseRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length)
        selectedWord = words[randomIndex]
        updateWordDisplay()
       }


// Update word display

       const updateWordDisplay = () => {
        wordDisplay.innerHTML = ''
        selectedWord.split('').forEach(letter => {

        })
       }





})
