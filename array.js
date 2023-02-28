let arr1 = [' hearts', ' diamonds', ' spades', ' clubs'];
let arr2 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];
let newarr = arr2.map((x) => arr1.map(y => x + y));

console.log(newarr);