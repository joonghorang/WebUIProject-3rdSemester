function stringToWordList(String){
    var result = [];
    result = String.split(" ");
    return result;
};
// Comment : 왜 enter를 더해주어야 하는가.
function addEnterToWordList(WordArray){
    for(var i = 0; i < WordArray.length; i++){
        WordArray[i] += "\n";
    }
    return WordArray;
};