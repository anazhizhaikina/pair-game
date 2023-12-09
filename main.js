class Card {
  _pick = false;
  _match = false;

  constructor(number, action) {
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.textContent = number;
    this.number = number;
    let wrap = document.getElementById("wrap");
    wrap.append(this.card);

    this.card.addEventListener("click", () => {
      if (this.pick == false && this.match == false) {
        this.pick = true;
        action(this);
      }
    });
  }

  set pick(value) {
    this._pick = value;
    value
      ? this.card.classList.add("pick")
      : this.card.classList.remove("pick");
  }

  get pick() {
    return this._pick;
  }

  set match(value) {
    this._match = value;
    value
      ? this.card.classList.add("match")
      : this.card.classList.remove("match");
  }

  get match() {
    return this._match;
  }
}

function startGame(wrap, cardsCount) {
  let cards = [];
  let newArray = [];
  let cardOne = null;
  let cardTwo = null;

  for (let i = 1; i <= cardsCount; i++) {
    cards.push(i);
    cards.push(i);
  }

  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  console.log(cards);

  for (let cardNumber of cards) {
    newArray.push(new Card(cardNumber, flip));
  }

  function flip(card) {
    if (cardOne !== null && cardTwo !== null) {
      if (cardOne.number != cardTwo.number) {
        cardOne.pick = false;
        cardTwo.pick = false;
        cardOne = null;
        cardTwo = null;
      }
    }

    if (cardOne == null) {
      cardOne = card;
    } else {
      if (cardTwo == null) {
        cardTwo = card;
      }
    }

    if (cardOne !== null && cardTwo !== null) {
      if (cardOne.number == cardTwo.number) {
        cardOne.match = true;
        cardTwo.match = true;
        cardOne = null;
        cardTwo = null;
      }
    }

    let btn = document.createElement("button");

    if (document.querySelectorAll(".card.match").length == cards.length) {
      btn.textContent = "Сыграть ещё раз";
      btn.classList.add("btn");
      wrap.append(btn);
    }

    btn.addEventListener("click", () => {
      wrap.textContent = "";
      cards = [];
      newArray = [];
      cardOne = null;
      cardTwo = null;
      startGame(wrap, cardsCount);
    });
  }
}

startGame(wrap, 8);
