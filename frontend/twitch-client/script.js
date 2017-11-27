let topTenUsers;
let statsObject = {};
var twitchApi = 'https://api.twitch.tv/helix/'
var myHeaders = new Headers({
  "Client-ID": "lnr7ybs8r23c75ogxck7pi5br73rje"
});

var twitchInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

// function to fetch API and handles variables
// function to get the top 10 channels
// function to get the data for channel array

// Store this "top 10" element as a variable to intert data into
var topTenChannelsElement = document.querySelector('#twitch-top-10');

// Generic error handling for fetch promise
function handleErrors(response) {
  if (!response.ok) {
      throw Error(response);
  }
  return response;
}

// Fetch function that handles HTTP status and network errors
function fetchAPI(init, api, endpoint, params) {
  fetch(api+endpoint+params, init)
    .then(handleErrors)
    .then(function (response) {
      return response.json();
    }).then(function (response) {
      response.data.forEach(element => {
        topTenChannelsElement.innerHTML += '<p>'+ JSON.stringify(element) + '</p>'
      });
    })
    .catch(function(error) {
      alert(error);
    });
  }

fetchAPI(twitchInit, twitchApi, 'users', '?login=deinem&id=1');
fetchAPI(twitchInit, twitchApi, 'streams', '?first=20');

// in a loop output 1 json item to each div
// in a loop or not give a class to each element filled with text (name, followers, )
// button handler(target click) { if (target click) hide/show, else open embed }

