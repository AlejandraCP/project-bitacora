$("#modal1").modal();

let $btnMessage = $('.btn-message');

let $title = $('#title');
let $message = $('#message');

let $boxContainer = $('.post-container');



const postMessage = () => {
  let template = `<div class="container shadow">
  <h3>${$title.val()}</h3>
  </div>`
  console.log('fs');
  $boxContainer.prepend(template);
  $title.val('');
}
$btnMessage.click(postMessage);
