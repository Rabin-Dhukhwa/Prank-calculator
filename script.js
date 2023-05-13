"use strict";

const btns = document.querySelectorAll(".btn");
// console.log(btns);
const displayElement = document.querySelector(".display");
let strToDisplay = "";

const operators = ["%", "/", "+", "-", "*"];

let lastOperator = "";

const audio = new Audio("./laughHaHa.wav");

btns.forEach((btn) => {
  //   console.log(btn);
  btn.addEventListener("click", () => {
    //for prank calculator
    displayElement.style.background = "";
    displayElement.style.color = "black";
    displayElement.classList.remove("prank");
    const val = btn.innerText;

    // console.log( val);
    // console.log(typeof val);

    //when you click operator and when the strToDisplay is empty or strToDisplay.length=0, it will return
    //you cann't click operator in first place
    if (operators.includes(val) && !strToDisplay.length) {
      return;
    }
    if (operators.includes(val)) {
      lastOperator = val;
      const lastChar = strToDisplay.slice(-1);
      //   console.log(strToDisplay);
      //   console.log(lastChar);
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }

    if (val === "=") {
      return total();
    }

    if (val === "AC") {
      strToDisplay = "";
      return display();
    }
    if (val === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
    }

    if (val === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex); //string with and after last operator index
      //   console.log(lastOperatorIndex, lastNumberSet);
      if (lastNumberSet.includes(".")) {
        return;
      }
      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    // -------
    strToDisplay += val;
    display(strToDisplay);
  });
});

const display = (str) => {
  displayElement.innerText = str || "0.00";
};

const total = () => {
  const pk = randomNumber();

  if (pk) {
    audio.play();
    displayElement.style.background = "red";
    displayElement.style.color = "white";
    displayElement.classList.add("prank");
  }

  const ttl = eval(strToDisplay) + pk;
  //   console.log(ttl);
  display(ttl);
  strToDisplay = ttl.toString();
};

const randomNumber = () => {
  const num = Math.trunc(Math.random() * 10 + 1);
  return num <= 3 ? num : 0;
};
