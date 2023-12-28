/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let len = str.length-1;

  for(let i=0;i<len;i++){
    if(str[i]!=str[len-i]){
      return false;
    }
  }

  return true;
}

console.log(isPalindrome("malayalam"));


module.exports = isPalindrome;
