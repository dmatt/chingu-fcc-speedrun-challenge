let streams;
var twitchApi = 'https://api.twitch.tv/kraken/'
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
  if (!response.ok) throw Error(response);
  return response;
}

// Fetch function that handles HTTP status and network errors
function fetchAPI(init, api, endpoint, params) {
  fetch(api+endpoint+params, init)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => 
      HTMLize(response)
    )
    .catch(error => console.log(error));
  }

// TODO: figure out how to remove HTMLize from fetchAPI and do that after 
// fetchAPI(twitchInit, twitchApi, 'users', '?login=deinem&id=1');
// to build user id : display name object
fetchAPI(twitchInit, twitchApi, 'streams', '?first=10');

// Loop through data and output on page with corresponding class names
let targetElement = document.querySelector('#place-0');

function HTMLize(response) {
  streams = response.streams
  console.log("streams= ", streams)
    response.streams.forEach( (obj, i) =>
    Object.keys(obj).forEach( function (attributeName) {
      switch (attributeName) {
        case 'preview':
          let thumbnailElement = document.createElement("img");
          thumbnailElement.classList = "card-text card-img-top";
          let newthumbnailUrl = obj.preview.large;
          thumbnailElement.src = newthumbnailUrl;
          document.querySelector('#place-'+i).parentNode.prepend(thumbnailElement);
        break;
        case 'channel':
          let titleElement = document.createElement("h5");
          titleElement.classList = "card-title";
          titleElement.innerHTML = obj.channel.display_name;
          document.querySelector('#place-'+i).appendChild(titleElement);
          let textElement = document.createElement("p");
          textElement.classList = "card-text";
          textElement.innerHTML = obj.channel.status;
          document.querySelector('#place-'+i).appendChild(textElement);
        break;
      }
    }
    )
  );
  return response
}

document.querySelectorAll('.expand, .watch').forEach(function() {addEventListener("click", handleClick, false)});

function handleClick(e) {
  // open / close the clicked parent div with every click
  if (e.target.classList.contains("expand")) {
    event.target.parentElement.querySelector('.card-text').classList.toggle('collapsed');
    let collapseButtonState = event.srcElement
    collapseButtonState.innerHTML == '🐵' ? collapseButtonState.innerHTML = '🙈' : collapseButtonState.innerHTML = '🐵';
  }
  // start a new twitch viewer with the desired channel
  else if (e.target.classList.contains("watch")) {
    console.log(e.target)
    let nextChannel;
    e.target.id == "watch-10" ? nextChannel = "freecodecamp" : nextChannel = streams[e.target.id.split("-")[1]].channel.name
    document.querySelector("#twitch-embed").innerHTML = null;
    new Twitch.Embed("twitch-embed", {
      width: 600,
      channel: nextChannel,
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
} 