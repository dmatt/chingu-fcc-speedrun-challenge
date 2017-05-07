// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');

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
        prop: 'extracts|info|pageprops|pageimages|pageterms',
        inprop: 'url',
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
    pages.forEach(function(page){
      renderCard(data.query.pages, page);
    });
  }

  // Creates and appends card element for each page of data, callback to imageQuery()
  function renderCard(pages, page) {
        // Link element
        let link = $( "<a/>", {
          html: pages[page].title,
          href: pages[page].canonicalurl,
          class: 'card-link col-md-12'
        })["0"].outerHTML

        // Description element
        let description = $( "<div/>", {
          html: pages[page].extract,
          class: 'description col-md-8'
        })["0"].outerHTML

        // builds thumnail URL by assuming the slug structure
        // let filepath = pages[page].images["0"].title.split('File:')[1].split(' ').join('_');
        // let filename = filepath;
        // if (filename.slice(-4) === '.svg') {
        //   filename += '.png'
        // }
        // let imageHash = md5(filepath);
        // console.log(imageHash, imageHash.slice(0, 2), 'cats'.slice(0, 2));
        // let imageSlug = imageHash[0]+'/'+imageHash.slice(0, 2)+'/'+filepath+'/'+'200px-'+filename;
        // let imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/'+imageSlug;
        
        if (pages[page].thumbnail) {
          var thumb = $( "<div/>", {
            html: '<img src="'+pages[page].thumbnail.source+'"/>',
            class: 'thumb col-md-4'
          })["0"].outerHTML;
        } else {
          var thumb = $( "<div/>", {
            html: '<img src="missing-cat.jpg"/>',
            class: 'thumb col-md-4'
          })["0"].outerHTML;
        }

        console.log('thumb', thumb)

        // Info element: combines description and thumb
        let info = $( "<div/>", {
          html: description + thumb,
          class: 'row'
        })["0"].outerHTML

        // Creating a new card div
        let card = $( "<div/>", {
          html: link + info,
          class: 'wiki-card row well'
        })
        // Append the card to our search results
        card.appendTo('div#searches');
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
