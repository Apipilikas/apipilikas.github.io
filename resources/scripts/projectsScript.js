const projects_url = "https://api.github.com/users/Apipilikas/repos?sort=pushed_at";
const profile_url = "https://api.github.com/users/Apipilikas";

window.onload = init;

var templates = {};

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
    <div class="content">
        <div class="top-container">
            <p>{{last_modified}}</p>        
            {{#each languages}}
            <p>{{this}}</p>
            {{/each}}
        </div>
        <p>{{description}}</p>
        <div class="button-area">
            <a class="button-link" href={{link}}><span></span>CHECK ON GITHUB</a>
        </div>
    </div>
</details>
{{/each}}
`);

function init() {
    makeProfileRequest();

    makeProjectsRequest();

    initializeMenuButton();
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

    makeGetRequest(projects_url)
    .then(data => {

        let fetches = [];

        for (let item of data) {
            
            let promise = makeGetRequest(item.languages_url)
            .then(languageData => {

                let project = {
                    "title": item.name,
                    "last_modified": item.pushed_at.split("T")[0],
                    "description": item.description,
                    "link": item.html_url,
                    "topics" : item.topics,
                    "languages" : Object.keys(languageData),
                    "stars" : item.stargazers_count
                };

                return project;

            })
            .catch(error => {
                console.log("error");
            });
            
            fetches.push(promise);
            
        };

        return Promise.all(fetches)
        .then(values => {
            console.log(values)
            return values;
        });
    })
    .then(projectsData => {
        console.log(projectsData);
        let div = document.getElementById('github-repos');
        
        let projectsContent = templates.projects(projectsData);

        div.innerHTML = projectsContent;
    })
    .catch(error => {
        console.log(error);
    });
}