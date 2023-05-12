"use strict"

//Variable declaration.
let currentScore = 0;
let playerScore = [0, 0, 0];
let totalWins = [0, 0, 0];
let playerName1;
let playerName2;
let activePlayer = 1;
let stillPlaying = true;

/*
FUNCTION
DECLARATIONS
*/

//Modal closing function. 
const closeModal = function () {
    document.querySelector(".new-game-modal-window").classList.add("hid-me");
    document.querySelector(".game-rules-modal-window").classList.add("hid-me");
    document.querySelector(".overlay").classList.add("hid-me");
};

//Player switch function.
const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`.currentScore--${activePlayer}>h2`).textContent = 0;
    activePlayer = activePlayer === 1 ? 2 : 1;
    document.querySelector(".player-1").classList.toggle("background-switch");
    document.querySelector(".player-2").classList.toggle("background-switch");
};

//Removing winning player theme for next play.
const winningThemeRemoval = function () {
    document.querySelector(`.player-${activePlayer}`).classList.remove("winner-background");
    document.querySelector(`h1.playerScore--${activePlayer}`).classList.remove("winner-text");
    document.querySelector(`.winner-${activePlayer}>h6`).classList.add("hid-me");
};

//Users name input.
const nameCollection = function () {
    playerName1 = document.querySelectorAll("input")[0].value;
    playerName2 = document.querySelectorAll("input")[1].value;
    if (playerName1 !== "" && playerName2 !== "") {
        playerName1 = playerName1.slice(0, 1).toUpperCase() + playerName1.slice(-(playerName1.length - 1)).toLowerCase();
        playerName2 = playerName2.slice(0, 1).toUpperCase() + playerName2.slice(-(playerName2.length - 1)).toLowerCase();
    } else {
        playerName1 = "Player One";
        playerName2 = "Player Two";
    }
};

//Game reset and continuous game play function.
const playAgain = function () {
    winningThemeRemoval();
    activePlayer = 1;
    currentScore = 0;
    document.querySelector(".player-1").classList.add("background-switch");
    document.querySelector(".player-2").classList.remove("background-switch");
    document.querySelector(`.currentScore--1>h2`).textContent = 0;
    document.querySelector(`.currentScore--2>h2`).textContent = 0;
    document.querySelector(`h1.playerScore--1`).textContent = 0;
    document.querySelector(`h1.playerScore--2`).textContent = 0;
    document.querySelector("img").src = `Assets/images/dice6.png`;
    playerScore = [0, 0, 0];
    stillPlaying = true;
};

//Getting the dice number and assigning it to the current scores.
document.querySelector(".dice-throw").addEventListener("click", function () {
    if (stillPlaying) {
        //Random dice number 1-6
        let randomDiceNumber = Math.floor(Math.random() * 6) + 1;
        currentScore += randomDiceNumber;

        //Random dice image 1-6
        document.querySelector("img").src = `Assets/images/dice${randomDiceNumber}.png`
        if (randomDiceNumber !== 1) {
            document.querySelector(`.currentScore--${activePlayer}>h2`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

//Storing the player's scores and checking for a winner.
document.querySelector(".hold-score").addEventListener("click", function () {

    playerScore[activePlayer] += currentScore;
    document.querySelector(`h1.playerScore--${activePlayer}`).textContent = playerScore[activePlayer];

    if (stillPlaying && playerScore[activePlayer] >= 100) {
        nameCollection();
        totalWins[activePlayer] += 1;
        document.querySelector(`.player-${activePlayer}-total-wins>h2`).textContent = totalWins[activePlayer];
        document.querySelector(`.player-${activePlayer}`).classList.add("winner-background");
        document.querySelector(`h1.playerScore--${activePlayer}`).classList.add("winner-text");

        if (activePlayer === 1) {
            document.querySelector(`.winner-${activePlayer}>h6`).textContent = `🥂 ${playerName1} Wins!! 🍾`;
            document.querySelector(`.winner-${activePlayer}>h6`).classList.remove("hid-me");

        } else if (activePlayer === 2) {
            document.querySelector(`.winner-${activePlayer}>h6`).textContent = `🥂 ${playerName2} Wins!! 🍾`;
            document.querySelector(`.winner-${activePlayer}>h6`).classList.remove("hid-me");
        }

        stillPlaying = false;

    } else {
        switchPlayer();
    }
});

//Repeated play with the current players.
document.querySelector(".play-again").addEventListener("click", playAgain);

//Starting OR restarting a new game.
document.querySelector(".new-game").addEventListener("click", function () {
    document.querySelector(".new-game-modal-window").classList.remove("hid-me");
    document.querySelector(".overlay").classList.remove("hid-me");
});

//Accessing the game rules.
document.querySelector(".game-rules").addEventListener("click", function () {
    document.querySelector(".game-rules-modal-window").classList.remove("hid-me");
    document.querySelector(".overlay").classList.remove("hid-me");
});

//new game modal closed with button.
document.querySelector(".new-close-btn").addEventListener("click", closeModal);

//game rules modal closed with button
document.querySelector(".rules-close-btn").addEventListener("click", closeModal);

//Modal closed with escape key.
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !document.querySelector(".new-game-modal-window").classList.contains("hid-me")) {
        closeModal();
    } else if (e.key === "Escape" && !document.querySelector(".game-rules-modal-window").classList.contains("hid-me")) {
        closeModal();
    }
});

//Modal closed by clicking outside of modal.
document.querySelector(".overlay").addEventListener("click", closeModal);

//Getting the players name with the submit button and starting a new game.
document.querySelector(".submit-btn").addEventListener("click", function () {
    totalWins = [0, 0, 0];
    document.querySelector(`.player-1-total-wins>h2`).textContent = 0;
    document.querySelector(`.player-2-total-wins>h2`).textContent = 0;
    nameCollection();
    playAgain();
    closeModal();
});

//Getting the player names with keyboard "Enter" button and starting a new game.
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !document.querySelector(".new-game-modal-window").classList.contains("hid-me")) {
        totalWins = [0, 0, 0];
        document.querySelector(`.player-1-total-wins>h2`).textContent = 0;
        document.querySelector(`.player-2-total-wins>h2`).textContent = 0;
        nameCollection();
        playAgain();
        closeModal();
    } else if (e.key === "Enter" && !document.querySelector(".game-rules-modal-window").classList.contains("hid-me")) {
        closeModal();
    }
});

