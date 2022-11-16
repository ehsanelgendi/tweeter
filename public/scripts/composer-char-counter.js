$(document).ready(function() {
  const maxLength = $('output.counter').val();

  // listen to keyup to get the number of charachters
  $('#tweet-text').on('keyup',function() {
    const textLength =  $(this).val().length;
    const $counter = $('output.counter');
    $counter.text(maxLength - textLength);

    if ($counter.val() < 0) {
      $counter.addClass('red-counter');
    } else {
      $counter.removeClass('red-counter');
    }

  });
  
});