
// class Card {
//   constructor(suit, rank, value) {
//     this.suit = suit;
//     this.rank = rank;
//     this.value = value;
//   }
// }

// class Player {
//   constructor(name) {
//     this.name = name;
//     this.hand = [];
//   }
// }

// class Deck {
//   constructor() {
//     this.cards = [];
//     let suits = ['Heart', 'Club', 'Spades', 'Diamonds'];
//     let rank = {
//       2: '2',
//       3: '3',
//       4: '4',
//       5: '5',
//       6: '6',
//       7: '7',
//       8: '8',
//       9: '9',
//       10: '10',
//       Jack: '11',
//       Queen: '12',
//       King: '13',
//       Ace: '14'
//     };

//     for (let i = 0; i < suits.length; i++) {
//       for (let j in rank) {
//         this.cards.push(new Card(suits[i], j, rank[j]));
//       }
//     }
//   }

//   shuffle() {
//     for (let i = this.cards.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * i);
//       let temp = this.cards[i];
//       this.cards[i] = this.cards[j];
//       this.cards[j] = temp;
//     }
//   }

//   dealCards(player1, player2) {
//     this.shuffle();
//     while(this.cards.length > 0){
//       player1.hand.push(this.cards.pop());
//       player2.hand.push(this.cards.pop());
//     }
//   }
// }

// class Game {
//   constructor(player1, player2) {
//     this.player1 = player1;
//     this.player2 = player2;
//     this.deck = new Deck();
//     this.deck.dealCards(this.player1, this.player2);
//   }

//   startGame() {
//     while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
//       this.playRound();
//     }

//     if (this.player1.hand.length === 0) {
//       console.log(this.player2.name + " wins the game!");
//     } else {
//       console.log(this.player1.name + " wins the game!");
//     }
//   }

//   playRound() {
//     let card1 = this.player1.hand.shift();
//     let card2 = this.player2.hand.shift();

//     console.log(this.player1.name + " plays " + card1.rank + " of " + card1.suit);
//     console.log(this.player2.name + " plays " + card2.rank + " of " + card2.suit);

//     if (parseInt(card1.value) > parseInt(card2.value)) {
//       console.log(this.player1.name + " wins the round");
//       this.player1.hand.push(card1, card2);
//     } else if (parseInt(card1.value) < parseInt(card2.value)) {
//       console.log(this.player2.name + " wins the round");
//       this.player2.hand.push(card1, card2);
//     } else {
//       console.log("War!");
//       this.handleWar(card1, card2);
//     }
//   }

//   handleWar(card1, card2) {
//     let pile = [card1, card2];
  
//     while (true) {
//       if (this.player1.hand.length < 4) {
//         this.player2.hand.push(...pile, ...this.player1.hand);
//         this.player1.hand = [];
//         console.log(this.player2.name + " wins the war and the game!");
//         return;
//       } else if (this.player2.hand.length < 4) {
//         this.player1.hand.push(...pile, ...this.player2.hand);
//         this.player2.hand = [];
//         console.log(this.player1.name + " wins the war and the game!");
//         return;
//       }
  
//       for (let i = 0; i < 3; i++) {
//         pile.push(this.player1.hand.shift(), this.player2.hand.shift());
//       }
  
//       card1 = this.player1.hand.shift();
//       card2 = this.player2.hand.shift();
  
//       if (parseInt(card1.value) > parseInt(card2.value)) {
//         this.player1.hand.push(...pile, card1, card2);
//         break;
//       } else if (parseInt(card1.value) < parseInt(card2.value)) {
//         this.player2.hand.push(...pile, card1, card2);
//         break;
//       } else {
//         pile.push(card1, card2);
//         console.log("War continues!");
//       }
//     }
//   }
// }

// // Start a game
// let player1 = new Player("Alice");
// let player2 = new Player("Bob");
// let game = new Game(player1, player2);
// game.startGame();



class Card {
  constructor(suit, rank, score){
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

class Deck {
  constructor(){
    this.cards = []
    this.createDeck()
  }

  createDeck(){
    const suits = ["Heart", "Spade", "Club", "Diamond"]
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

    for (let i = 0; i < suits.length; i++){
      for (let j = 0; j < ranks.length; j++){
        let card = new Card(suits[i], ranks[j], j + 2)
        this.cards.push(card)
      }
    }

    this.shuffle()
  }

  shuffle(){
    const cards = this.cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Array Destructuring Method used for shuffle (ES6 Version)
      // [cards[i], cards[j]] = [cards[j], cards[i]];

      // Fisher-Yates shuffle method (Before ES6 update)
      let temp = cards[i]
      cards[i] = cards[j]
      cards[j] = temp
    }
  }
}

class GameOfWar {
  constructor() {
    this.p1 = [];
    this.p2 = [];
    this.pile = [];
    this.gameSetup()
  }

  gameSetup() {
    // const deck = new Deck()
    //deck.cards
    // original method to pull out as object
    const { cards } = new Deck() 
    //pulling out as array 

    // this.p1.push(cards.splice(0, 26))
    //this will make whole cards array as idex 0 so...
    this.p1.push(...cards.splice(0, 26))
    //use spread operator to make it as one array 
    this.p2.push(...cards)
  }

  playGame() {
    while (this.p1.length > 0 && this.p2.length) {
      let p1Card = this.p1.pop()
      let p2Card = this.p2.pop()

      if (p1Card.score === p2Card.score) {
        this.pile.push(p1Card, p2Card)
        this.war()
      } else if (p1Card.score > p2Card.score) {
        console.log("Player 1 wins the round!")
        this.p1.unshift(p2Card, p1Card, ...this.pile.splice(0))
      } else {
        console.log("Plyaer 2 wins the round!")
        this.p2.unshift(p1Card, p2Card, ...this.pile.splice(0))
      }
    }
    console.log(`Player 1 Hand: ${this.p1.length}; Player 2 Hand: ${this.p2.length}`)
  }

  war() {
    console.log("WAR!!!!!")
    if (this.p1.length < 4 || this.p2.length < 4) {
      if (this.p1.length < 4) {
        this.p2.push(...this.p1.splice(0), ...this.pile.splice(0))
      } else {
        this.p1.push(...this.p2.splice(0), ...this.pile.splice(0))
      }
    } else {
      let p1WarPile = this.p1.splice(-3, 3)
      let p2WarPile = this.p2.splice(-3, 3)
      this.pile.push(...p1WarPile, ...p2WarPile)
    }
  }
}

const game = new GameOfWar();
game.playGame();





