const input = document.querySelector(".get-repos input");
const getButton = document.querySelector(".get-button");
const reposData = document.querySelector(".show-data");

getButton.addEventListener("click", () => {
  getRepos();
});

async function getRepos() {
  if (input.value === "") {
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    const response = await fetch(
      `https://api.github.com/users/${input.value}/repos`
    );

    if (response.status === 404) {
      reposData.innerHTML = "There is No Account with this UserName";
      throw new Error("No Repositories Found");
    }

    const data = await response.json();

    reposData.innerHTML = "";

    data.forEach((repo) => {
      let mainDiv = document.createElement("div");
      let repoName = document.createTextNode(repo.name);
      mainDiv.appendChild(repoName);

      let theUrl = document.createElement("a");
      let theUrlText = document.createTextNode("Visit");
      theUrl.appendChild(theUrlText);
      theUrl.href = `https://api.github.com/users/${input.value}/${repo.name}`;
      theUrl.setAttribute("target", "_blank");
      mainDiv.appendChild(theUrl);

      let starsSpan = document.createElement("span");
      let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
      starsSpan.appendChild(starsText);
      mainDiv.appendChild(starsSpan);

      mainDiv.className = "repo-box";
      reposData.appendChild(mainDiv);
    });
  }
}
