let deckId = "";
const cardsContainer = document.querySelector(".imgContainer");

const newDeckBtn = document.querySelector(".newDeck");
const drawBtn = document.querySelector("#draw-cards");

const winnerString = document.querySelector("h2");
const cardRemaining = document.querySelector("#card-remaining")

const human = document.querySelector("#human");
const computer = document.querySelector("#computer");

let humanScore = 0;
let computerScore = 0;

async function handleClick() {
  const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
  const data = await response.json()
    cardRemaining.textContent = `Remaining Cards: ${data.remaining}`
    console.log(data)
    deckId = data.deck_id
    document.querySelector("#draw-cards").disabled = false;
}

newDeckBtn.addEventListener("click", handleClick)

drawBtn.addEventListener("click", async () => {
  const response = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
  const data = await response.json()
          console.log(data);
          cardRemaining.innerHTML = 
          `
            Remaining Cards: ${data.remaining}
          ` 
          cardsContainer.children[0].innerHTML = 
          `
            <img src=${data.cards[0].image} class="card"/>
          `
          cardsContainer.children[1].innerHTML = 
          `
            <img src=${data.cards[1].image} class="card"/>
          `
          console.log(data);

          const winner = highestScore(data.cards[0].value, data.cards[1].value);
          winnerString.textContent = winner
          
          if (data.remaining === 0) {
            if (humanScore > computerScore) {
              winnerString.textContent = `Human won with ${humanScore} points!`
            }else{
              winnerString.textContent = `Computer won with ${computerScore} points!`
            }
            drawBtn.disabled = true;
          }
})

function highestScore(card1, card2){
  const valueArr = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
  const card1Value = valueArr.indexOf(card1);
  const card2Value = valueArr.indexOf(card2);

  if (card1Value > card2Value) {
    computerScore++;
    computer.textContent = `Computer points: ${computerScore}`
    return "Computer win"
  }else if (card1Value < card2Value) {
    humanScore++;
    human.textContent = `Human points: ${humanScore}`
    return "You win!"
  }else{
    return "War"
  }
}
