function userInformationHTML(user) {
  // riferimenti dell'oggetto user e rispettive chiavi al link
  // https://docs.github.com/en/rest/users/users#get-a-user
  return
    `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
  if (repos.length == 0) {
    return `<div class="clearfix repo-list">No repos!</div>`
  }

  // If, however, data has been returned, then since it's an array, we want
  // to iterate through it and get that information out.
  // To do that, we're going to create a variable called listItemsHTML.
  var listItemsHTML = repos.map(function(repo) {
    return `<li>
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`;
  });
  console.log(listItemsHTML);
  return
    `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;

}

function fetchGitHubInformation(event) {
  $('#gh-user-data').html('');
  $('#gh-repo-data').html('');

  var username = $("#gh-username").val();
  if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
    return;
  }

  $("#gh-user-data").html(
    `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
    </div>`
  );

  // So now we can issue the promise.
  $.when(
    // So what we're going to do here is pass in a function.
    // And that function is going to be the getJSON() function.
    // In here, we can pass in the address of our GitHub API: https://api.github.com/users.
    // And then the value of username that we've obtained from our input box.
    // Esempio di response body da GET request di un user
    // https://docs.github.com/en/rest/users/users#get-a-user
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    // So when that is done, then what we want to do is to display it somehow in our gh-user-data div.
    // For that, we have another function, response(), which the first argument
    // is the response that came back from our getJSON() method. Two responses if 2 calls
    // have been made
    function(firstResponse, secondResponse) {
      // And we're going to store that in another variable called userData.
      var userData = firstResponse[0];
      var repoData = secondResponse[0];
      console.log(repoData);
      // Then we can use our jQuery selectors to select the gh-user-data div and set the
      // HTML to the results of another function called userInformationHTML().
      $("#gh-user-data").html(userInformationHTML(userData));
      $('#gh-repo-data').html(repoInformationHTML(repoData));
    },
    // So let's add an error() function here.
    // Our function takes an errorResponse.
    // And we're going to say that if the errorResponse.status === 404
    // (remember, that's a not found error), then what we're going to do is select
    // our gh-user-data div and set its HTML to an error message that says the user wasn't found.
    function(errorResponse) {
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(
          `<h2>No info found for user ${username}</h2>`);
      } else {
        console.log(errorResponse);
        $("#gh-user-data").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
      }
    });
}

// The next thing I want to do is have the octocat profile displaying when the page
// is loaded, instead of just having an empty div.
// To do this, we're going to use the documentReady() function in jQuery and execute
// the fetchGitHubInformation() function when the DOM is fully loaded.
// By just adding that one line in, we can see that when I refresh the page now,
// octocat's profile is automatically displayed when the page is loaded.
$(document).ready(fetchGitHubInformation);
