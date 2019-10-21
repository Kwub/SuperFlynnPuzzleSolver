let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let listRequest = new XMLHttpRequest();
listRequest.open('GET', "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", false);
listRequest.send();

let wordsList = listRequest.responseText.split('\n');
let filteredList = [];

for (let i = 0; i < wordsList.length; i++) {
    
    let word = wordsList[i]
    word = word.replace("\r", "")
   
    if (word.endsWith("ay")) {
        filteredList.push(word)
    }
   
}

for (let i = 0; i < filteredList.length; i++) {
    console.log(filteredList[i])
}

// can only access words 1000 times per day or we need a new key
function accessAPI(wordQuery) {
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    let wordRequest = new XMLHttpRequest();
    let wordString = wordQuery;
    let key // = "2db3f398-ea01-49b9-a7a0-78142800d42a";
    let wordRequestURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + wordString + "?key=" + key;

    wordRequest.open('GET', wordRequestURL, false);
    wordRequest.send();

    let jsonString = wordRequest.responseText
    jsonString = jsonString.toLowerCase();
    let word = JSON.parse(jsonString);

    for (let i = 0; i < word.length; i++) {
        let match = false;
        for (let j = 0; j < word[i].shortdef.length; j++) {
            if (word[i].shortdef[j].includes("drink") || word[i].shortdef[j].includes("beverage") || word[i].shortdef[j].includes("juice") || word[i].shortdef[j].includes("milk")) {
                match = true;
            }
        }
        if (match) {
            return word[i].meta.id;
        }
    }
}

