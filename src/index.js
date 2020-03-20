function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arrExpr = [],
        tempStack = [],
        stackWithPriority = [],
        counterBrackets = 0,
        operators = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };

    expr.replace(/\s*/g, '').split(/(\d+(\.{0,1}\d+)?)|([\+\-\/\*\(\)]{1})/).map((el) => {
        if (el == '(') {
            counterBrackets++;
        } else if (el == ')') {
            counterBrackets--;
        }
        (el != undefined) && (el !== ' ') && (el !== '') ? arrExpr.push(el): el;
    });

    if (counterBrackets != 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    for (let i = 0; i < arrExpr.length; i++) {
        if (arrExpr[i] == '(') {
            tempStack.push(arrExpr[i]);
        }

        if (!isNaN(parseFloat(arrExpr[i]))) {
            stackWithPriority.push(arrExpr[i]);
        }

        if (operators[arrExpr[i]]) {
            while (operators[tempStack[tempStack.length - 1]] >= operators[arrExpr[i]]) {
                stackWithPriority.push(tempStack.pop());
            }
            tempStack.push(arrExpr[i]);
        }

        if (arrExpr[i] == ')') {
            while (tempStack[tempStack.length - 1] != '(') {
                stackWithPriority.push(tempStack.pop());
            }
            tempStack.pop();
        }

        if (i == arrExpr.length - 1) {
            for (let j = tempStack.length - 1; j >= 0; j--) {
                stackWithPriority.push(tempStack[j]);
            }
        }
    }

    tempStack = [];

    for (let i = 0; i < stackWithPriority.length; i++) {
        if (!isNaN(parseFloat(stackWithPriority[i]))) {
            tempStack.push(stackWithPriority[i]);
        }

        if (operators[stackWithPriority[i]]) {
            let leftOperand = parseFloat(tempStack[tempStack.length - 2]),
                rightOperand = parseFloat(tempStack[tempStack.length - 1]);

            if (stackWithPriority[i] == '+') {
                tempStack.pop();
                tempStack.pop();
                tempStack.push(leftOperand + rightOperand);
            }

            if (stackWithPriority[i] == '-') {
                tempStack.pop();
                tempStack.pop();
                tempStack.push(leftOperand - rightOperand);
            }

            if (stackWithPriority[i] == '/') {
                tempStack.pop();
                tempStack.pop();
                if (rightOperand == 0) {
                    throw new Error("TypeError: Division by zero.");
                }
                tempStack.push(leftOperand / rightOperand);
            }

            if (stackWithPriority[i] == '*') {
                tempStack.pop();
                tempStack.pop();
                tempStack.push(leftOperand * rightOperand);
            }
        }
    }

    return tempStack[tempStack.length - 1];
}

module.exports = {
    expressionCalculator
}