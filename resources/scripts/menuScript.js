window.addEventListener("load", initializeMenuButton);

// Initialized the button for the menu in mobile-based layout
function initializeMenuButton() {
    const mainLogo = document.getElementById("menu-container");
    const menuBtn = document.getElementById("menu-button");
    const menuNavigationBar = document.getElementById("header-navigation-bar");

    menuNavigationBar.style.display = "none";
    
    menuBtn.onclick = function() {
        if (menuNavigationBar.style.display == "none") {
            menuNavigationBar.style.display = "flex";
            menuNavigationBar.style.position = "";
            mainLogo.style.position = "fixed";
            window.scrollTo(0,0);
            
        }
        else {
            menuNavigationBar.style.position = "none";
            menuNavigationBar.style.display = "none";
            mainLogo.style.position = "";
        }
    }
}