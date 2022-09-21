window.addEventListener("scroll", triggerEffect);

function triggerEffect() {
    var containers = document.getElementsByClassName("trigger-effect");
    for (container of containers) {
        let windowHeight = window.innerHeight;
        let containerTop = container.getBoundingClientRect().top;
        let revealPoint = 150;
        let distanceInView = containerTop - windowHeight + revealPoint;

        if (distanceInView < 0) {
            container.classList.add("reveal");
            console.log("trigger")
        }
        else {
            container.classList.remove("reveal");
        }
    }
}