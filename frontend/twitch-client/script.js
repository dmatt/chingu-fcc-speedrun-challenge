let topTenUsers;
let statsObject = {};
var twitchApi = 'https://api.twitch.tv/helix/'
var myHeaders = new Headers({
  "Client-ID": "lnr7ybs8r23c75ogxck7pi5br73rje"
});
var twitchInit = { method: 'GET',
headers: myHeaders,
mode: 'cors',
cache: 'default' };

// function to fetch API and handles variables
// function to get the top 10 channels
// function to get the data for channel array

var topTenChannelsElement = document.querySelector('#twitch-top-10');

function fetchAPI(api, endpoint, params, init, targetElement) {
  fetch(api+endpoint+params, init).then(function(response) {
    return response.blob();
  }).then(function(myBlob) {
    targetElement = myBlob // URL.createObjectURL(myBlob);
    // myImage.src = objectURL;
  });
}

fetchAPI(twitchApi, 'users', '?id=1', twitchInit, topTenUsers);

console.log(topTenUsers);
