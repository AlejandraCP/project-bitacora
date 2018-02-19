$('.datepicker').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  today: 'Today',
  clear: 'Clear',
  close: 'Ok',
  closeOnSelect: false // Close upon selecting a date,
});

// Api google maps
var map;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

$("#modal1").modal();
$("#modal2").modal();

let $btnPost = $(".btn-post");
let $title = $("#title");
let $message = $("#message");
let $boxContainer = $(".post-container");
let $titleDate = $('#title-date');
let $inputDate = $('#date');
let $btnMessage = $('.btn-message');
let $btnDate = $('#btn-date');
let $btnPostDate = $('btn-post-date');

const postMessage = () => {
  if ($title.val() !== "" && $message.val() !== '') {
    let template = `<div class="container box-container z-depth-3">
  <h4>${$title.val()}</h4>
  <p>${$message.val()}</p>
  </div>`;
    $boxContainer.prepend(template);
    $title.val("");
    $message.val("");
  }
  else {
    alert('Escribe en todos los espacios');
  }
};

const postDate = () => {
  if ($titleDate.val() !== "" && $inputDate.val() !== '') {
    let template = `<div class="container box-container z-depth-3">
  <h4>${$titleDate.val()}</h4>
  <p>${$inputDate.val()}</p>
  <div id="map">
  </div>
  </div>
  `;
    $boxContainer.prepend(template);
    $titleDate.val("");
    $inputDate.val("");
  }
  else {
    alert('Escribe en todos los espacios');
  }
};

$btnPost.click(postMessage);
$btnDate.click(postDate);


var btnPost = document.getElementById('btn-date');
btnPost.addEventListener('click', initMap);