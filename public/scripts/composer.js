$(document).ready(function(){

  // toogle add new tweet form 
  $("#new-tweet-btn").on('click', function() {
    $('#add-new-tweet-container').slideToggle();
  });

  $(document).on('scroll', function() {
    scrollFunction();
  });

});

const scrollFunction = function () {
  let $scrollTopBtn = $("#scroll-top-btn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $scrollTopBtn.css('display', 'block');
  } else {
    $scrollTopBtn.css('display', 'none');;
  }
}

const topFunction = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

