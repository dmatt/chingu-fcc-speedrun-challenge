# Build a Wikipedia Viewer

## Objective

Build an app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/wGqEga/.

## Requirements

* User Story: I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.

* User Story: I can click a button to see a random Wikipedia entry.

**Hint #1:** Here's a URL you can use to get a random Wikipedia article: https://en.wikipedia.org/wiki/Special:Random.

**Hint #2:** Here's an entry on using Wikipedia's API: https://www.mediawiki.org/wiki/API:Main_page.

**Hint #3:** Use this link to experiment with Wikipedia's API.

## Notes

- Used glitch.me node.js template as a starter for this project since it has frontent html, css, js, and backend node code in case I want to extend functionality.
- completed the ajax request after looking at some examples here https://github.com/florinpop17/chingu-fcc-speedrun-challenge/blob/master/frontend/wikipedia-viewer/src/App.js#L18
- tried to use `.forEach` on an object but it is an array method. Woops. I think I need to use `jQuery.each()` instead or combine `Object.keys()` and `Array.prototype.forEach()`:


TODO:

- [ ] a nice search bar
- [X] realtime search suggestions
- [ ] funny button for Random wiki article view
- [ ] clicking article opens a short description
- [ ] clicking linked keyword in short description (re-searches & displays) new term description
- [ ] track "deepness". Deepness = (search query * 1) + (search click * 2)
- [ ] donate to WikiPedia link (counter?)

TODO (nice to haves):

- [ ] search autocomplete
- [ ] a calousel set for interesting wikipedia articles for that day to kickstart interest

Components:

- main page un-searched
- dropdown during search
  - results and no results state
- displayed article & description with CTA new window
- carousel initial interesting results
- deepness counter (local storage) with animation transition

Design ideas:

- desktop and mobile
- corousel is swipey on mobile
- Search and results look nice on mobile