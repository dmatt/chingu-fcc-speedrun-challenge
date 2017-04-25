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
        // TODO: Understand these at https://en.wikipedia.org/w/api.php or somewhere
        action: 'query', //
        generator: 'search', //
        prop: 'extracts|info', //
        inprop: 'url', //
        exsentences: '1', //
        exlimit: 'max', //
        gsrsearch: query //
      }
    })
    .done(function( data ) {
      console.log("success");
      console.log(data);
      // TODO: turn all the object info into html elements, ex. data.query.pages[455682].canonicalurl
      $('<li></li>').text(data.query.pages).appendTo('ul#searches');
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
      $('<li></li>').text(search).appendTo('ul#searches');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var search = $('input').val();
    $.post('/searches?' + $.param({search: search}), function() {
      $('<li></li>').text(search).appendTo('ul#searches');
      $('input').val('');
      $('input').focus();
    });
  });

});
