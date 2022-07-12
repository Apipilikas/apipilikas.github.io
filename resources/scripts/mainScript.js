const url = "https://api.github.com/users/Apipilikas/repos?sort=pushed_at";

window.onload = init;

var templates = {};

templates.latest_projects = Handlebars.compile(`
{{#each this}}
<article class="latest-project">
    <div class="git-repo-date-info">
        <h3>{{title}}</h3>
        <h4>{{update_date}}</h4>
    </div>
    <p>{{description}}</p>
    <div class="git-link">
        <a class="button-link subject-link-more" href="{{link}}">MORE</a>
    </div>
    </article>
{{/each}}
`);

function init() {
    makeLatestProjectsRequest();
}

function makeLatestProjectsRequest() {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    let init = {
        method: "GET",
        headers: myHeaders
    };

    fetch(url, init)
    .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {

        }
    })
    .then(data => {

        let latestProjectsData = [];

        for (i=0; i < 4; i++) {
            let item = data[i];

            let project = {
                "title": item.name,
                "update_date": item.pushed_at,
                "description": item.description,
                "link": item.html_url
            };

            latestProjectsData.push(project);
        };

        let latestProjectsContent = templates.latest_projects(latestProjectsData);

        const div = document.getElementById('latest-projects');
        console.log(latestProjectsContent);
        div.innerHTML += latestProjectsContent;
    })
    .catch(error => {
        console.log("error");
    });
}