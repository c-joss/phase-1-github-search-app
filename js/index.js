document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.github.com/search/users?q=octocat", {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => user(data.items))
    .catch(error => console.error("Error getting user", error));
});

function user(users) {
    const userList = document.getElementById("user-list");
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    }
    users.forEach(user => {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = user.html_url;
        link.textContent = user.login;
        link.target = "_blank";
        link.style.marginRight = "10px";

        const img = document.createElement("img");
        img.src = user.avatar_url;
        img.alt = user.login;
        img.width = 100;
        img.height = 100;
        img.style.borderRadius = "50%";

        const repo = document.createElement("a");
        repo.className = "repo";
        repo.href = "#";
        repo.textContent = "View Repo List";
        repo.style.marginRight = "10px"

        repo.addEventListener("click", function (e) {
            e.preventDefault();
            fetchUserRepos(user.login);
        });

        li.appendChild(img);
        li.appendChild(link);
        li.appendChild(repo)
        userList.appendChild(li);
    });
}

function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => displayRepos(data, username))
    .catch(error => console.error("Error getting repos", error));
}

function displayRepos(repos, username) {
    const repoList = document.getElementById("repos-list");
    while (repoList.firstChild) {
        repoList.removeChild(repoList.firstChild);
    }

        const heading = document.createElement("h3");
        heading.textContent = `${username}'s Repositories`;
        repoList.appendChild(heading);

        repos.forEach(repo => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = repo.html_url;
            link.textContent = repo.name;
            link.target = "_blank";

            li.appendChild(link);
            repoList.appendChild(li);
        });

        repoList.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputField = form.querySelector("input");
        const result = inputField.value.trim().toUpperCase();
        const userItems = userList.getElementsByTagName("li");

        Array.from(userItems).forEach(li => {
            const username = li.textContent.trim().toUpperCase();
            if (result === "" || username.includes(result)) {
                li.style.display = "list-item";
            } else {
                li.style.display = "none";
            }
        });
    });
});

