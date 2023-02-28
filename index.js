#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let playerName;
let target;

const COLORS_ARRAY = ['black', 'brown' ,'gold', 'gray', 'green', 'magenta', 'orange', 'red', 'white', 'yellow', 'blue'];

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

// javaScript supports top-level await, no need to say 'async' before this!
await welcome();
// await askName();
await question1();
// await questionPalindrome();

async function welcome() {
    const karaokeTitle = chalkAnimation.neon('Welcome, player!');

    await sleep();
    karaokeTitle.stop();
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Please enter your name',
            default(){
                return 'Player';
            }
    });
    
    playerName = answers.player_name;
}

async function question1() {
    const gameChoice = await inquirer.prompt({
        name: 'question1',
        type: 'list',
        message: 'choose what to play',
        choices: [
            'check for palindrome',
            'guess the secret color',
            'blackjack'
        ],
    });
    return handleChoice(gameChoice.question1);
}

async function handleChoice(game) {
    if (game == 'check for palindrome') {
        await questionPalindrome();
    } else if (game == 'guess the secret color') {
        await colorGame();
    } else if (game == 'blackjack') {
        await blackjackGame();
    }
}

async function questionPalindrome() {
    const answers = await inquirer.prompt({
        name: 'palindrome_question',
        type: 'input',
        message: `I can check if a word is a palindrome!
    Enter your word:`
    });

    const palindromeQ = answers.palindrome_question;
    return handleAnswer(palindrome(palindromeQ), palindromeQ);
}

async function handleAnswer(isCorrect, palindromeQ) {
    const spinner = createSpinner('Checking...').start();
    await sleep();

    if (isCorrect.isYes) {
        spinner.success({ text: 'Yes!'});
        console.log(gradient.rainbow(figlet.textSync(palindromeQ, {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        })));
        console.log('');
        await askPlayAgain('palindrome');
    } else {
        spinner.error({ text: 'No'});
        console.log('');
        console.log(gradient.passion(figlet.textSync(palindromeQ, {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        })));
        console.log(gradient.instagram(figlet.textSync(isCorrect.reversed, {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        })));
        console.log('');
        await askPlayAgain('palindrome');
    }
}

async function askPlayAgain(game) {
    const answers = await inquirer.prompt({
        name: 'confirmedOr',
        type: 'confirm',
        message: 'Go again?'
    });
    const isConfirmed = answers.confirmedOr;
    return playAgain(isConfirmed, game);
}

async function playAgain(isConfirmed, game) {
    if (isConfirmed && game == 'palindrome') {
        await questionPalindrome();
    } else if (isConfirmed && game == 'color') {
        await colorGame();
    } else if (isConfirmed && game == 'blackjack') {
        await blackjackGame();
    } else {
        process.exit(1);
    }
}

//
function palindrome(palindromeQ) {
    let str = palindromeQ;
    const lowerStr = str.toLowerCase(); //convert to lower case
    const replaced = lowerStr.replace(/[^a-z0-9]/gi, ''); //remove everything but letters and numbers
  //	console.log(replaced);
    if (replaced.length < 1) {
        return {isYes: false};
    } else if (replaced.length === 1) {
            return {reversed: replaced, isYes: false}
    } else {
        for (let i = 0; i < replaced.length/2; i++) {
        if (replaced[i] === replaced[replaced.length - i - 1]) {
    //      console.log(replaced[i]);
        } else {
            let reverseStr = '';
            for (let i = replaced.length - 1; i >= 0; i--) {
                reverseStr += replaced[i];
            }
            return {
                reversed: reverseStr,
                isYes: false
            };
        }
        }
    }
    return {isYes: true};
}

// color guessing game
async function colorGame() {
    
    const targetIndex = Math.floor(Math.random() * COLORS_ARRAY.length);
    target = COLORS_ARRAY[targetIndex];

    await askColor();
}

async function askColor() {
    const answers = await inquirer.prompt({
        name: 'color_guess',
        type: 'list',
        message: `I am thinking of one of these colors. 
        What color am I thinking of?`,
        choices: ['black', 'brown' ,'gold', 'gray', 'green', 'magenta', 
        'orange', 'red', 'white', 'yellow', 'blue']
    });
    let colored = chalkPipe(answers.color_guess);
    return chalkPipe(answers.color_guess)(handleColorAnswer(answers.color_guess));
}

async function handleColorAnswer(guess) {
    const spinner = createSpinner('Checking...').start();
    await sleep();
    
    if (guess > target) {
        spinner.error({ text: 'Your color guess is alphabetically higher than my color.'});
        
        await askColor();
    }
    else if (guess < target) {
        spinner.error({ text: 'Your color guess is alphabetically lower than my color.'});
        await askColor();
    }
    else {
        spinner.success({ text: 'You got it right!'});
        await askPlayAgain('color');
    }
}


// blackjack game
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

let playerCards = [];
let dealerCards = [];

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
function getCard(who) {
    const cardIndex = Math.floor(Math.random() * cards.length);
    const newCard = cards[cardIndex];
    cards.splice(cardIndex, 1);
    who.push(newCard);

    playerPoints = playerCards.reduce((a, b) => a + b.value, 0,);
    dealerPoints = dealerCards.reduce((a, b) => a + b.value, 0,);
    
    return who;
}

async function dealBlackjack() {
    await (getCard(playerCards));
    await (getCard(playerCards));

    await (getCard(dealerCards));
    await (getCard(dealerCards));

    await checkScores();
}

    async function hitOrStay() {
        const answers = await inquirer.prompt({
            name: 'hit_stay',
            type: 'list',
            message: 'Hit or stay?',
            choices: ['Hit me!', 'Stay']
        });
        if (answers.hit_stay == 'Hit me!') {
            await getCard(playerCards);
            if (dealerPoints < 21) {
                await getCard(dealerCards);
            }
            await checkScores();
        } else if (answers.hit_stay =='Stay') {
            await getCard(dealerCards);
            await checkScores();
        }
    }

    async function checkScores() {
        console.log(playerCards, 'your points:', playerPoints);
        console.log(dealerCards, 'dealer points:', dealerPoints);

        if (playerPoints == 21 && dealerPoints == 21) {
            console.log('draw');
            await askPlayAgain('blackjack');
        } else if (dealerPoints > 21 ) {
            console.log('you win');
            await askPlayAgain('blackjack');
        } else if (playerPoints == 21 && dealerPoints < 21) {
            console.log('dealer draws');
            await (getCard(dealerCards));
            await checkScores();
        } else if (playerPoints < 21 && dealerPoints < 21) {
            await hitOrStay();
            await (getCard(dealerCards));
        } else if (playerPoints < 21 && dealerPoints == 21) {
            console.log('the house wins');
            await askPlayAgain('blackjack');
        } else {
            console.log('the house wins');
            await askPlayAgain('blackjack');
        }
    }

    dealBlackjack();
}