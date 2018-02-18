$(document).ready(function () {

  // funcionalidad Materialize
  $('.modal').modal();


  // variables elementos dom
  const preview = $('.preview-image');
  const file = $('#files');
  const container = $('.container');
  const titleImage = $('.title-image');
  const sendImage =$('#btn-send');



  // función de capturar file Image
  function renderImage(file) {
    var reader = new FileReader();
    reader.onload = function (event) {
      url = event.target.result;
      localStorage.url = url;
      preview.html(`<img class="preview-image" src="${url}" />`)
    }
    reader.readAsDataURL(file);
  }

  function clearInput(){
    preview.html('');
    localStorage.url = '';
    titleImage.val('');
  }

  // Cargar la imagen desde el usuario
  file.change(function () {
    let fileImage = this.files[0];
    if (fileImage.type.match('image.*')) {
      renderImage(fileImage)
    } else {
      alert('Inserta solo archivos tipo : .jpg, .png , .jpeg o .gif');
    }
  });

  // Publicar Imagen
 sendImage.on('click', function () {
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
    </div>`
      container.append(template);
    }
    clearInput();

  })

});