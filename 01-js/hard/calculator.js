/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(variable){
    this.variable = variable;
  }

  add = (x) => {
    this.variable+=x;
  }

  subtract = (x) => {
    this.variable-=x;
  }

  multiply = (x) => {
    this.variable*=x;
  }

  divide = (x) => {
    this.variable/=x;
  }

  clear = () => {
    this.variable=0;
  }

  getResults = () =>{
    return this.variable;
  }

  calculate = (expression) =>{
      // Helper function to check if a character is an operator
      function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
      }

      // Helper function to get the precedence of an operator
      function getPrecedence(operator) {
        switch (operator) {
          case '+':
          case '-':
            return 1;
          case '*':
          case '/':
            return 2;
          default:
            return 0; // Assuming 0 for non-operators
        }
      }

      // Helper function to apply the operator on two operands
      function applyOperator(op1, operator, op2) {
        switch (operator) {
          case '+':
            return op1 + op2;
          case '-':
            return op1 - op2;
          case '*':
            return op1 * op2;
          case '/':
            return op1 / op2;
          default:
            return 0; // Error case
        }
      }

      let operandStack = [];
      let operatorStack = [];

      for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (char.match(/\d/)) {
          // If the character is an operand, push it onto the operand stack
          operandStack.push(parseFloat(char));
        } else if (char === '(') {
          // If the character is '(', push it onto the operator stack
          operatorStack.push(char);
        } else if (isOperator(char)) {
          // If the character is an operator
          while (
            operatorStack.length > 0 &&
            getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(char)
          ) {
            // Pop operators from the operator stack, and apply them to operands
            let operator = operatorStack.pop();
            let op2 = operandStack.pop();
            let op1 = operandStack.pop();
            operandStack.push(applyOperator(op1, operator, op2));
          }
          // Push the current operator onto the operator stack
          operatorStack.push(char);
        } else if (char === ')') {
          // If the character is ')', pop operators and apply them until '(' is encountered
          while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
            let operator = operatorStack.pop();
            let op2 = operandStack.pop();
            let op1 = operandStack.pop();
            operandStack.push(applyOperator(op1, operator, op2));
          }
          // Pop the '(' from the operator stack
          operatorStack.pop();
        }
        else if(char == " "){
          continue;
        }
        else{
          return "error"
        }
      }

      // Process any remaining operators on the stacks
      while (operatorStack.length > 0) {
        let operator = operatorStack.pop();
        let op2 = operandStack.pop();
        let op1 = operandStack.pop();
        operandStack.push(applyOperator(op1, operator, op2));
      }

      // The result should be at the top of the operand stack
      return operandStack[0];

  }

}


const obj = new Calculator(0);

console.log(obj.calculate("3+5*(2-8)/4"));

module.exports = Calculator;
