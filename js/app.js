
// funcionalidad Materialize
$('.modal').modal();


// variables elementos dom
const preview = $('.preview-image');
const file = $('#files');
const container = $('.container');
const titleImage = $('.title-image');
const titleAudioVideo = $('.title-audio-movie');
const sendImage = $('#btn-send');
const btnAudioVideo = $('#btn-video-audio');
const fileMovie = $('#file-movie');


// función de capturar file Image
function renderImage(file) {
  var reader = new FileReader();
  reader.onload = function(event) {
    url = event.target.result;
    localStorage.url = url;
    preview.html(`<img class="preview-image" src="${url}" />`);
  };
  reader.readAsDataURL(file);
}

function playAudio(file, type) {
  url = URL.createObjectURL(file);
  localStorage.url = url;
  localStorage.type = type;
}


function clearInput() {
  preview.html('');
  localStorage.url = '';
  titleImage.val('');
  $('.file-path').val('');
  localStorage.type = '';
}

// Cargar la imagen desde el usuario
file.change(function() {
  let fileImage = this.files[0];
  if (fileImage.type.match('image.*')) {
    renderImage(fileImage);
  } else {
    alert('Inserta solo archivos tipo : .jpg, .png , .jpeg o .gif');
  }
});

fileMovie.change(function() {
  let fileMovieAudio = this.files[0];
  let type;

  if (fileMovieAudio.type.match('audio.*')) {
    type = 'audio';
    playAudio(fileMovieAudio, type);
  } else if (fileMovieAudio.type.match('video.*')) {
    type = 'video';
    playAudio(fileMovieAudio, type);
  } else {
    alert('Selecciona solo formatos de audio y video');
  }
});

// Publicar Imagen
sendImage.on('click', function() {
  let urlImage = localStorage.url;
  let textTitle = titleImage.val();
  let template;
  if (urlImage) {
    template = ` <div class="row center-align z-depth-3">
      <div class="col s12 m12">
        <div class="card">
          <div class="card-image">
            <img class="responsive-img" src="${urlImage}">
          </div>
          <div class="card-content">
            <p class="title">${textTitle}</p>
          </div>
        </div>
      </div>
    </div>`;
    container.prepend(template);
  }
  clearInput();
});

btnAudioVideo.on('click', function() {
  let urlAudioVideo = localStorage.url;
  let typeFile = localStorage.type;
  let textTitle = titleAudioVideo.val();
  let template;
  if (urlAudioVideo) {
    if (typeFile === 'video') {
      template = ` <div class="row center-align z-depth-3">
        <div class="col s12 m12">
          <div class="card">
            <div class="card-image">
            <video class="responsive-video" src="${url}" controls></video>
            </div>
            <div class="card-content">
              <p class="title">${textTitle}</p>
            </div>
          </div>
        </div>
      </div>`;
    }
    if (typeFile === 'audio') {
      template = ` <div class="row center-align z-depth-3">
        <div class="col s12 m12">
          <div class="card">
          <div class="card-content">
              <p class="title">${textTitle}</p>
            </div>
            <div class="card-image">
            <audio src="${url}" controls></audio>
            </div>
            
          </div>
        </div>
      </div>`;
    }
      
    container.prepend(template);
  }
  clearInput();
});
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
    center: {lat: -34.397,
      lng: 150.644},
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

$('#modal1').modal();
$('#modal2').modal();

let $btnPost = $('.btn-post');
let $title = $('#title');
let $message = $('#message');
let $boxContainer = $('.post-container');
let $titleDate = $('#title-date');
let $inputDate = $('#date');
let $btnMessage = $('.btn-message');
let $btnDate = $('#btn-date');
let $btnPostDate = $('btn-post-date');

const postMessage = () => {
  if ($title.val() !== '' && $message.val() !== '') {
    let template = `<div class="container box-container z-depth-3">
  <h4>${$title.val()}</h4>
  <p>${$message.val()}</p>
  </div>`;
    $boxContainer.prepend(template);
    $title.val('');
    $message.val('');
  } else {
    alert('Escribe en todos los espacios');
  }
};

const postDate = () => {
  if ($titleDate.val() !== '' && $inputDate.val() !== '') {
    let template = `<div class="container box-container z-depth-3">
  <h4>${$titleDate.val()}</h4>
  <p>${$inputDate.val()}</p>
  <div id="map">
  </div>
  </div>
  `;
    $boxContainer.prepend(template);
    $titleDate.val('');
    $inputDate.val('');
  } else {
    alert('Escribe en todos los espacios');
  }
};

$btnPost.click(postMessage);
$btnDate.click(postDate);


var btnPost = document.getElementById('btn-date');
btnPost.addEventListener('click', initMap);
