// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  let cardTemplate = $( "#card-template" );
  cardTemplate.hide();

  // AJAX search query to WikiPedia, callback to paginate()
  function wikiQuery(query) {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      type: 'GET',
      dataType: 'json',
      data: {
        action: 'query',
        format: 'json',
        generator: 'prefixsearch',
        prop: 'extracts|info|pageprops|pageimages|iwlinks',
        iwprop: 'url',
        inprop: 'url',
        iwprefix: true,
        iwlimit: '10',
        redirects: true,
        exintro: true,
        explaintext: true,
        exsentences: '1',
        ppprop: 'displaytitle',
        piprop: 'thumbnail',
        pithumbsize: '160',
        pilimit: '6',
        wbptterms: 'description',
        gpssearch: query,
        gpslimit: '6',
        exlimit: 'max',
        imlimit: 'max',        
        origin: '*',
      },
      success: paginate
    })
    .done(function() {
      console.log("done");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    })
  }

  // Paginates through each page, callback to renderCard()
  function paginate(data /* , textStatus, jqXHR */) {
    console.log(data);
    $('div#searches').empty();
    let pages = Object.keys(data.query.pages);
    pages.forEach(function(page, i){
      renderCard(data.query.pages, page, i);
    });
  }

  // Creates and appends card element for each page of data, callback to imageQuery()
  function renderCard(pages, page, i) {
        newCard = cardTemplate.clone().hide()
        newCard
          .prop('id', 'card-' + i)
        newCard.find( '.card-title' )
          .html(pages[page].title)
        newCard.find( '.btn' )
          .prop('href', pages[page].canonicalurl)
        newCard.find( '.card-text' )
          .html(pages[page].extract)
        if (pages[page].thumbnail) {
          newCard.find( '.card-img-top' )
            .prop('src', pages[page].thumbnail.source)
        } else {
          newCard.find( '.card-img-top' )
            .prop('src', '')
        }
        newCard.appendTo('div#searches').show()
      }
      
  // handles search input during typing, callback to wikiQuery()
  $('input').keyup(function(event) {
    wikiQuery($('input').val());
  });
  
  // gets previous searches that are stored in the database
  $.get('/searches', function(searches) {
    searches.forEach(function(search) {
      $('<div class="wiki-card"></div>').text(search).appendTo('div#searches');
    });
  });

// consider storing a search when the user is done typing a query. How?

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
