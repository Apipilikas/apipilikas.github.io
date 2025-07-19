import { LoadResourcesUtils } from "./utils/loadResourcesUtils.js";

const url = "https://api.github.com/users/Apipilikas/repos?sort=pushed_at";
const path = "../files/main";

window.onload = init;

var templates = {};
var currentSlidePageNumber = 0;
var slidePagesNumber = 0;
var slidesPerPage = 0;
var latestProjectsData = [];
var div;
var data;

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

templates.liferoad = Handlebars.compile(`
{{#each this}}
<div class="liferoad">
    <div class="main-info">
        <h3>{{title}}</h3>
        <h4>{{subtitle}}</h4>
    </div>
    <p class="description">{{description}}</p>
    <div class="timeline">
        <p>TO <span>{{timeline.to}}</span></p>
        <p>FROM <span>{{timeline.from}}</span></p>
    </div>
</div>
{{/each}}
`);

templates.news = Handlebars.compile(`
{{#each this}}
<article class="news">
    <div class="title-container">
        <div class="border"></div>
        <h3>{{title}}</h3>
    </div>
    <div class="date-container">
        <div class="border"></div>
        <p class="date">{{date}}</p>
    </div>
    <div class="description-container">
        <div class="border"></div>
        <p class="description">
            {{description}}
        </p>
    </div>
</article>
{{/each}}
`);

async function init() {
    data = await LoadResourcesUtils.loadJSON("main");
    div = document.getElementById('latest-projects-content');
    makeLatestProjectsRequest();


    renderLiferoadSection();
    renderNewsSection();
    renderAboutMeSection();
    //initializeMenuButton();
}

/* This function makes a GET request to the GitHub API. We want to fetch
   all the public repositories for me, displaying only the main information,
   such as name, last modification date, description and link to the github repo. */
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

        for (let item of data) {

            let project = {
                "title": item.name,
                "update_date": item.pushed_at.split("T")[0],
                "description": item.description,
                "link": item.html_url
            };

            latestProjectsData.push(project);
        };

        slidesPerPage = 4;

        // We use the following to determine how many projects/slides will be displayed in every page.
        let mediaQueryTablet = window.matchMedia("only screen and (min-width: 425px)");
        let mediaQueryDesktop = window.matchMedia("only screen and (min-width: 992px)");

        if (mediaQueryDesktop.matches) {
            // Desktop layout
            slidesPerPage = 4;
        }
        else if (mediaQueryTablet.matches) {
            // Tablet layout
            slidesPerPage = 2;
        }
        else {
            // Mobile layout
            slidesPerPage = 1;
        }

        initializeSideButtons();

        /* If screen resolution changes, changes will also be occurred in page display.
           This part of code can be skipped, given that website will be displayed in a fixed screen resolution.
           Nevertheless, to improve responsiveness, the code will remain as it is. */
        mediaQueryDesktop.onchange = function(e) {
            if (e.matches) {
                // Desktop layout
                slidesPerPage = 4;
            }
            else {
                // Tablet layout
                slidesPerPage = 2;
            }
            initializeSideButtons();
        }

        mediaQueryTablet.onchange = function(e) {
            if (e.matches) {
                // Tablet layout
                console.log("Tablet")
                slidesPerPage = 2;

            }
            else {
                // Mobile layout
                slidesPerPage = 1;

                
            }
            initializeSideButtons();
        }        
    })
    .catch(error => {
        showNoResultFoundContent();
        console.log(error);
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

function showNoResultFoundContent() {
    div.innerHTML = "<span class=\"no-result-found-error\">No results found</span>";
}

function showMoreLatestProjects() {
    let latestProjectsContent = templates.latest_projects(getLatestProjects());

    div.innerHTML += latestProjectsContent;
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
    let lastIndex = currentSlidePageNumber*slidesPerPage + slidesPerPage;
    
    if (lastIndex > latestProjectsData.length) {
        lastIndex = latestProjectsData.length;
    }
    
    for (var i = currentSlidePageNumber * slidesPerPage; i < lastIndex; i++) {
        latestProjectsSubData.push(latestProjectsData[i]);
    }
    
    return latestProjectsSubData;
}

function renderAboutMeSection() {
    const description = document.querySelector("#main-about-me-section .description > p");
    description.innerHTML = data.aboutMe;
}

function renderLiferoadSection() {
    const liferoadContent = document.querySelector("#liferoad-section .content");
    liferoadContent.innerHTML = templates.liferoad(data.liferoad);
}

function renderNewsSection() {
    const liferoadContent = document.querySelector("#news-section .content");
    liferoadContent.innerHTML = templates.news(data.news);
}