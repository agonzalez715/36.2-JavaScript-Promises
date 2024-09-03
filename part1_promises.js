// Part 1: Fetch a fact about your favorite number
// Define the function getNumberFact which accepts a parameter 'number'
function getNumberFact(number) {
  // Start a fetch request to the Numbers API, interpolating the number into the URL for a specific number fact
  // The `json` query parameter is used to ensure the API returns JSON formatted data
  return fetch(`http://numbersapi.com/${number}?json`)
    .then(response => {
      // The response from the API is received as a stream, and the .json() method is called
      // to parse this stream into JSON format. This returns another Promise.
      return response.json();
    })
    .then(data => {
      // Once the data is successfully parsed into JSON format, it's passed to this .then() block.
      // Here, we log the fact about the number to the console. 'data.text' contains the fact as a string.
      console.log(`Fact about ${number}:`, data.text);
    })
    .catch(err => {
      // If any errors occur during the fetch operation or during the execution of any of the .then() blocks,
      // this .catch() block catches the error and logs it to the console.
      console.error('Error fetching data:', err);
    });
}

// Call the getNumberFact function with the number 7 (you can replace 7 with any number of your choice)
getNumberFact(7);



// Part 1: Get data on multiple numbers in a single request
// Define the function getMultipleNumberFacts which accepts a string of numbers separated by commas
function getMultipleNumberFacts(numbers) {
  // Start a fetch request to the Numbers API, interpolating the numbers into the URL.
  // The `json` query parameter is used to ensure the API returns JSON formatted data.
  return fetch(`http://numbersapi.com/${numbers}?json`)
    .then(response => {
      // The response from the API is received as a stream, and the .json() method is called
      // to parse this stream into JSON format. This returns another Promise.
      return response.json();
    })
    .then(data => {
      // Once the data is successfully parsed into JSON format, it's passed to this .then() block.
      // 'data' is an object where each key is one of the numbers requested, and the value is an object containing the fact.
      // Object.keys(data) creates an array of these keys, which is then iterated over with forEach.
      Object.keys(data).forEach(key => {
        // For each key (number), log the fact to the console.
        // 'data[key].text' contains the fact as a string for each number.
        console.log(`Fact about ${key}:`, data[key].text);
      });
    })
    .catch(err => {
      // If any errors occur during the fetch operation or during the execution of any of the .then() blocks,
      // this .catch() block catches the error and logs it to the console.
      console.error('Error fetching data:', err);
    });
}

// Call the getMultipleNumberFacts function with the string "3,7,21"
// You can replace "3,7,21" with any other numbers of your choice separated by commas
getMultipleNumberFacts("3,7,21");

  



// Part 1: Get four facts about a favorite number
// Define a function getMultipleFactsAboutNumber which takes two parameters:
// 'number' (the number about which facts are desired) and 'count' (the number of facts to fetch).
function getMultipleFactsAboutNumber(number, count) {
  // Initialize an empty array to hold the promise objects for multiple fetch requests.
  let promises = [];
  
  // Loop to create multiple fetch requests based on the 'count' parameter.
  for (let i = 0; i < count; i++) {
    // Each fetch request is pushed to the 'promises' array.
    // The URL includes the number to fetch the fact about and ensures the response is in JSON format.
    promises.push(fetch(`http://numbersapi.com/${number}?json`));
  }
  
  // Wait for all fetch requests in the 'promises' array to complete.
  Promise.all(promises)
    .then(responses => {
      // Once all requests complete, map over the array of responses,
      // transforming each response to JSON, creating a new array of promises to resolve.
      return Promise.all(responses.map(res => res.json()));
    })
    .then(facts => {
      // Once all the JSON transformation promises resolve,
      // iterate over the 'facts' array containing the resolved JSON data.
      facts.forEach((fact, index) => {
        // Log each fact to the console with an index to distinguish between them.
        console.log(`Fact ${index + 1} about ${number}:`, fact.text);
      });
    })
    .catch(err => {
      // Catch and log any errors that occur during the fetch or JSON transformation processes.
      console.error('Error fetching facts:', err);
    });
}

// Call the function getMultipleFactsAboutNumber with the number 7 and a count of 4.
// You can replace 7 with your favorite number and 4 with any other count of facts you wish to retrieve.
getMultipleFactsAboutNumber(7, 4);

  