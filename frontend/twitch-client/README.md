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
- Bye

TODO:

- [ ] find some top 10 leaderboard designs that look nice
- [ ] Figure out which stats are most important on twitch
- [ ] API request that gets top 10, put usernames into array
- [ ] API request that gets status for top 10 users
- [ ] If user doesn't exist, have error state

TODO (nice to haves):

- [ ] Loads embed stream live on page