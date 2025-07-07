let deckId = "";
const cardsContainer = document.querySelector(".imgContainer");

const newDeckBtn = document.querySelector(".newDeck");
const drawBtn = document.querySelector("#draw-cards");

const winnerString = document.querySelector("h2");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
      .then(res => res.json())
      .then(data => {
          console.log(data)
          deckId = data.deck_id
      })

      document.querySelector("#draw-cards").disabled = false;
}

newDeckBtn.addEventListener("click", handleClick)

drawBtn.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
      .then(res => res.json())
      .then(data => {
          //<img src=${data.cards[0].image} class="card"/>
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
          
      })
})

function highestScore(card1, card2){
  const valueArr = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']
  const card1Value = valueArr.indexOf(card1);
  const card2Value = valueArr.indexOf(card2);

  if (card1Value > card2Value) {
    return "Card 1 won"
  }else if (card1Value < card2Value) {
    return "Card 2 won"
  }else{
    return "War"
  }
}
