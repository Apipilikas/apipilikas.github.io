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
        <h2>{{title}}</h2>
        <div class="stars-container">
            <span class="stars">{{stars}}</span>
        </div>
    </summary>
    <div class="content">
        <div class="top-container">
            <div class="last-modified-container project-container">
                <h3>Last modified</h3>
                <div class="content">
                    <span>{{lastModified}}</span>
                </div>
            </div>   
            {{#if topics}}
                <div class="topics-container project-container">
                    <h3>Topics</h3>
                    <div class="content">
                        {{#each topics}}
                            <span>{{this}}</span>
                        {{/each}}
                    </div>
                </div>
            {{/if}}
            {{#if languages}}
                <div class="development-languages-container project-container">
                    <h3>Development languages</h3>
                    <div class="content">
                        {{#each languages}}
                        <span>{{this}}</span>
                        {{/each}}
                    </div>
                </div>
            {{/if}}
        </div>
        <div class="description-container">
            <h3>Description</h3>
            <p>{{description}}</p>
        </div>
        <div class="button-area">
            <a class="button-link" href={{link}}><span></span>CHECK ON GITHUB</a>
            {{#if moreDetails}}
                <a class="button-link" href="/projects/{{title}}.html"><span></span>MORE DETAILS</a>
            {{/if}}
        </div>
    </div>
</details>
{{/each}}
`);

templates.failureMessage = Handlebars.compile(`
<img src="resources/images/attention.svg">
<p>I'am very sorry to inform you that you got a response with status 403 and message <span>{{message}}</span>Don't panik.
You got this as I use the GitHub API to fetch all the information needed for my personal profile and repositories.
To be able to refresh and see the page properly, you will have to wait for an hour or so. However, if you would like to
check my profile and all the projects that was supposed to be displayed in this page, check my Github account here:
<a  href="https://github.com/Apipilikas" class="button-link"><span></span>CHECK MY PROFILE</a>
</p>
 
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
        else if (response.status == 403) {
            
            response.json().then(failureDataMessage => {
                let div = document.getElementById('hint-container');

                let failure = templates.failureMessage(failureDataMessage);

                div.innerHTML = failure;
            }

            );
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

                let result = checkFileExistence("/projects/" + item.name + ".html");

                let project = {
                    "title": item.name,
                    "lastModified": item.pushed_at.split("T")[0],
                    "description": item.description,
                    "link": item.html_url,
                    "topics" : item.topics,
                    "languages" : Object.keys(languageData),
                    "stars" : item.stargazers_count,
                    "moreDetails": result
                };

                return project;

            })
            .catch(error => {
                console.log(error);
            });
            
            fetches.push(promise);
            
        };

        return Promise.all(fetches)
        .then(values => {
            return values;
        });
    })
    .then(projectsData => {
        let div = document.getElementById('github-repos');
        
        let projectsContent = templates.projects(projectsData);

        div.innerHTML += projectsContent;
    })
    .catch(error => {
        console.log(error);
    });
}

function checkFileExistence(path) {
    let file = new XMLHttpRequest();
    file.open("HEAD", path, false);
    file.send();

    if (file.status == 200) {
        return true;
    }
    else {
        return false;
    }

}