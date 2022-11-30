/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

$(document).ready(function() {

  // create ajax call to get the tweets from server
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
  

  // add event on button submit to check the tweet validity then create post call to server
  $('#submit-tweet').submit((event) => {
    event.preventDefault();
    $('#err-container').removeClass('err-msg');
    $('#err-container').empty();
    const $textarea = $('#tweet-text');
    // check if tweet textarea is empty or reached max characters
    if ($textarea.val() === "" || $textarea === null) {
      $('#err-container').addClass('err-msg');
      $('#err-container').append("⚠️ Tweet is empty! ⚠️");
    } else if ($textarea.val().length > 140) {
      $('#err-container').addClass('err-msg');
      $('#err-container').append("⚠️ Tweet shouldn't exceed 140 charachter limit! ⚠️");
    } else {
      // ajax call to post the new tweet
      $.ajax({
        type: "POST",
        data: $textarea.serialize(),
        url: "/tweets",
        success: function() {
          loadTweets();
        }
      });
    }
  });

  // take tweets object and prepend each tweet to the tweet element in html
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    for (const item of tweets) {
      // use timeago to get the time in the "ago" format
      item.created_at = timeago.format(item.created_at);
      let tweetElement = createTweetElement(item);
      // takes return value and prepend it to the tweets container in reverse chronological order
      $('#tweets-container').prepend(tweetElement);
    }
  };

  const createTweetElement = function(tweet) {
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    let tweetContainer = `
          <article class="tweet-container">
            <header>
              <div class="user-avatar"><img src="${tweet.user.avatars}" alt="img"><b>&nbsp;${tweet.user.name}</b></div>
              <div class="user-handle">${tweet.user.handle}</div>
            </header>
            <div class="tweet-text">
              <p>${safeHTML}</p>
            </div>
            <footer>
              <div>${tweet.created_at}</div>
              <div class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>
            </footer>
          </article>
    `;
    return tweetContainer;
  };

  // to prevent cross-site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

});