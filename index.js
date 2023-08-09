let resultElem = document.getElementById("js-result");
let movesElem = document.getElementById("js-moves");
let scoreElem = document.getElementById("js-score");

let buttonRock = document.getElementById("js-rock");
let buttonPaper = document.getElementById("js-paper");
let buttonScissors = document.getElementById("js-scissors");
let buttonReset = document.getElementById("js-reset");

let computerSelection, computerRandom, _playerSelection, playerWinStatus, scores;


//Getting previous scores if possible
if (localStorage.getItem("scores") === null) {
	scores = {
		win: 0,
		lose: 0,
		draw: 0,
	};
} else {
	scores = JSON.parse(localStorage.getItem("scores"));
}

displayScore();

//Adding event listeners
buttonRock.addEventListener("click", selectType.bind("null", "rock"));
buttonPaper.addEventListener("click", selectType.bind("null", "paper"));
buttonScissors.addEventListener("click", selectType.bind("null", "scissors"));

buttonReset.addEventListener("click", resetScores.bind());

function selectType(type) {
	//Calculating computer move
	computerSelection = calculateComputerMove();

	//Calculating who is winning


	calculateWinner(type);
	_playerSelection = type;


	//Saving to local store
	localStorage.setItem("scores", JSON.stringify(scores));

	//Display
	displayResult();
	displayMoves();
	displayScore();
}

function resetScores() {
	scores.win = 0;
	scores.lose = 0;
	scores.draw = 0;

	localStorage.clear();

	displayScore();
	resultElem.innerText = '';
	movesElem.innerText = '';
}

function displayResult() {
	resultElem.innerText = `You ${playerWinStatus}.`;
	if (playerWinStatus === 'win') {
		resultElem.style.color = 'green';
		return;
	}
	if (playerWinStatus === 'lose') {
		resultElem.style.color = 'red';
		return
	}
	resultElem.style.color = 'yellow'; //draw

}

function displayMoves() {
	movesElem.innerText = `You picked ${_playerSelection}, computer picked ${computerSelection}.`;
}

function displayScore() {
	scoreElem.innerText = `Win:${scores.win}  Draw:${scores.draw}, Lose:${scores.lose}`;
}

function calculateComputerMove() {
	computerRandom = Math.random();
	if (computerRandom < 0.3)
		return "rock";

	if (computerRandom < 0.6)
		return "paper";

	return "scissors";
}

function calculateWinner(playerSelection) {
	switch (computerSelection) {
		case "rock": {
			if (playerSelection === "rock") {
				playerWinStatus = "draw";
				scores.draw++;
				break;
			} else if (playerSelection === "scissors") {
				playerWinStatus = "lose";
				scores.lose++;
				break;
			} else {
				playerWinStatus = "win";
				scores.win++;
				break;
			}
		}

		case "paper": {
			if (playerSelection === "rock") {
				playerWinStatus = "lose";
				scores.lose++;
				break;
			} else if (playerSelection === "scissors") {
				playerWinStatus = "win";
				scores.win++;
				break;
			} else {
				playerWinStatus = "draw";
				scores.draw++;
				break;
			}
		}

		case "scissors": {
			if (playerSelection === "rock") {
				playerWinStatus = "win";
				scores.win++;
				break;
			} else if (playerSelection === "scissors") {
				playerWinStatus = "draw";
				scores.draw++;
				break;
			} else {
				playerWinStatus = "lose";
				scores.lose++;
				break;
			}
		}
	}
}