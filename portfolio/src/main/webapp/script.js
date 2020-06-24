// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function getContent() {
    console.log('Retrieving content...')
    fetch('/data').then(response => response.text()).then(responseText => JSON.parse(responseText)).then(dat =>{
        var badge = document.getElementById("badge");
        //badge.innerHTML = '<ol id="posts-list" class="hfeed">';
        var badgeStr = '<ol id="posts-list" class="hfeed">';
        //document.getElementById('comment-container').innerText = response.text();
        for (let comment_obj of dat){
            var name = comment_obj.name;
            var comment = comment_obj.comment;
            var score = comment_obj.score;
            var timestamp = comment_obj.timestamp;
            var date = new Date(timestamp * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();
            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            badgeStr += '<li><article id="comment_" class="hentry">' + '<footer class="post-info">'+ '<div class="published">'+formattedTime+'</div>'+'<address class="author">'+'By '+ name+'</address>'+'</footer>'+'<div class="entry-content">'+'<p>'+comment+'</p>'+'</div>'+'</article></li>';
        }
        badge.innerHTML = badgeStr + '</ol>';
    });
}





/**
 * Adds a random greeting to the page.
 */
/*function addRandomGreeting() {
  const greetings =
      ['For the honor of Grayskull!', 'Cookie Cat!',
      'I am Sailor Moon! And now in the name of Moon I\'ll punish you!', 'See you Space Cowboy...'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}*/
