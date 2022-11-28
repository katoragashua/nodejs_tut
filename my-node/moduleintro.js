const { peter, john } = require("./names");
const sayHello = require("./sayHello");
const altData = require("./altmodexport");

const amount = 9;
if (amount < 10) {
  console.log("Small number");
} else if (amount > 10) {
  console.log("Larger than 10");
}

console.log("It's my first Node app");
// console.log(process)
console.log(__filename);
console.log(__dirname);

setTimeout(() => {
  console.log("Hello World");
}, 3000);

sayHello(peter);
console.log(altData);

const { myObject, myArr } = altData;
sayHello(myObject.firstName);
sayHello(myArr[0].toString());
