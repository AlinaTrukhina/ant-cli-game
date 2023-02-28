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
            'guess the secret color'
        ],
    });
    return handleChoice(gameChoice.question1);
}

async function handleChoice(game) {
    if (game == 'check for palindrome') {
        await questionPalindrome();
    } else if (game == 'guess the secret color') {
        await colorGame();
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
        message: 'I am thinking of one of these colors. What color am I thinking of?',
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
let cards = [['one hearts', 'one diamonds', 'one spades', 'one clubs']]