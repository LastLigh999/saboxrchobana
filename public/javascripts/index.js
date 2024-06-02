console.log(window.word);

const gameContainer = document.querySelector("#game");
const wordHtml = gameContainer.querySelector("#word");
const gameTips = gameContainer.querySelector("#tips");
//const inputForm = gameContainer.querySelector("#gameInput");
const usedLettersDom = gameContainer.querySelector("#usedLetters");

/* let audiotest = new Audio("../audio/winaudio.m4a");
console.log(audiotest);
document.addEventListener("click", (e) => {
	audiotest.play();
});
 */
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
		this.toWinLettersLeft = this.wordArr.length;
		this.tipsDisplay = tipsDisplay;
		this.wordDisplay = wordDisplay;
		this.usedLettersDisplay = usedLettersDisplay;
		this.winAudio = new Audio("../audio/winaudio.m4a");
		this.loseAudio = new Audio("../audio/loseaudio2.m4a");
		this.removeSpaces();
	}

	displayGuessedLetters() {
		this.wordDisplay.innerHTML = this.guessedLetters.join(" ");
	}

	displayTips(loopCount) {
		for (let i = 0; i < loopCount; i++) {
			let tip = document.createElement("div");
			console.log("tips");
			tip.innerHTML = this.tips[this.tiporder[0]];
			this.tiporder.shift();
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
					this.toWinLettersLeft--;
				}
			}
		}
		this.displayTips(3);
		this.displayGuessedLetters();
	}
	guessTheLetter(letter) {
		/* 
		this.winAudio.play(); */
		letter = letter.toLowerCase();
		if (this.usedLetters.includes(letter)) {
			console.log("letter already has been used");
			return;
		}
		if (this.wordArr.includes(letter)) {
			for (let i = 0; i < this.wordArr.length; i++) {
				if (this.wordArr[i] == letter) {
					this.guessedLetters[i] = this.wordArr[i];
					this.toWinLettersLeft--;
					if (this.toWinLettersLeft <= 0) {
						this.winTheGame();
					}
				}
			}
			this.displayGuessedLetters();
		} else {
			this.mistakeCount++;
			if (this.mistakeCount == 3) {
				this.displayTips(1);
			}
			if (this.mistakeCount == 6) {
				this.displayTips(1);
			}
			if (this.mistakeCount > 6) {
				for (let i = 0; i < this.wordArr.length; i++) {
					this.guessedLetters[i] = this.wordArr[i];
				}
				this.losetheGame();
			}
			this.displayGuessedLetters();
		}
		this.usedLetters.push(letter);
		this.updateUsedLetters();
	}
	losetheGame() {
		this.loseAudio.play();
		setTimeout(() => {
			location.reload();
		}, 10000);
	}
	winTheGame() {
		this.winAudio.play();
		setTimeout(() => {
			location.reload();
		}, 5000);
	}
}

const game = new HangedMan(window.word, gameTips, wordHtml, usedLettersDom);
/* const test = gameContainer.querySelector("#testingstuff"); */

/* inputForm.addEventListener("submit", (e) => {
	e.preventDefault();
	game.guessTheLetter(e.target.letter.value);
	e.target.letter.value = "";
}); */

const input = gameContainer.querySelectorAll(".characterRow");
for (let element of input) {
	for (let ele of element.children) {
		ele.dataset.used = 0;
		ele.dataset.letter = ele.innerHTML;
		ele.addEventListener("click", (e) => {
			if (e.target.dataset.used == 0) {
				e.target.dataset.used = 1;
				e.target.innerHTML = "&nbsp;";
				game.guessTheLetter(e.target.dataset.letter);
			}
		});
	}
}
