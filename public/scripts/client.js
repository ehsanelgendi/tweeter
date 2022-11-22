/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


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
    // console.log();
    const $textarea = $('#tweet-text');
    
    if($textarea.val() === "" || $textarea === null) {
      alert("Tweet is empty!");
    } else if ($textarea.val().length > 140) {
      alert("Tweet shouldn't exceed 140 charachter limit!");
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
      // console.log(tweetElement);
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