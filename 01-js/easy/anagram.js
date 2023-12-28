/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/


function isAnagram(str1, str2) {
  if(str1.length!=str2.length){
    return false;
  }else{
    let freq = new Map();
    let len = str1.length;
    for(let i=0;i<len;i++){
      if(freq.has(str1[i])){
        freq.set(str1[i],freq.get(str1[i])+1);
      }else{
        freq.set(str1[i],1);
      }
    }

    for(let i=0;i<len;i++){
      if(freq.has(str2[i])){
        freq.set(str2[i],freq.get(str2[i])-1);
      }else{
        return false;
      }
    }

    for(const x of freq.values()){
      if(x!=0){
        return false;
      }
    }
    return true;
  }  
}


console.log(isAnagram("hello","hello!"));
// module.exports = isAnagram;
