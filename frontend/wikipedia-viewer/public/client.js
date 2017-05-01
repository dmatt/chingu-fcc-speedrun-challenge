// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');

  $('input').keyup(function(event) {
    let query = $('input').val();
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      type: 'GET',
      dataType: 'json',
      data: {
        format: 'json',
        origin: '*',
        action: 'query',
        generator: 'search',
        prop: 'extracts|info',
        inprop: 'url',
        exintro: true,
        explaintext: true,
        exsentences: '1',
        exlimit: 'max',
        gsrsearch: query
      }
    })
    .done(function( data ) {
      console.log("success");
      console.log(data);
      $('div#searches').empty();
      let pages = Object.keys(data.query.pages);
      pages.forEach(function(page) {

        // Link element
        let link = $( "<a/>", {
          html: data.query.pages[page].title,
          href: data.query.pages[page].canonicalurl,
          class: 'card-link col-md-12'
        })["0"].outerHTML

        // Description element
        let description = $( "<div/>", {
          html: data.query.pages[page].extract,
          class: 'description col-md-8'
        })["0"].outerHTML

        // Thumbnail element
        let thumb = $( "<div/>", {
          // html: '<img src="'+'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Spaghetti-prepared.jpg/500px-Spaghetti-prepared.jpg'+'"/>',
          html: '',
          class: 'thumb col-md-4'
        })["0"].outerHTML

        // Info element: combines description and thumb
        let info = $( "<div/>", {
          html: description + thumb,
          class: 'row'
        })["0"].outerHTML


        // Creating a new div and link element
        let card = $( "<div/>", {
          html: link + info,
          class: 'wiki-card row well'
        })

        // Append the card to our search results
        card.appendTo('div#searches');

      });
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  });
  
  $.get('/searches', function(searches) {
    searches.forEach(function(search) {
      $('<div class="wiki-card"></div>').text(search).appendTo('div#searches');
    });
  });

/*  $('form').submit(function(event) {
    event.preventDefault();
    var search = $('input').val();
    $.post('/searches?' + $.param({search: search}), function() {
      $('<li></li>').text(search).appendTo('ul#searches');
      $('input').val('');
      $('input').focus();
    });
  });*/
});
