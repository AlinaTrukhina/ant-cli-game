let arr1 = [' hearts', ' diamonds', ' spades', ' clubs'];
let arr2 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];
let newarr = arr2.map((x) => arr1.map(y => x + y));
let finalArr = [];
for (let i = 0; i < newarr.length; i++){
    finalArr = finalArr.concat(newarr[i]);
}
console.log(newarr);
console.log(finalArr);