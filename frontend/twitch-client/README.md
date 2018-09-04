# Use the Twitchtv JSON API

## Objective

Build an app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/Myvqmo/.

## Requirements

* User Story: I can see whether Free Code Camp is currently streaming on Twitch.tv.

* User Story: I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.

* User Story: if a Twitch user is currently streaming, I can see additional details about what they are streaming.

* User Story: I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed). You can verify this works by adding brunofin and comster404 to your array of Twitch streamers.

**Hint:** Here's an array of the Twitch.tv usernames of people who regularly stream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

**UPDATE:** Due to a change in conditions on API usage explained here Twitch.tv now requires an API key, but we've built a workaround. Use https://wind-bow.gomix.me/twitch-api instead of twitch's API base URL (i.e. https://api.twitch.tv/kraken ) and you'll still be able to get account information, without needing to sign up for an API key.

## Notes

- TIL CSS and JavaScript can not target IDs that start with a number https://stackoverflow.com/questions/22141358/why-can-an-element-id-not-start-with-an-integer. I was using `n-place` for each div ID, and had to update this to `place-n`.
- To set a div height equal to text height (used in collapsed style), set an explicit `line-height` and use the same value for div `height`
- `rem` units in CSS are just a unit of whatever the page root font size is, keeps all sizes relative to font size `1rem`, `2.5rem` etc.
- In script.js I have a function that takes json data, loops through it, and inserts it into pre-created elements. Would probably be better if I used https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template and just cloned templates and insert new data. Simple example of this `index.html` and `components/nav.html` (first time using this html5 feature!).
- Can add event listenters to many elements within a class like `document.querySelectorAll('.expand, .watch').forEach(function() {addEventListener( [...] )`

TODO:

- [X] find some top 10 leaderboard designs that look nice
- [ ] Figure out which stats are most important on twitch
- [X] API request that gets top 10, put usernames into array
- [X] API request that gets status for top 10 users
- [X] If user doesn't exist, have error state
- [ ] Add freeCodeCamp user status
- [ ] Style cleanup

TODO (nice to haves):

- [X] Loads embed stream live on page
- [X] Styles
- [ ] Link to dmatt.github.io

