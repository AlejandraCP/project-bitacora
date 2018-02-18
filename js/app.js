$("#modal1").modal();

let $btnPost = $(".btn-post");
let $title = $("#title");
let $message = $("#message");
let $boxContainer = $(".post-container");
let $btnMessage = $('.btn-message');

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

$btnPost.click(postMessage);
