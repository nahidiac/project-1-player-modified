//Selecting elements
const diceResultDisplay = document.querySelector('.dice-result'); 
const winningScoreDisplay = document.querySelector('.winning-score'); 
const player1ScoreDisplay = document.querySelector('.player1-score');
const player2ScoreDisplay = document.querySelector('.player2-score');
const inputBox = document.querySelector('.input-box');
const player1Btn = document.querySelector('.player1-btn');
const player2Btn = document.querySelector('.player2-btn');
const resetBtn = document.querySelector('.reset-btn');

//Data
let winningScore = 10; 
let player1Score = 0;
let player2Score = 0;
let gameIsOver = false;
let diceResult; 

//Event Listeners & Functions


function resetGame() {
    player1Score = 0;
    player2Score = 0;
    gameIsOver = false;
    diceResultDisplay.textContent = '';
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
    player1Btn.removeAttribute('disabled');
    player2Btn.removeAttribute('disabled');
    player1Btn.classList.remove('btn-success');
    player2Btn.classList.remove('btn-success');
    player1Btn.classList.add('btn-primary');
    player2Btn.classList.add('btn-primary');
}; 

function disable (playerBtn) {
    playerBtn.setAttribute('disabled', 'disabled');
}

function enable (playerBtn) {
    playerBtn.removeAttribute('disabled');
}

function winnerCheck (playerScore, winningScore) {
    if(playerScore >= winningScore){
        gameIsOver = true; 
        player1Btn.setAttribute('disabled', 'disabled');
        player2Btn.setAttribute('disabled', 'disabled');
        
        if(playerScore === player1Score) {
            player1Btn.classList.remove('btn-primary');
            player1Btn.classList.add('btn-success');
        } else {
            player2Btn.classList.remove('btn-primary');
            player2Btn.classList.add('btn-success');
        }
    }
}

function throwDice() {
    return Math.floor((Math.random() * 6))+ 1; 
}

player1Btn.addEventListener('click', ()=>{
    if(!gameIsOver) {
        diceResult = throwDice();
        player1Score += diceResult;
        diceResultDisplay.textContent = diceResult;
        player1ScoreDisplay.textContent = player1Score;
        disable(player1Btn); 
        enable(player2Btn); 
        winnerCheck (player1Score, winningScore);
    }
}); 

player2Btn.addEventListener('click', ()=>{
    if(!gameIsOver) {
        diceResult = throwDice();
        player2Score += diceResult;
        diceResultDisplay.textContent = diceResult;
        player2ScoreDisplay.textContent = player2Score;
        disable(player2Btn); 
        enable(player1Btn); 
        winnerCheck (player2Score, winningScore);
    }
});

inputBox.addEventListener('change', ()=>{
    const value = Number.parseInt(inputBox.value);
    if(!Number.isNaN(value)) {
        winningScore = value; 
        winningScoreDisplay.textContent = winningScore;
    }
    inputBox.value = '';
    resetGame();
});


resetBtn.addEventListener('click', resetGame);