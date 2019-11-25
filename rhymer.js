// WARNING
// Extreme spaghetti code below
// Good luck

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

let listRequest = new XMLHttpRequest()
listRequest.open('GET', "http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b", false)
listRequest.send()

let wordsList = listRequest.responseText.split("\n")
let endList = []
let fourletterwords = []

for (let i = 56; i < wordsList.length; i++) {
    let word = wordsList[i].split(" ")
    if (hasOneVowel(word[0]) && word[0].length == 4) {
        fourletterwords.push(word[0])
        let end = findEnd(word)
        endList.push(end)
    }
}

let matches = []
for (let i = 0; i < endList.length; i++) {
    let matchedWord = []
    for (let j = 0; j < endList.length; j++) {
        if (endList[j] == endList[i]) {
            matchedWord.push(fourletterwords[j])
        }
    }
    matches.push(matchedWord)
}

let sortedMatches = []
for (let i = 0; i < matches.length; i++) {
    let rhyme = []
    let temp = []
    for (let j = 0; j < matches[i].length; j++) {
        if(matches[i][j].includes("A")) {
            temp.push(matches[i][j])
        }
    }
    rhyme.push(temp)
    temp = []
    for (let j = 0; j < matches[i].length; j++) {
        if(matches[i][j].includes("E")) {
            temp.push(matches[i][j])
        }
    }
    rhyme.push(temp)
    temp = []
    for (let j = 0; j < matches[i].length; j++) {
        if(matches[i][j].includes("I")) {
            temp.push(matches[i][j])
        }
    }
    rhyme.push(temp)
    temp = []
    for (let j = 0; j < matches[i].length; j++) {
        if(matches[i][j].includes("O")) {
            temp.push(matches[i][j])
        }
    }
    rhyme.push(temp)
    temp = []
    for (let j = 0; j < matches[i].length; j++) {
        if(matches[i][j].includes("U")) {
            temp.push(matches[i][j])
        }
    }
    rhyme.push(temp)
    temp = []
    sortedMatches.push(rhyme)
}

for (let i = 0; i < sortedMatches.length; i++) {
    let count = 0
    for (let j = 0; j < sortedMatches[i].length; j++) {
        if (sortedMatches[i][j] == []) {
            count++
        }
    }
    if (count == 1) {
        sortedMatches.splice(i, 1)
        i--
    }
}


function hasOneVowel(word) {
    let numVowels = 0
    for (let i = 0; i < word.length; i++) {
        letter = word.substring(i, i + 1)
        if (letter == "A" ||
            letter == "E" ||
            letter == "I" ||
            letter == "O" ||
            letter == "U") {
            numVowels++
        }
    }
    if (numVowels == 1) {
        return true
    } else {
        return false
    }
}

function findEnd(word) {
    let vsi = [];
    let str = ""

    for (let i = 1; i < word.length; i++) {
        if (word[i].includes("1") || word[i].includes("1") || word[i].includes("3")) {
            vsi.push(i)
        }
    }
    
    for (let i = vsi[0]; i < word.length; i++) {
        str += word[i]
    }

    return str
}

let numMatches = 0;
for (let i = 0; i < sortedMatches.length; i++) {
    let activeVowels = []
    for (let j = 0; j < sortedMatches[i].length; j++) {
        if (sortedMatches[i][j] != 0) {
            activeVowels.push(j)
        }
    }
    if (activeVowels.length >= 2) {
        if (activeVowels.includes(0)) {
            console.log("A ", sortedMatches[i][0])
        }
        if (activeVowels.includes(1)) {
            console.log("E ", sortedMatches[i][1])
        }
        if (activeVowels.includes(2)) {
            console.log("I ", sortedMatches[i][2])
        }
        if (activeVowels.includes(3)) {
            console.log("O ", sortedMatches[i][3])
        }
        if (activeVowels.includes(4)) {
            console.log("U ", sortedMatches[i][4])
        }
        numMatches++
        console.log(" ")
    }
}

console.log("Number of Matches: ", numMatches)