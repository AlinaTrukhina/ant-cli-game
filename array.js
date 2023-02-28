let arr1 = [' hearts', ' diamonds', ' spades', ' clubs'];
let arr2 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];

const denseKeys = [...arr2.keys()];
let newarr = arr2.map((x) => arr1.map(y => ({card: x + y})));

for (let i = 0; i < 10; i++) {
    // newarr[i] = { card: newarr[i].card, value: Number(denseKeys[i] + 1)}
    for (let j = 0; j < newarr[i].length; j++){
        newarr[i][j] = { card: newarr[i][j].card, value: Number(denseKeys[i] + 1)}
    }

}
for (let i = 9; i < 13; i++) {
    
    for (let j = 0; j < newarr[i].length; j++){
        newarr[i][j] = { card: newarr[i][j].card, value: Number(10)}
    }
}
newarr[13] = {card: 'ace', value: Number(11)}


let finalArr = [];
for (let i = 0; i < newarr.length; i++){
    finalArr = finalArr.concat(newarr[i]);
}


// console.log(finalArr);

function blackjackGame() {
    let cards = [
        { card: 'one hearts', value: 1 },
        { card: 'one diamonds', value: 1 },
        { card: 'one spades', value: 1 },
        { card: 'one clubs', value: 1 },
        { card: 'two hearts', value: 2 },
        { card: 'two diamonds', value: 2 },
        { card: 'two spades', value: 2 },
        { card: 'two clubs', value: 2 },
        { card: 'three hearts', value: 3 },
        { card: 'three diamonds', value: 3 },
        { card: 'three spades', value: 3 },
        { card: 'three clubs', value: 3 },
        { card: 'four hearts', value: 4 },
        { card: 'four diamonds', value: 4 },
        { card: 'four spades', value: 4 },
        { card: 'four clubs', value: 4 },
        { card: 'five hearts', value: 5 },
        { card: 'five diamonds', value: 5 },
        { card: 'five spades', value: 5 },
        { card: 'five clubs', value: 5 },
        { card: 'six hearts', value: 6 },
        { card: 'six diamonds', value: 6 },
        { card: 'six spades', value: 6 },
        { card: 'six clubs', value: 6 },
        { card: 'seven hearts', value: 7 },
        { card: 'seven diamonds', value: 7 },
        { card: 'seven spades', value: 7 },
        { card: 'seven clubs', value: 7 },
        { card: 'eight hearts', value: 8 },
        { card: 'eight diamonds', value: 8 },
        { card: 'eight spades', value: 8 },
        { card: 'eight clubs', value: 8 },
        { card: 'nine hearts', value: 9 },
        { card: 'nine diamonds', value: 9 },
        { card: 'nine spades', value: 9 },
        { card: 'nine clubs', value: 9 },
        { card: 'ten hearts', value: 10 },
        { card: 'ten diamonds', value: 10 },
        { card: 'ten spades', value: 10 },
        { card: 'ten clubs', value: 10 },
        { card: 'jack hearts', value: 10 },
        { card: 'jack diamonds', value: 10 },
        { card: 'jack spades', value: 10 },
        { card: 'jack clubs', value: 10 },
        { card: 'queen hearts', value: 10 },
        { card: 'queen diamonds', value: 10 },
        { card: 'queen spades', value: 10 },
        { card: 'queen clubs', value: 10 },
        { card: 'king hearts', value: 10 },
        { card: 'king diamonds', value: 10 },
        { card: 'king spades', value: 10 },
        { card: 'king clubs', value: 10 },
        { card: 'ace', value: 11 }
    ];
    
    let playerCards;
    let dealerCards;
    
    let playerPoints = 0;
    let dealerPoints = 0;
    
    // game starts
    
    // you are dealt 2 cards face up - show total
    // dealer is dealt 1 card face up and 1 card face down - show total on face up card
    
    // fn checkScores()
    // if you have < 21 : ask if want to hit or stay
    // if you have > 21 : you lose; ask if you want to play again
    // if you have 21 : reveal dealer's cards, if he has 21 as well, it's a draw. otherwise, you win
    
    // after every turn, call fn checkScores()
    
    // get random card helper function
    function getCard() {
        const cardIndex = Math.floor(Math.random() * cards.length);
        const newCard = cards[cardIndex];
        cards.splice(cardIndex, 1);
        return newCard;
    }
    getCard()
    
    

    // async function dealBlackjack() {
    //     playerCards = getCard();
    // }
    
    
}

let playerCards = [];
let dealerCards = [];


function getCard(who) {
    const cardIndex = Math.floor(Math.random() * finalArr.length);
    const newCard = finalArr[cardIndex];
    finalArr.splice(cardIndex, 1);
    who.push(newCard);
    return who;
}

getCard(playerCards)
console.log(getCard(playerCards))
let playerPoints = playerCards.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value, 0,)
let dealerPoints = playerCards.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value, 0,)

console.log(finalArr.length)

getCard(dealerCards)
console.log(playerCards, playerPoints)
console.log(getCard(dealerCards), dealerPoints)

function checkScores() {

    if (playerPoints == 21 && dealerPoints == 21) {
        return 'draw';
    } else if (dealerPoints > 21 ) {
        return 'you win';
    } else if (playerPoints == 21 && dealerPoints < 21) {
        return 'dealer draws';
    } else if (playerPoints < 21 && dealerPoints < 21) {
        return 'hit or stay?';
    } else if (playerPoints < 21 && dealerPoints == 21) {
        return 'the house wins';
    } else {
        return 'the house wins';
    }

    // switch (true) {
    //     case playerPoints == 21 && dealerPoints == 21:
    //         'draw'
    //         break;
    //     case dealerPoints > 21:
    //         'you win'
    //         break;
    //     case playerPoints == 21 && dealerPoints < 21:
    //         'dealer draws'
    //         break;
    //     case playerPoints < 21 && dealerPoints < 21:
    //         'hit or stay?'
    //         break;
    //     case playerPoints < 21 && dealerPoints == 21:
    //         'the house wins'
    //         break;  
    //     case playerPoints > 21:
    //         'the house wins'
    //         break;     
    //     default:
    //         'idk how we got here'
    //         break;
    // }
}

console.log(checkScores())