const url = "https://api.github.com/users/Apipilikas/repos?sort=pushed_at";

window.onload = init;

var templates = {};
var currentSlidePage = 0;
var slidePagesNumber = 0;
var latestProjectsData = [];
var div;

templates.latest_projects = Handlebars.compile(`
{{#each this}}
<article class="project">
    <div class="git-repo-date-info">
        <h3>{{title}}</h3>
        <p>{{update_date}}</p>
    </div>
    <p>{{description}}</p>
    <div class="git-link">
        <a class="button-link subject-link-more" href="{{link}}"><span></span>MORE</a>
    </div>
    </article>
{{/each}}
`);

function init() {
    div = document.getElementById('latest-projects-content');
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

        for (item of data) {

            let project = {
                "title": item.name,
                "update_date": item.pushed_at.split("T")[0],
                "description": item.description,
                "link": item.html_url
            };

            latestProjectsData.push(project);
        };

        slidePagesNumber = Math.floor(latestProjectsData.length / 4);
    
        initializeButtons();
        
    })
    .catch(error => {
        showNoResultFoundContent();
        console.log("error");
    });
}

function initializeButtons() {
    const latestProjectsLeftBtn = document.getElementsByClassName("latest-projects-slideshow-button slideshow-display-button-left")[0];
    const latestProjectsRightBtn = document.getElementsByClassName("latest-projects-slideshow-button slideshow-display-button-right")[0];
    
    latestProjectsLeftBtn.style.display = "initial";
    latestProjectsRightBtn.style.display = "initial";
    
    disableSlideButton(latestProjectsLeftBtn);

    latestProjectsLeftBtn.onclick = function() {
        changeSlidePage(-1, latestProjectsLeftBtn, latestProjectsRightBtn);
    };

    latestProjectsRightBtn.onclick = function() {
        changeSlidePage(1, latestProjectsLeftBtn, latestProjectsRightBtn);
    };

    showLatestProjectsSlideShow();
}

function changeSlidePage(n, leftBtn, rightBtn) {
    console.log("clicked");
    currentSlidePage += n;
    if (currentSlidePage == 0) {
        //disable left button
        disableSlideButton(leftBtn);
    }
    else if (currentSlidePage == slidePagesNumber) {
        //disable right button
        disableSlideButton(rightBtn);
    }
    else {
        //enable both buttons
        enableSlideButton(leftBtn);
        enableSlideButton(rightBtn);
    }
    
    showLatestProjectsSlideShow();
}

function showLatestProjectsSlideShow() {
    let latestProjectsContent = templates.latest_projects(getLatestProjects);

    div.innerHTML = latestProjectsContent;
}

function showNoResultFoundContent() {
    div.innerHTML = "<span class=\"no-result-found-error\">No results found</span>";
}

function enableSlideButton(button) {
    button.disabled = false;
    button.children[0].style.display = "inline";
}

function disableSlideButton(button) {
    button.disabled = true;
    button.children[0].style.display = "none";
}

function getLatestProjects() {
    let latestProjectsSubData = [];
    let lastIndex = currentSlidePage*4 + 4;
    
    if (lastIndex > latestProjectsData.length) {
        lastIndex = latestProjectsData.length;
    }
    
    for (var i = currentSlidePage * 4; i < lastIndex; i++) {
        latestProjectsSubData.push(latestProjectsData[i]);
    }
    
    return latestProjectsSubData;
}