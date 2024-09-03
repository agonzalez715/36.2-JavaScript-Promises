// Part 1: Request a single card from a newly shuffled deck
// Define the function fetchSingleCard which makes a request to the Deck of Cards API
function fetchSingleCard() {
    // Make a GET request to the Deck of Cards API to draw 1 card from a new, shuffled deck
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      .then(response => {
        // The API responds with data in JSON format, which needs to be parsed.
        // This .then() block receives the raw response and parses it into a JSON object.
        return response.json();
      })
      .then(data => {
        // After parsing the JSON, data is an object containing various properties,
        // including an array 'cards' which holds the drawn card(s).
        const card = data.cards[0]; // Access the first (and only) card in the array.
        // Log the value and suit of the card to the console, converting the suit to lowercase.
        console.log(`${card.value} of ${card.suit.toLowerCase()}`);
      })
      .catch(err => {
        // If there are any errors in the fetch operation or during the data handling in the .then() blocks,
        // this .catch() block will catch and log the error.
        console.error('Error fetching card:', err);
      });
}

// Call the function fetchSingleCard to execute the API request and log the result.
fetchSingleCard();

  


// Part 2: Draw two cards from the same deck
// Define the function fetchTwoCards to fetch two cards sequentially from the same deck
function fetchTwoCards() {
    // Variable to store the deck ID received from the API
    let deckId;

    // Make a GET request to the Deck of Cards API to draw 1 card from a new, shuffled deck
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      .then(response => {
        // Parse the JSON response from the API
        return response.json();
      })
      .then(data => {
        // Store the deck_id from the response to use for the next request
        deckId = data.deck_id;
        // Access the first card from the drawn cards
        const firstCard = data.cards[0];
        // Log the value and suit of the first card, converting the suit to lowercase
        console.log(`${firstCard.value} of ${firstCard.suit.toLowerCase()}`);

        // Make another GET request using the same deck ID to draw another card
        return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      })
      .then(response => {
        // Parse the second JSON response from the API
        return response.json();
      })
      .then(data => {
        // Access the second card from the newly drawn cards
        const secondCard = data.cards[0];
        // Log the value and suit of the second card, converting the suit to lowercase
        console.log(`${secondCard.value} of ${secondCard.suit.toLowerCase()}`);
      })
      .catch(err => {
        // Catch and log any errors that occurred during the fetch operations or data handling
        console.error('Error fetching cards:', err);
      });
}

// Execute the function fetchTwoCards to perform the operation
fetchTwoCards();


  

