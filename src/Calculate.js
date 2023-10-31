function calculate(array) {
  array = findSignNumbers(array);
  console.log({ array });
  while (findParenthesis(array) !== -1) {
    let outPut1 = findParenthesis(array);
    let final = simpleCalculate(outPut1);
  }
  let final = simpleCalculate(array);
  return final;
}

const findParenthesis = (array) => {
  let startIndex = -1;
  let endIndex = -1;
  let result = 0;
  let innerMostPare = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "(" && endIndex === -1) {
      startIndex = i;
    } else if (array[i] === ")" && endIndex === -1) {
      endIndex = i;
    }
  }
  if (startIndex !== -1 && endIndex !== -1) {
    for (let i = startIndex + 1; i < endIndex; i++) {
      innerMostPare.push(array[i]);
    }
    let sub = endIndex - startIndex;
    result = simpleCalculate(innerMostPare);
    array.splice(startIndex, sub + 1, result);
    return array;
  } else return -1;
};

const findSignNumbers = (array) => {
  const newArray = ["0", ...array];
  for (let i = 1; i < newArray.length; i++) {
    console.log(newArray);
    const ch = newArray[i];
    const lastCh = newArray[i - 1];
    const afterCh = newArray[i + 1];
    let num1 = 0;
    console.log({ lastCh, ch, afterCh });
    if (
      "+-".includes(ch) &&
      !"/*-+".includes(afterCh) &&
      ("/*-+".includes(lastCh) || lastCh === "0")
    ) {
      num1 = -1 * afterCh;
      newArray.splice(i, 2, num1);
      return newArray.slice(1);
    }
  }
  return newArray;
};

const calcTrig = (array) => {
  let kaman = 0;
  let radianIn = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "Sin") {
      radianIn = (array[i + 1] * Math.PI) / 180;
      kaman = Math.sin(radianIn);
      array.splice(i, 2, kaman);
    } else if (array[i] === "Cos") {
      radianIn = (array[i + 1] * Math.PI) / 180;
      kaman = Math.cos(radianIn);
      array.splice(i, 2, kaman);
    }
  }
  return array;
};

function simpleCalculate(array) {
  let outPut1 = calcTrig(array);
  let result = calculateMulDiv(array);
  return calculatePlusMinus(result);
}

function calculatePlusMinus(array) {
  let result = Number(array[0]);
  for (let i = 0; i < array.length; i++) {
    if ("+-".includes(array[i])) {
      let num2 = Number(array[i + 1]);

      switch (array[i]) {
        case "+":
          result += num2;

          break;

        case "-":
          result -= num2;

          break;

        default:
          break;
      }
    }
  }
  return result;
}

function calculateMulDiv(input) {
  let result = 0;
  let i;
  while (findMulOrDiv(input) !== -1) {
    i = findMulOrDiv(input);
    const leftNum = parseFloat(input[i - 1]);
    const rightNum = parseFloat(input[i + 1]);
    switch (input[i]) {
      case "^":
        result = Math.pow(leftNum, rightNum);
        break;

      case "*":
        result = leftNum * rightNum;
        break;

      case "/":
        result = leftNum / rightNum;
        break;

      default:
        break;
    }

    input.splice(i - 1, 3, result);
  }
  return input;
}

const findMulOrDiv = (inArray) => {
  for (let i = 0; i < inArray.length; i++) {
    if ("*/^".includes(inArray[i])) {
      return i;
    }
  }

  return -1;
};

export default calculate;
