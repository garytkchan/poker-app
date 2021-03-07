// use axios to fetch API
import axios from 'axios';
//const axios = require('axios')

// URL
const URL = 'https://deckofcardsapi.com/';

// map non-numeric card to a integer
let map = new Map([['T', 10], ['J', 11], ['Q', 12], ['K', 13], ['A', 14]]); 

// Array to record the current hand
let local_hand = [];

// keep the count of each card value in a array
let valueArray = new Array(15).fill(0);

// get the count of cards with different value
function fillValueArray(hand){

    for (let card of hand){
        if (!isNaN(card[0]))
            valueArray[parseInt(card[0])] += 1;
        else
            valueArray[parseInt(map.get(card[0]))] += 1;
    }
}

// check if a flush exists
function checkFlush(hand){

    const suitSet = new Set();
    for (let card of hand){
        suitSet.add(card[1]);
    }
    if (suitSet.size === 1)
        return true;
    return false;
}

// Check if a straight exists
function checkStraight(){
    
    // check for straight
    let count = 0;
    for (let i = 2; i < valueArray.length; i++){
        if (valueArray[i] > 1)
            return false;
        if (valueArray[i] === 1){
            count++;
            if (count === 5)
                return true;
        }
        else
            count = 0;
    }
    // check if A12345 exists
    if (valueArray[14] === 1){
        for (let i = 2; i <= 5; i++){
            if (valueArray[i] !== 1)
                return false;
        }
        return true;
    }
    return false;
}

// check for different combinations except straight and flush
function checkDifferentKinds(){

    let fourOfAKind = false; //return score 6 for four of a kind
                               //return score 5 for full house
    let threeOfAKind = false; //return score 4 for three of a kind
    let twoPairs = false;     //return score 3 for two pairs 
    let onePair = false;      //return score 2 for one pair 
                            // return score 1 for a single highest card only
    for (let i = 2; i < valueArray.length; i++){
        const cur = valueArray[i];
        if (cur === 4)
            fourOfAKind = true;
        else if (cur === 3)
            threeOfAKind = true;
        else if (cur === 2){
            if (onePair)
                twoPairs = true;
            else    
                onePair = true;
        }
    }
    if (fourOfAKind)    return 6;
    if (threeOfAKind && onePair)    return 5;
    if (threeOfAKind)   return 4;
    if (twoPairs)   return 3;
    if (onePair)    return 2;
    return 1;
}

// check for the highest scoring hand
function checkForTheHighestHand(arr){
    
    // print the current hand
    console.log("\nCurrent Hand:")
    console.log(arr);

    // Symbolize each card for simpler data manipulation
    let cardArr = [];
    for (let cardObj of arr){
        const {val, suit} = cardObj;
        let curCardSymbol;
        // this is an number card
        if (!isNaN(val)){
            // A number card but not a 10
            if (val !== '10')
                curCardSymbol = val.concat(suit.charAt(0));
            else
                curCardSymbol = 'T'.concat(suit.charAt(0));
        }
        else {
            curCardSymbol = val.charAt(0).concat(suit.charAt(0));
        }
        cardArr.push(curCardSymbol);
    }
    
    //fillValueArray(['9C','9C','9C','QC','QC']);
    //console.log("print value array here");
    //console.log(valueArray);

    fillValueArray(cardArr);
    let straight = checkStraight();
    let flush = checkFlush(cardArr);
    let rank = checkDifferentKinds();
    
    console.log("\nWhat's the top scoring poker hand here?");
    if (straight && flush) console.log("Royal Flush");
    else if (rank === 6)    console.log("Four Of A Kind");
    else if (rank === 5)    console.log("Full House");
    else if (flush)         console.log("Flush");
    else if (straight)      console.log("Straight");
    else if (rank === 4)    console.log("Three Of A Kind");
    else if (rank === 3)    console.log("Two Pairs");
    else if (rank === 2)    console.log("One Pair");
    else if (rank === 1)    console.log("High Card Only");
    console.log("\n");
}

// Fetch API to get a new shuffled deck of cards. 
const drawOneHand = (deck_count) => {
    return axios.get(`${URL}api/deck/new/shuffle/?deck_count=${deck_count}`)
        .then(({data}) => {
        
            drawFiveCards(data.deck_id, 5)
                .then((card_arr) => {
                   for (let c of card_arr){
                       
                       const card = {"val" : c.value,
                                    "suit" : c.suit
                        }
                       local_hand.push(card);
                   }
                   //console.log(local_hand);
                   checkForTheHighestHand(local_hand);
                   return local_hand;
                })
            return data.deck_id;
        })
        .catch(error => {
            console.log(error);
        });
}

// Fetch API to draw five cards from a deck of cards
const drawFiveCards = (deckId, numOfCards) => {
    return axios.get(`${URL}api/deck/${deckId}/draw/?count=${numOfCards}`)
        .then(({data: {cards}}) => {
            //console.log(cards);
            return cards;
        })
        .catch(error => {
            console.log(error);
        })
}

// Run the program and print the result to the terminal
drawOneHand(1);

