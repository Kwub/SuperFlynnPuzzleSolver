var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var listRequest = new XMLHttpRequest();
listRequest.open('GET', "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", false);
listRequest.send();

var wordsList = listRequest.responseText.split('\n');

for (var i = 0; i < wordsList.length; i++) {
    if (wordsList[i].includes("arcas") && wordsList[i].length == 8) {
        console.log(wordsList[i])
    }
}
