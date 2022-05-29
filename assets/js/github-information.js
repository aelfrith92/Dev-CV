function userInformationHTML(user) {
  // riferimenti dell'oggetto user e rispettive chiavi al link
  // https://docs.github.com/en/rest/users/users#get-a-user
  return `
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

function fetchGitHubInformation(event) {

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
    $.getJSON(`https://api.github.com/users/${username}`)
  ).then(
    // So when that is done, then what we want to do is to display it somehow in our gh-user-data div.
    // For that, we have another function, response(), which the first argument
    // is the response that came back from our getJSON() method.
    function(response) {
      // And we're going to store that in another variable called userData.
      var userData = response;
      // Then we can use our jQuery selectors to select the gh-user-data div and set the
      // HTML to the results of another function called userInformationHTML().
      $("#gh-user-data").html(userInformationHTML(userData));
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
