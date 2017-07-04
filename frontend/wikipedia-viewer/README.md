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
- Learned how to make use of "hoisting" to provide a callback function name to the `success` parameter of the ajax call. Before, I was smushing everything into the .done() method which I'm learning can result in what's called [callback hell](http://callbackhell.com/) and isn't "modular".
- Finially found a usecase for Bootstrap's `container-fluid`; I wanted the header and background color to be full width. This is what I get for lazily skipping over the documenation about `container-fluid` vs. `container`.
- Wikimedia API does not return an image URL within the `query` response but it does provide a title of the image. To prevent another API call I found [this solution](http://stackoverflow.com/questions/33689980/get-thumbnail-image-from-wikimedia-commons) to build the URL by replacing spaces with underscores, and assuming the file path by using an MD5 hash of the filename string.
- However! After trying this for a while, it did not seem to be very reliable to get images for every article.
	- the `images` object returns all filenames for an article in no particular order and it includes non-useful images like icons. To solve for this, you'd have to "guess" which image is the best, perhaps by matching filename to article name.
	- the `images` object includes filenames in `.svg` and need to have `.png` appended to the end to prevent a 404 response
	- sometimes the file path did not match the md5 hash string. I think this might be the case for some images like icons, which is just a problem that results from not knowing what the right image is.
- I wasn't able to find the answer in documentation but I found the right call parameters by looking at the calls made on https://www.wikipedia.org/ when using that search form. By including the `pageimages` property and the `piprop: 'thumbnail'` parameter Wikipedia would return a thumbnail source URL if there was one available.
- Recently, whenever plopping ajax data onto a page, I find myself creating custom "card" elements that have some common characteristics:
	- an image
	- a title	
	- a description
	- a button
- conveniently enough, Bootstap (v4-alpha) has a [card](https://v4-alpha.getbootstrap.com/components/card) component that's easy to use and flexible. I put every WikiPedia article description, link, and image into one of these cards.
- This was the first time I really ever tried using [HTML5 semantic elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Content_sectioning) for sectioning my page. I also learned that it's perfectly fine to [add bootsrap classes to any semantic element](http://stackoverflow.com/questions/22133639/bootstrap-and-html5-semantic-tags), which saves one from drowning in a sea of bootsrap row and column `div`s.
- `setTimeout()` can be used to call a function after a delay. This function returns an ID of the timeout which can be used to clear the "countdown" with `clearTimeout()`. This is handy for delaying a search query until a user is "done" typing (assuming the user is done after about half a second of typing a new character)
	- I learned that `setTimeout()` takes a callback function, however, you have to provide it a sneaky anonymous function if you want provide that callback a parameter. This took me like 2 hours to figure out... by reading the documentation.

TODO:

- [X] a nice search bar
- [X] realtime search suggestions
- [X] funny button for Random wiki article view
- [X] clicking article opens a short description
- [X] clicking linked keyword in short description (re-searches & displays) new term description
- [ ] track "deepness". Deepness = (search query * 1) + (search click * 2)
- [ ] donate to WikiPedia link (counter?)

TODO (nice to haves):

- [X] search autocomplete (sorta)
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