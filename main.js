/*
[Fetch Githup Repos]
- Access To Elements
*/

let userInput = document.querySelector("input[type='text']");
let getBtn = document.querySelector(".get-btn");
let reposData = document.querySelector(".show-data");


getBtn.onclick = getRepos;

// Get Repos Function
function getRepos() {

    // if userInput.value is Empty ?
    if (userInput.value == "" || userInput.value == null) {
        reposData.innerHTML = "<span>Place Write Githup UserName</span>";

    } else {
        // Calling fetchRepos Function
        fetchRepos(reposData);
    };
};


// Fetch Repos Data Function
function fetchRepos(data) {

    fetch(`https://api.github.com/users/${userInput.value}/repos`)

    .then(response => response.json())

    // Repos => Repos Data
    .then(repos => {

        // Empty Data >= Repos Data Div
        data.innerHTML = "";

        // Looping On Repos
        for (let i = 0; i < repos.length; i++) {
            let repo = repos[i];

            let repoName = repo.name;
            let repoId = repo.id;

            // Cretae Main Div
            let mainDiv = document.createElement("div");
            mainDiv.className = "repo-box";

            mainDiv.innerHTML = `
                <ul class="list">
                    <li>Repo Name: ${repoName}</li>
                    <li>Repo Id: ${repoId}</li>
                </ul>
            `;

            // Create Repo Url
            let repoUrl = document.createElement("a");
            // Create Repo Url Text
            let reopUrlText = document.createTextNode("Visit");

            // Append reopUrlText To repoUrl
            repoUrl.appendChild(reopUrlText);

            // Add Hypertext Reference (href) To repoUrl
            repoUrl.href = `https://github.com/${userInput.value}/${repoName}`;

            // Open Link In New Window
            repoUrl.setAttribute("target", "_blank");

            // Create Stars Sapn Count Span
            let starsSpan = document.createElement("span");
            // Create Stars Count Text
            let starsCount = document.createTextNode(`Stars ${repo.stargazers_count}`);
            // Append Stars Count To Stras Span
            starsSpan.appendChild(starsCount);

            // Append Stars Sapn To Data(reposData Div)
            mainDiv.appendChild(starsSpan);

            // Append Repo Url To Data(reposData Div)
            mainDiv.appendChild(repoUrl);

            // Append mainDiv To Data(reposData Div)
            data.appendChild(mainDiv);
        };
    });
};