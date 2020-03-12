$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
        `<li class="message">
          <div class="message__upper-info">
            <p class="message__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="message__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <div class="message__lower-message">
            <p class="message__lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </li>`
      return html;
    } else {
      var html =
        `<li class="message">
          <div class="message__upper-info">
            <p class="message__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="message__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <div class="message__lower-message">
            <p class="message__lower-message__content">
              ${message.content}
            </p>
          </div>
        </li>`
      return html;
    }
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.message-list').append(html);      
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
})