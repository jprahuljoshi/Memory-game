
let hasFlippedCard = false;
let firstCard, secondCard;
let isFirstCard = false;
let isBoardClosed = false;
let p1Turn = true;
var score1 = 0;
var score2 = 0;
let currentPlayer = 'player1';
let playerMsg = document.getElementById('messagesection');
playerMsg.innerHTML = currentPlayer;
const cards = document.querySelectorAll('.memory-card');
const timeValue = document.getElementById("time");
const moves = document.getElementById("movesCount");
let gameOverMsg = document.querySelector('#memoryID');

cards.forEach(card => card.addEventListener('click', flipCard))
shuffle();

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

// Create function to flip the card
function flipCard() {
  if (isBoardClosed) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!isFirstCard) {
    isFirstCard = true; //firstCard click
    firstCard = this; // 'this' = the element that has fired the event
    return
  }

  isFirstCard = false; //secondCard click
  secondCard = this;

  // if the secondCard card has been chosen, check if they match
  checkForMatch();
}

//   we have to check if those cards matched
function checkForMatch() {
  // using Ternary Operator to shorten the code
  let isMatch = firstCard.dataset.framework ===
    secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCard();
}
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  if (p1Turn) {
    score1 += 2;
  }
  else {
    score2 += 2;
  }
  checkGameOver();
  resetBoard();
}
function unflipCard() {
  isBoardClosed = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    isBoardClosed = false;
    resetBoard();
  }, 1500);
  if (p1Turn) {
    p1Turn = false;
  }
  else if (!p1Turn) {
    p1Turn = true;
  }
}
//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
function displayMovesCount() {
  document.getElementById("movesCount").innerHTML = `<span>Moves:</span>${movesCount}`;
}
function displayTimeCount() {
  document.getElementById("time").innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
} interval = setInterval(timeGenerator, 1000);
//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

function resetBoard() {
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
  isFirstCard = false;
  isBoardClosed = false;
  movesCount = 0;
}

function restartGame() {
  shuffle();
}

function checkGameOver() { // game is over if either player gets 28 points
  let flag = 0;
  cards.forEach(card => {
    if (card.className === 'memory-card') {
      // we have still cards unflipped , atleast 1
      flag = 1;
    }
  })
  // if all cards flipped
  if (flag === 0) {
    if (score1 < score2) {
      alert("CONGRATULATIONS PLAYER ONE! YOU WON!");
      shuffle();
      location.reload();
    }
    else if (score2 < score1) {
      alert("CONGRATULATIONS PLAYER TWO! YOU WON!");
      shuffle();
      location.reload();
    }
    else if (score1 === score2) {
      alert("CONGRATULATIONS PLAYER TWO! YOU WON!");
      shuffle();
      location.reload();
    }
  }
}