#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

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
    
    return handleAnswer(gameChoice.question1 == 'check for palindrome');
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
        await askPlayAgain();
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
        await askPlayAgain();
        
    }
}

async function askPlayAgain() {
    const answers = await inquirer.prompt({
        name: 'confirmedOr',
        type: 'confirm',
        message: 'Check another word?'
    });

    const isConfirmed = answers.confirmedOr;
    return playAgain(isConfirmed);
}

async function playAgain(isConfirmed) {
    if (isConfirmed) {
        await questionPalindrome();
    } else {
        process.exit(1);
    }
}

// javaScript supports top-level await, no need to say 'async' before this!
await welcome();
// await askName();
// await question1();
await questionPalindrome();

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

// Color Guessing game
// src="js/color-guessing-game.js"
const COLORS_ARRAY = ['black', 'brown' ,'gold', 'gray', 'green', 'magenta', 'orange', 'red', 'white', 'yellow', 'blue'];
let numTries = 0;

function colorGame() {
let guess = '';
let correct = false;

const targetIndex = Math.floor(Math.random() * COLORS_ARRAY.length);
const target = COLORS_ARRAY[targetIndex];
//        console.log(target); previously checked # of color

do {
    COLORS_ARRAY.sort();
    guess = prompt('I am thinking of one of these colors:\n\n' + COLORS_ARRAY.join(', ') + '\n\nWhat color am I thinking of?\n');
    if (guess === null) {
        alert('You did not provide a guess.')
        return;
    }
        
    guessNumber = +guess;
    numTries += 1;
    correct = colorCheckGuess(guess, target);

} while(!correct);
alert('Congratulations! You guessed correctly! The color was ' + target + ' and the number of guesses was ' + numTries + ' .' );
document.body.style.background = guess;


}

function colorCheckGuess(guess, target) {
    let correct = false;
    guess = guess.toLowerCase();

    if (!COLORS_ARRAY.includes(guess)) {
        alert('Your color is not on the list. Your number of guesses is ' + numTries + ' .');
    }
    else if (guess > target) {
        alert('Your color guess is alphabetically higher than my color. Your number of guesses is ' + numTries + ' .');
    }
    else if (guess < target) {
        alert('Your color guess is alphabetically lower than my color. Your number of guesses is ' + numTries + ' .');
    }
    else {
        correct = true;
    }
    return correct;
}