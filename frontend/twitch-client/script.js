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

var topTenChannelsElement = document.querySelector('#twitch-top-10');

// This needs to return a JSON object, currently something else
function fetchAPI(api, endpoint, params, init) {
  fetch(api+endpoint+params, init).then(function(response) {
    return response.json();
  }).then(function (response) {
    response.data.forEach(element => {
      topTenChannelsElement.innerHTML += element.display_name
    });
  })
}

res = fetchAPI(twitchApi, 'users', '?id=1&44322889', twitchInit, topTenUsers);

// in a loop output 1 json item to each div
// in a loop or not give a class to each element filled with text (name, followers, )
// button handler(target click) { if (target click) hide/show, else open embed }

