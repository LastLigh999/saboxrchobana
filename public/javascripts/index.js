console.log(window.word);

const gameContainer = document.querySelector("#game");
const wordHtml = gameContainer.querySelector("#word");
const gameTips = gameContainer.querySelector("#tips");
const inputForm = gameContainer.querySelector("#gameInput");
const usedLettersDom = gameContainer.querySelector("#usedLetters");

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

class HangedMan {
	constructor(word, tipsDisplay, wordDisplay, usedLettersDisplay) {
		this.word = word.originalword.trim();
		this.wordArr = this.word.toLowerCase().split("");
		this.guessedLetters = new Array(this.wordArr.length).fill("_");
		this.usedLetters = [];
		this.tips = word.tips;
		this.tiporder = shuffleArray(
			Array.from({ length: this.tips.length }, (_, i) => i)
		);
		this.mistakeCount = 0;
		this.tipsDisplay = tipsDisplay;
		this.wordDisplay = wordDisplay;
		this.usedLettersDisplay = usedLettersDisplay;
		this.removeSpaces();
		this.displayTips();
	}

	displayGuessedLetters() {
		this.wordDisplay.innerHTML = this.guessedLetters.join(" ");
	}

	displayTips() {
		for (let i = 0; i < this.tiporder.length; i++) {
			let tip = document.createElement("div");
			console.log("tips");
			tip.innerHTML = this.tips[this.tiporder[i]];
			this.tipsDisplay.appendChild(tip);
		}
	}
	updateUsedLetters() {
		this.usedLettersDisplay.innerHTML = this.usedLetters.join(" ");
	}
	removeSpaces() {
		if (this.wordArr.includes(" ")) {
			for (let i = 0; i < this.wordArr.length; i++) {
				if (this.wordArr[i] == " ") {
					this.guessedLetters[i] = "&nbsp;";
				}
			}
		}
		this.displayGuessedLetters();
	}
	guessTheLetter(letter) {
		letter = letter.toLowerCase();
		if (this.usedLetters.includes(letter)) {
			console.log("letter already has been used");
			return;
		}
		if (this.wordArr.includes(letter)) {
			for (let i = 0; i < this.wordArr.length; i++) {
				if (this.wordArr[i] == letter) {
					this.guessedLetters[i] = this.wordArr[i];
				}
			}
			this.displayGuessedLetters();
		} else {
			this.mistakeCount++;
			if (this.mistakeCount > 6) {
				console.log("loop");
				for (let i = 0; i < this.wordArr.length; i++) {
					this.guessedLetters[i] = this.wordArr[i];
				}
			}
			this.displayGuessedLetters();
		}
		this.usedLetters.push(letter);
		this.updateUsedLetters();
		console.log(this.usedLetters);
	}
}

const game = new HangedMan(window.word, gameTips, wordHtml, usedLettersDom);
/* const test = gameContainer.querySelector("#testingstuff"); */

inputForm.addEventListener("submit", (e) => {
	e.preventDefault();
	game.guessTheLetter(e.target.letter.value);
	e.target.letter.value = "";
});

console.log(game);

console.log(gameTips);
