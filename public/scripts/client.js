/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

$(document).ready(function() {

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: (response) => {
        renderTweets(response);
      }
    });
  };

  loadTweets();
  

  $('#submit-tweet').submit( (event) => {
    event.preventDefault();
    const $textarea = $('#tweet-text');
    
    if($textarea.val() === "" || $textarea === null) {
      $('#err-container').addClass('err-msg');
      $('#err-container').append("⚠️ Tweet is empty! ⚠️");
    } else if ($textarea.val().length > 140) {
      $('#err-container').addClass('err-msg');
      $('#err-container').append("⚠️ Tweet shouldn't exceed 140 charachter limit! ⚠️");
    } else {
      $.ajax({
        type: "POST",
        data: $textarea.serialize(),
        url: "/tweets",
        success: function(msg){
          window.location.reload();
       }
      });
    }
  });

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    for (const item of tweets) {
      // calls createTweetElement for each tweet
      item.created_at = timeago.format(item.created_at);
      let tweetElement = createTweetElement(item);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append(tweetElement);
    };
  };

  const createTweetElement = function (tweet) {
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    let tweetContainer = `
          <article class="tweet-container">
            <header>
              <div class="user-avatar"><img src="${tweet.user.avatars}" alt="img"><b>&nbsp;${tweet.user.name}</b></div>
              <div class="user-handle">${tweet.user.handle}</div>
            </header>
            <p class="tweet-text">${safeHTML}</p>
            <footer>
              <div>${tweet.created_at}</div>
              <div class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>
            </footer>
          </article>
    `;
    return tweetContainer;
  };

  // to prevent cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

});