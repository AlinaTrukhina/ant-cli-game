#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import chalkPipe from 'chalk-pipe';

let playerName;

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
    let target;

    const COLORS_ARRAY = ['black', 'brown' ,'gold', 'gray', 'green', 'magenta', 'orange', 'red', 'white', 'yellow', 'blue'];
    
    const targetIndex = Math.floor(Math.random() * COLORS_ARRAY.length);
    target = COLORS_ARRAY[targetIndex];

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

    await askColor();
}


// blackjack game
function blackjackGame() {
let cards = [
    { card: '1 of hearts', value: 1 },
    { card: '1 of diamonds', value: 1 },
    { card: '1 of spades', value: 1 },
    { card: '1 of clubs', value: 1 },
    { card: '2 of hearts', value: 2 },
    { card: '2 of diamonds', value: 2 },
    { card: '2 of spades', value: 2 },
    { card: '2 of clubs', value: 2 },
    { card: '3 of hearts', value: 3 },
    { card: '3 of diamonds', value: 3 },
    { card: '3 of spades', value: 3 },
    { card: '3 of clubs', value: 3 },
    { card: '4 of hearts', value: 4 },
    { card: '4 of diamonds', value: 4 },
    { card: '4 of spades', value: 4 },
    { card: '4 of clubs', value: 4 },
    { card: '5 of hearts', value: 5 },
    { card: '5 of diamonds', value: 5 },
    { card: '5 of spades', value: 5 },
    { card: '5 of clubs', value: 5 },
    { card: '6 of hearts', value: 6 },
    { card: '6 of diamonds', value: 6 },
    { card: '6 of spades', value: 6 },
    { card: '6 of clubs', value: 6 },
    { card: '7 of hearts', value: 7 },
    { card: '7 of diamonds', value: 7 },
    { card: '7 of spades', value: 7 },
    { card: '7 of clubs', value: 7 },
    { card: '8 of hearts', value: 8 },
    { card: '8 of diamonds', value: 8 },
    { card: '8 of spades', value: 8 },
    { card: '8 of clubs', value: 8 },
    { card: '9 of hearts', value: 9 },
    { card: '9 of diamonds', value: 9 },
    { card: '9 of spades', value: 9 },
    { card: '9 of clubs', value: 9 },
    { card: '10 of hearts', value: 10 },
    { card: '10 of diamonds', value: 10 },
    { card: '10 of spades', value: 10 },
    { card: '10 of clubs', value: 10 },
    { card: 'Jack of hearts', value: 10 },
    { card: 'Jack of diamonds', value: 10 },
    { card: 'Jack of spades', value: 10 },
    { card: 'Jack of clubs', value: 10 },
    { card: 'Queen of hearts', value: 10 },
    { card: 'Queen of diamonds', value: 10 },
    { card: 'Queen of spades', value: 10 },
    { card: 'Queen of clubs', value: 10 },
    { card: 'King of hearts', value: 10 },
    { card: 'King of diamonds', value: 10 },
    { card: 'King of spades', value: 10 },
    { card: 'King of clubs', value: 10 },
    { card: 'Ace', value: 11 },
    { card: 'Ace', value: 11 },
    { card: 'Ace', value: 11 },
    { card: 'Ace', value: 11 }
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
        // const spinner = await createSpinner('Dealing Cards...').start();
        // await sleep();
        await console.clear();
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
            await console.clear();
            if (playerPoints > 21) {
                console.log('Your cards:');
                console.log('---------');
                for (let card of playerCards) {
                    console.log(card.card);
                    console.log('---------');
                }
                console.log('Your points:', playerPoints);
                console.log('');
                console.log('Dealer cards:');
                console.log('---------');
                for (let card of dealerCards) {
                    console.log(card.card);
                    console.log('---------');
                }
                console.log('Dealer points:', dealerPoints);
                console.log('');
                console.log('the house wins');
                await askPlayAgain('blackjack');
            }
            if (dealerPoints < 21) {
                await getCard(dealerCards);
            }
            await checkScores();
        } else if (answers.hit_stay =='Stay') {
            await getCard(dealerCards);
            await checkScores();
        }
    }

    function checkScores() {
        console.clear();
        console.log('Your cards:');
        console.log('---------');
        for (let card of playerCards) {
            console.log(card.card);
            console.log('---------');
        }
        console.log('Your points:', playerPoints);
        console.log('');
        console.log('Dealer cards:');
        console.log('---------');
        for (let card of dealerCards) {
            console.log(card.card);
            console.log('---------');
        }
        console.log('Dealer points:', dealerPoints);
        console.log('');

        if (playerPoints == 21 && dealerPoints == 21) {
            console.log('draw');
            askPlayAgain('blackjack');
        } else if (dealerPoints > 21 ) {
            console.log('you win');
            askPlayAgain('blackjack');
        } else if (playerPoints == 21 && dealerPoints < 21) {
            console.log('dealer draws');
            (getCard(dealerCards));
            checkScores();
        } else if (playerPoints < 21 && dealerPoints < 21) {
            hitOrStay();
        } else if (playerPoints < 21 && dealerPoints == 21) {
            console.log('the house wins');
            askPlayAgain('blackjack');
        } else {
            console.log('the house wins');
            askPlayAgain('blackjack');
        }
    }

    dealBlackjack();
}