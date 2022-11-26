$(document).ready(function() {

  // toogle add new tweet form
  $("#new-tweet-btn").on('click', function() {
    $('#add-new-tweet-container').slideToggle();
  });

  // add "on scroll" event to show/hide "scroll to top" btn
  $(document).on('scroll', function() {
    scrollFunction();
  });

  // add on click event to btn to move the page to top
  $("#scroll-top-btn").on('click', topFunction);

});

// show/hide scroll to top btn
const scrollFunction = function() {
  let $scrollTopBtn = $("#scroll-top-btn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $scrollTopBtn.css('display', 'block');
  } else {
    $scrollTopBtn.css('display', 'none');
  }
};

// move html page to top 
const topFunction = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

