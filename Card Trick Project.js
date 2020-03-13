//initialize cards
let cards = []

for (let i = 0; i < 9; i++) {
    cards.push(false)
}

//set one as your card
let randomNum = Math.floor(Math.random() * cards.length)
cards[randomNum] = true

console.log("Starting position: " + (randomNum + 1))
printStack(cards)

for (let i = 0; i < 3; i++) {
    cards = dealAndReorder(cards)
    for (let j = 0; j < cards.length; j++) {
        if (cards[j]) {
            console.log("Card is at position: " + (j + 1) + "\n")
        }
    }
    
}

function dealAndReorder(cards) {
    let pile1 = []
    let pile2 = []
    let pile3 = []

    let pileWithCard;
    //make 3 piles
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i]
        switch ((i + 1) % 3) {
            case 0:
                pile1.push(card)
                if (card) { pileWithCard = pile1 }
                break
            case 1:
                pile3.push(card)
                if (card) { pileWithCard = pile3 }
                break
            case 2:
                pile2.push(card)
                if (card) { pileWithCard = pile2 }
                break
        }
    }

    //print the 3 piles
    let falseArray = [] //an array of false
    console.log("3 PILES:")
    for (let i = 0; i < cards.length/3; i++) {
        console.log(pile1[i] + " " + pile2[i] + " " + pile3[i])
        falseArray.push(false)
    }

    //flip the entire pile over since it's face up right now
    pileWithCard = pileWithCard.reverse()
    
    cards = []
    //pile with card goes in the middle. what goes on either side of the pile is irrelevant
    cards = cards.concat(falseArray, pileWithCard, falseArray) 
    
    printStack(cards)

    return cards
}

function printStack(cards) {
    //print final order of cards after putting piles together
    let cardsStr = ""
    for (let i = 0; i < cards.length; i++) {
        if (cards[i]) {
            cardsStr += " T "
        } else {
            cardsStr += " F "
        }
    }
    console.log("New order: " + cardsStr)
}