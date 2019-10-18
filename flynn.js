var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var listRequest = new XMLHttpRequest();
listRequest.open('GET', "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", false);
listRequest.send();

var wordsList = listRequest.responseText.split('\n');

for (var i = 0; i < wordsList.length; i++) {
    console.log(wordsList[i]);
}

// can only access words 1000 times per day or we need a new key
function accessAPI(wordQuery) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    var wordRequest = new XMLHttpRequest();
    var wordString = wordQuery;
    var key // = "2db3f398-ea01-49b9-a7a0-78142800d42a";
    var wordRequestURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + wordString + "?key=" + key;

    wordRequest.open('GET', wordRequestURL, false);
    wordRequest.send();

    var jsonString = wordRequest.responseText
    jsonString = jsonString.toLowerCase();
    var word = JSON.parse(jsonString);

    for (var i = 0; i < word.length; i++) {
        var match = false;
        for (var j = 0; j < word[i].shortdef.length; j++) {
            if (word[i].shortdef[j].includes("drink") || word[i].shortdef[j].includes("beverage") || word[i].shortdef[j].includes("juice") || word[i].shortdef[j].includes("milk")) {
                match = true;
            }
        }
        if (match) {
            return word[i].meta.id;
        }
    }
}

