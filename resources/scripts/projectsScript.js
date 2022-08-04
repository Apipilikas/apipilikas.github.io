const projects_url = "https://api.github.com/users/Apipilikas/repos?sort=pushed_at";
const profile_url = "https://api.github.com/users/Apipilikas";

window.onload = init;

var templates = {};
var currentSlidePageNumber = 0;
var slidePagesNumber = 0;
var slidesPerPage = 0;
var latestProjectsData = [];
var div;

templates.profile = Handlebars.compile(`
<div class="username-container">
    <img src={{avatar}}>
    <div class="side-logo">
        <h2>{{username}}</h2>
        <h3>{{name}}</h3>
    </div>
</div>
<div class="info-container">
    <div class="info">
        <img src="resources/images/bio.svg">
        <p>{{bio}}</p>
    </div>
    <div class="info">
        <img src="resources/images/location.svg">
        <p>{{location}}</p>
    </div>
    <div class="info">
        <img src="resources/images/followers.svg">
        <p><span>{{followers}}</span> followers</p>
    </div>
    <div class="info">
        <img src="resources/images/repos.svg">
        <p><span>{{public_repos}}</span> repositories</p>
    </div>
    <div class="info">
        <p>This is my GitHub account! Every project I have implemented is uploaded there!</p>
    </div>
    <div class="button-area">
        <a  href={{link}} class="button-link"><span></span>CHECK MY PROFILE</a>
    </div>
</div>
`);

templates.projects = Handlebars.compile(`
{{#each this}}
<details class="detailed-project">
    <summary>
        <img src="resources/images/git.svg">
        <span>{{title}}</span>
        <div class="stars-container">
            <img src="resources/images/star.svg">
            <span>{{stars}}</span>
        </div>
    </summary>
    <div class="answer">
    hello
    </div>
</details>
{{/each}}
`);

function init() {
    makeProfileRequest();

    makeProjectsRequest();
}

function makeGetRequest(url) {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    let init = {
        method: "GET",
        headers: myHeaders
    };

    return fetch(url, init)
    .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {

        }
    });
}

function makeProfileRequest() {
    let div = document.getElementById('github-profile');
    makeGetRequest(profile_url)
    .then(data => {
        let profile = {
            "username" : data.login,
            "name" : data.name,
            "avatar" : data.avatar_url,
            "link" : data.html_url,
            "location" : data.location,
            "bio" : data.bio,
            "public_repos" : data.public_repos,
            "followers" : data.followers
        };
        
        let profileContent = templates.profile(profile);

        div.innerHTML = profileContent;

    })
    .catch(error => {
        console.log("error");
    });
};

function makeProjectsRequest() {
    let projects = [];
    makeGetRequest(projects_url)
    .then(data => {
        
        for (item of data) {

            let project = {
                "title": item.name,
                "last_modified": item.pushed_at.split("T")[0],
                "description": item.description,
                "link": item.html_url,
                "topics" : item.topics,
                "language" : item.language,
                "stars" : item.stargazers_count
            };

            projects.push(project);
        };

        div = document.getElementById('github-repos');
        
        let projectsContent = templates.projects(projects);

        div.innerHTML = projectsContent;

    })
    .catch(error => {
        console.log("error");
    });
}

function initializeSideButtons() {
    const latestProjectsLeftBtn = document.getElementsByClassName("latest-projects-slideshow-button slideshow-display-button-left")[0];
    const latestProjectsRightBtn = document.getElementsByClassName("latest-projects-slideshow-button slideshow-display-button-right")[0];

    currentSlidePageNumber = 0;
    slidePagesNumber = Math.ceil(latestProjectsData.length / slidesPerPage) - 1;
    console.log(slidePagesNumber);
    
    latestProjectsLeftBtn.style.display = "initial";
    latestProjectsRightBtn.style.display = "initial";
    
    disableSlideButton(latestProjectsLeftBtn);
    enableSlideButton(latestProjectsRightBtn);

    latestProjectsLeftBtn.onclick = function() {
        changeSlidePage(-1, latestProjectsLeftBtn, latestProjectsRightBtn);
    };

    latestProjectsRightBtn.onclick = function() {
        changeSlidePage(1, latestProjectsLeftBtn, latestProjectsRightBtn);
    };

    showLatestProjectsSlideShow();
}

function changeSlidePage(n, leftBtn, rightBtn) {
    currentSlidePageNumber += n;
    console.log(currentSlidePageNumber);
    if (currentSlidePageNumber == 0) {
        // Disable left button
        disableSlideButton(leftBtn);
    }
    else if (currentSlidePageNumber == slidePagesNumber) {
        // Disable right button
        disableSlideButton(rightBtn);
    }
    else {
        // Enable both buttons
        enableSlideButton(leftBtn);
        enableSlideButton(rightBtn);
    }
    
    showLatestProjectsSlideShow();
}

// This function renders the projects data into a HTML code
function showLatestProjectsSlideShow() {
    let latestProjectsContent = templates.latest_projects(getLatestProjects());

    div.innerHTML = latestProjectsContent;
}