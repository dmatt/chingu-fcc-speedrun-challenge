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
        prop: 'extracts|info|pageprops|pageimages',
        pllimit: '10',
        inprop: 'url',  
        redirects: true,
        exintro: true,
        explaintext: true,
        exsentences: '1',
        ppprop: 'displaytitle',
        piprop: 'thumbnail',
        pithumbsize: '500',
        pilimit: '10',
        wbptterms: 'description',
        gpssearch: query,
        gpslimit: '10',
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

  // AJAX search query to WikiPedia, callback to paginate()
  function wikiRandomQuery() {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      type: 'GET',
      dataType: 'json',
      data: {
        action: 'query',
        format: 'json',
        list: 'random',
        rnlimit: '1',
        rnnamespace: '',
        origin: '*'
      },
      success: searchRandom
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
    $('section#searches').empty();
    let pages = Object.keys(data.query.pages);
    pages.forEach(function(page, i){
      renderCard(data.query.pages, page, i);
    });
    $(".word_split").lettering('words');
    wordHandler();
  }

  // Takes random article and adds it to search input, implicit callback to wikiQuery()
  function searchRandom(data /* , textStatus, jqXHR */) {
    console.log(data);
    $('input').val(data.query.random['0'].title).trigger( 'change' );
  }

  // Creates and appends card element for each page of data, callback to imageQuery()
  function renderCard(pages, page, i) {
        newCard = cardTemplate.clone().hide()
        newCard
          .prop('id', 'card-' + i)
        newCard.find( '.card-title' )
          .html(pages[page].title)
        newCard.find( '.link' )
          .prop('href', pages[page].canonicalurl)
        newCard.find( '.card-text' )
          .html(pages[page].extract)
        if (pages[page].thumbnail) {
          newCard.find( '.img-card' )
            .css( 'background-image', 'url('+pages[page].thumbnail.source+')' )
        }
        newCard.appendTo('section#searches').show()
      }
      
  // handles search input during typing, callback to wikiQuery()
  $('input').on('keyup change', function(e) {
    if ($('input').val()) {
      wikiQuery($('input').val());
    }
  });

  // handles click on during typing, callback to wikiRandomQuery()
  $('#wiki-random').click(function(e) {
    wikiRandomQuery();
    keepScore();
  });

  // handles hover and hover off on span words, adds/removes class to highlight the word
  // TODO: some kind of delegated event thing for elements added later http://api.jquery.com/on/
  function wordHandler() {
    $( '.word_split > span' ).hover(function(e) {
      console.log('hover happened', e)
      $(e.target).addClass('marked');
    }, function(e) {
      console.log('hover happened', e)
      $(e.target).removeClass('marked');
    });
    $( '.word_split > span' ).click(function(e) {
      $('input').val($(e.target).text()).trigger( 'change' );
      keepScore()
    });
  }

  let score = 0;

  function keepScore() {
    score++
    $('#deepness').text(score)
  }

  // gets previous searches that are stored in the database
  $.get('/searches', function(searches) {
    searches.forEach(function(search) {
      $('<li></li>').text(search).appendTo('ul#previous-searches');
    });
  });

  // store a search when the user is done typing or clicking a query

  var timeoutID;

  //on keyup (and change), start the countdown
  $('input').on('keyup change', function(){
      clearSearch();
      if ($('input').val()) {
          delayedSearch();
      }
  });

  function delayedSearch() {
    timeoutID = window.setTimeout(() => { storeSearch($('input').val()); } , 1000);
  }

  //user is "finished typing"
  function storeSearch(query) {
    $.post('/searches?' + $.param({search: query}), function() {
          $('<li></li>').text(query).appendTo('ul#previous-searches');
        });
  }

  function clearSearch() {
    window.clearTimeout(timeoutID);
  }
});
