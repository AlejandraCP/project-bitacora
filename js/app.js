$(document).ready(function() {
  // funcionalidad Materialize
  $('.modal').modal();
  Materialize.updateTextFields();


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
      template = ` <div class="row center-align">
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
      container.append(template);
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
        template = ` <div class="row center-align">
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
        template = ` <div class="row center-align">
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
      
      container.append(template);
    }
    clearInput();
  });
});