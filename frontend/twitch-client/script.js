let topTenUsers;
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
  if (!response.ok) throw Error(response);
  return response;
}

// Fetch function that handles HTTP status and network errors
function fetchAPI(init, api, endpoint, params) {
  fetch(api+endpoint+params, init)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => HTMLize(response))
    .catch(error => alert(error));
  }

// fetchAPI(twitchInit, twitchApi, 'users', '?login=deinem&id=1');
fetchAPI(twitchInit, twitchApi, 'streams', '?first=10');

// Loop through data and output on page with corresponding class names
let targetElement = document.querySelector('#place-0');

function HTMLize(response) {
  response.data.forEach( (obj, i) =>
    Object.keys(obj).forEach( function (attributeName) {
      let titleElement = document.createElement("h5");
      switch (attributeName) {
        case 'title':
          titleElement.classList = "card-title";
          titleElement.innerHTML = obj[attributeName];
        break;
      }
      document.querySelector('#place-'+i).appendChild(titleElement);
      document.querySelector('#expand-'+i).addEventListener("click", handleClick, false);
    }
    )
  );
}

function handleClick(event) {
  // open / close the clicked parent div with every click
  console.log(event)
  event.srcElement.nextElementSibling.classList.toggle('collapsed');
  let collapseButtonState = event.srcElement
  collapseButtonState.innerHTML == '🐵' ? collapseButtonState.innerHTML = '🙈' : collapseButtonState.innerHTML = '🐵';
}