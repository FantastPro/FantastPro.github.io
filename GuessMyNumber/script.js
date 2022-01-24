'use strict'

const getSecretNumber = () => Math.trunc(Math.random() * 20) + 1
const displayMessage = function (message) {
	return (document.querySelector('.message').textContent = message)
}

let secretNumber = getSecretNumber()
let score = 20
let highscore = 0
let guess = +document.querySelector('.guess').value // answer input

document.querySelector('.check').addEventListener('click', function () {
	guess = +document.querySelector('.guess').value
	// When there is no input
	if (!guess) {
		displayMessage('⛔ No number!')

		// When player wins
	} else if (guess === secretNumber) {
		document.querySelector('.number').textContent = secretNumber
		displayMessage('🥳 Correct Number!')
		document.querySelector('body').style.backgroundColor = '#60b347'
		document.querySelector('.number').style.width = '30rem'

		if (score > highscore) {
			highscore = score
			document.querySelector('.highscore').textContent = highscore
		}

		//When guess is wrong
	} else if (guess !== secretNumber) {
		if (score > 1) {
			displayMessage(
				guess > secretNumber ? '📈 Too high!' : '📉 Too low!'
			)
			score--
			document.querySelector('.score').textContent = score
		} else {
			displayMessage('💥 You lost the game!')
			document.querySelector('.score').textContent = 0
		}
	}
})

document.querySelector('.again').addEventListener('click', function () {
	score = 20
	getSecretNumber()
	document.querySelector('.score').textContent = score
	displayMessage('Start guessing...')
	document.querySelector('.guess').value = ''
	document.querySelector('body').style.backgroundColor = '#222'
	document.querySelector('.number').style.width = '15rem'
	document.querySelector('.number').textContent = '?'
})
