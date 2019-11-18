let cityList = require('./cities.json')

// formats city names and removes brackets
for (let i = 0; i < cityList.length; i++) {
    for (let j = 0; j < cityList[i].City.length; j++) {
        if (cityList[i].City.substring(j, j + 1) === "[") {
            cityList[i].City = cityList[i].City.substring(0, j)
            break
        }
    }
}

for (let i = 0; i < cityList.length; i++) {
    let cityConsonants = new Array()
    let stateConsonants = new Array()

    // creates array of consonants from city
    for (let j = 0; j < cityList[i].City.length; j++) {
        let cityName = cityList[i].City.toLowerCase()
        cityLetter = cityName.substring(j, j + 1)
        if (cityLetter !== "a" &&
            cityLetter !== "e" &&
            cityLetter !== "i" &&
            cityLetter !== "o" &&
            cityLetter !== "u" &&
            cityLetter !== " ") {
            cityConsonants.push(cityLetter)
        }
    }

    // creates array of consonants from state
    for (let j = 0; j < cityList[i].State.length; j++) {
        let stateName = cityList[i].State.toLowerCase()
        stateLetter = stateName.substring(j, j + 1)
        if (stateLetter !== "a" &&
            stateLetter !== "e" &&
            stateLetter !== "i" &&
            stateLetter !== "o" &&
            stateLetter !== "u" &&
            stateLetter !== " ") {
            stateConsonants.push(stateLetter)
        }
    }

    if (areEqual(cityConsonants, stateConsonants)) {
        console.log(cityList[i].City + ", " + cityList[i].State)
    }
}

// uncapitalizes an array
function uncap(a) {
    for (let i = 0; i < a.length; i++) {
        a[i] = a[i].toLowerCase()
    }
    return a;
}

// checks array equality
function areEqual(a, b) {
    a = uncap(a)
    b = uncap(b)
    a.sort()
    b.sort()

    if (a.length !== b.length) {
        return false
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false
            }
        }
    }
    return true;
}
