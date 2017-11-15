let topTenChannels = [];
let statsObject = {};
var streams = 'https://api.twitch.tv/helix/streams'
var myHeaders = new Headers({
  "Client-ID": "lnr7ybs8r23c75ogxck7pi5br73rje"
});
var myInit = { method: 'GET',
headers: myHeaders,
mode: 'cors',
cache: 'default' };

// function to fetch API and handles variables
// function to get the top 10 channels
// function to get the data for channel array
// 

var topTenChannelsElement = document.querySelector('#twitch-top-10');

fetch(streams, myInit).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  topTenChannels = myBlob // URL.createObjectURL(myBlob);
  // myImage.src = objectURL;
});

console.log('hi this is some  fun twitchy stuff');
