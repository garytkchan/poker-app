# Top Scoring Poker Hand Identifier App
This is a node.js terminal application that identifies the top scoring combination of a hand of 5 cards drawn from a 52 card deck.

## Assumptions made with this application
- The card data retrieved from the deck of cards API is always legitimate.
- Works for a single deck with 52 cards excluding the Joker cards only.
- Only 5 cards will be drawn from the deck.
- This program only identifies the top scoring combination from a hand of 5 cards.
- Only the names of the top scoring hand will be printed. 

## Input
Data of the playing cards from the deck of cards API (https://deckofcardsapi.com/).

## Process of the app

1. The data of the playing cards is retrieved from the deck of cards API (https://deckofcardsapi.com/). 
   Every restart of the program will generate a randomly shuffled deck of 52 cards.
2. A total of 5 cards will be drawn randomly from the deck. The numbers and suit of each card will be printed to the console.
3. The program will also print the top scoring combination to the console.

## Output
- Print the number and suit of the 5 drawn cards to the console.
- Print the names of the top scoring combination and they are ranked descendingly as follow:
  1. Royal Flush
  2. Four of a kind
  3. Full House
  4. Flush
  5. Straight
  6. Three of a kind
  7. Two pairs
  8. One pair
  9. High card
  
 ## Steps to run the app in development mode
 1. Have npm and node.js installed in your local machine
 2. Navigate to the directory '/poker-app/src' in the terminal. Run the following commands:
    ###  `npm install`
    ###  `node poker.js`


