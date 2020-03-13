// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// let listRequest = new XMLHttpRequest();
// listRequest.open('GET', "http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b", false);
// listRequest.send();

const fetch = require("node-fetch")

let newText = ""

let url = "http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b"

fetch(url).then(function(response) {
    response.text().then(function(text) {
      newText = text
    });
  });
console.log(newText)

let wordsList = newText.split('\n');
let filteredList = [];

let counter = 0
for (let i = 126; i < wordsList.length; i++) {

    let word = wordsList[i]
    let newWord = word.split(" ")

    // word = word.replace("\r", "")
    if (newWord[newWord.length - 1].includes("EY")) {
        counter++
        console.log(counter)
        let newerWord = newWord[0]
        if (newerWord.endsWith(")")) {
            newerWord = newerWord.substring(0, newerWord.length - 3)
        }
        // console.log(newerWord)
        if (accessAPI(newerWord)) {
            console.log("FOUND: " + newerWord);
        }
    }
    
    
    
    // console.log(wordsList[i])
    
}

// can only access words 1000 times per day or we need a new key
function accessAPI(wordQuery) {
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    let wordRequest = new XMLHttpRequest();
    let wordString = wordQuery;
    let key = "2db3f398-ea01-49b9-a7a0-78142800d42a";
    let wordRequestURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + wordString + "?key=" + key;

    wordRequest.open('GET', wordRequestURL, false);
    wordRequest.send();

    let jsonString = wordRequest.responseText
    jsonString = jsonString.toLowerCase();
    let word = JSON.parse(jsonString);
    // console.log(word)

    if (typeof word[0] !== "undefined" && typeof word[0].shortdef !== "undefined") {

        for (let i = 0; i < word.length; i++) {
            let match = false;
           
                for (let j = 0; j < word[i].shortdef.length; j++) {
                    if (word[i].shortdef[j].includes("drink") || word[i].shortdef[j].includes("beverage") || word[i].shortdef[j].includes("juice") || word[i].shortdef[j].includes("milk") || word[i].shortdef[j].includes("refreshment")) {
                        match = true;
                    }
                }

                if (match) {
                    return true 
                }
            
        }
    } else {
        console.log("UNDEFINED")
    }
}