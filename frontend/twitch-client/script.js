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

// function to get the top 10 channels
// function to get the data for channel array

// Store this "top 10" element as a variable to intert data into
var topTenChannelsElement = document.querySelector('#twitch-top-10');

// Generic error handling for fetch promise
var handleErrors = response => {
  if (!response.ok) {
      throw Error(response);
  }
  return response;
}

// Fetch function that handles HTTP status and network errors
function fetchAPI(init, api, endpoint, params, targetElement) {
  fetch(api+endpoint+params, init)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => HTMLize(response, targetElement))
    .catch(error => alert(error));
  }

// fetchAPI(twitchInit, twitchApi, 'users', '?login=deinem&id=1');
fetchAPI(twitchInit, twitchApi, 'streams', '?first=20', topTenChannelsElement);

// Loop through data and output on page with corresponding class names
function HTMLize(response, targetElement) {
  response.data.forEach(obj =>
    Object.keys(obj).forEach(attributeName => 
      targetElement.innerHTML += '<p class="'+ attributeName +'">' + attributeName + obj[attributeName] + '</p>'
    )
  );
}

// in a loop or not give a class to each element filled with text (name, followers, )
// button handler(target click) { if (target click) hide/show, else open embed }
