$('document').ready(function() {
  // Error handler function for getCurrentPosition
  function error(err) {
    document.getElementById('loading').innerHTML = 'ERROR(' + err.code + '): ' + err.message;
  }

  document.getElementById('currently-temp').style.display = 'none';
  document.getElementById('currently-icon').style.display = 'none';
  document.getElementById('currently-summary').style.display = 'none';
  document.getElementById('currently-location').style.display = 'none';

  // Temperature unit conversion on click
  $('#currently-temp-unit').click(function (){
    if ($( this ).html() == '°F') {
      $( this ).html('°C');
      roundTemp = (roundTemp - 32) * 5 / 9;
      $('#currently-temp-number').html(roundTemp.toFixed(1));
    }
    else {
      $( this ).html('°F');
      roundTemp = roundTemp * 9 / 5 + 32;    
      $('#currently-temp-number').html(roundTemp.toFixed(1));
    }
  });

  // Set some global variables that are used throughout
  var coordinates;
  var roundTemp = '0';
  var skycons = new Skycons({'color': 'white'});
  var skycons = new Skycons({'color': 'white'});

  // Check if geolocation is available in browser
  if ('geolocation' in navigator) {

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    // Make call to Google maps API with our successful browser geolocation
    function success(pos) {
      var crd = pos.coords;
      coordinates = crd.latitude + ',' + crd.longitude;

      $.ajax({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        data: {
          key: 'AIzaSyA1Bu8-7_MDfT9oncmZ1KCjoz_2xdrTMFA',
          latlng: coordinates       
        }
      })
      // When the Google API call finishes output city location in HTML
      .done(function(data) {
        document.getElementById('currently-location').innerHTML = data.results['0'].address_components[3].short_name+', '+data.results['0'].address_components[5].short_name;
      }
      );

      // Make API call to darksky to get weather temp and  description
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',            
        url: 'https://api.darksky.net/forecast/907160cda3c3fe28b8a7a2525b827ecc/' + coordinates,
        data: {
          exclude: '[minutely,daily,alerts,flags]'
        },
        units: '[si]',
      })
      // When darksky API call finishes set temperature and weather description to HTML
      .done(function(msg) {
        skycons.add(document.getElementById('currently-icon'), msg.currently.icon);
        skycons.play();
        // Parse the temp string to a float and fix it to 1 pretty decimal point 
        roundTemp = parseFloat(msg.currently.temperature).toFixed(1);
        document.getElementById('currently-temp-number').innerHTML = roundTemp;
        document.getElementById('currently-summary').innerHTML = msg.hourly.summary;
        document.getElementById('currently-temp').style.display = 'inline';
        document.getElementById('currently-icon').style.display = 'inline';
        document.getElementById('currently-summary').style.display = 'inline';
        document.getElementById('currently-location').style.display = 'block';
        document.getElementById('loading').style.display = 'none';  
      });
    }
    // Gets position from browser with multiple callbacks to handle errors
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    /* geolocation IS NOT available */
    alert('Sorry, your browser isn\'t providing a location.');
  }
});
