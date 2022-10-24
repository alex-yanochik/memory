const gameContainer = document.getElementById("game");
let cardFlipCount = 0;
let lockBoard = false;
let card1 = null;
let card2 = null;
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  if (lockBoard) return;
  if (event.target.classList.contains("flip")) return;

  let flippedCard = event.target;
  flippedCard.style.backgroundColor = flippedCard.classList[0];

  if (!card1 || !card2) {
    flippedCard.classList.add("flip");
    card1 = card1 || flippedCard;
    card2 = flippedCard === card1 ? null : flippedCard;
  }

  if (card1 && card2) {
    lockBoard = true;
    let check1 = card1.className;
    let check2 = card2.className;

    if (check1 === check2){
      cardFlipCount += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      lockBoard = false;
      setScore(score + 1);
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        lockBoard = false;
        card1 = null;
        card2 = null;
      }, 1500)
    }
  }

  if (cardFlipCount === COLORS.length) alert("game over!");

}


createDivsForColors(shuffledColors);

document.querySelector('.restart').addEventListener('click', function(){
  window.location.reload();
  return false;
});

function setScore(currentScore) {
  score = currentScore;
  document.getElementById("score").innerText = `Pairs:  ${score}`;
}

