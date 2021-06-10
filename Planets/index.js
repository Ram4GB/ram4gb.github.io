var scroll =
    window.requestAnimationFrame ||
    function (callback) {
        setTimeout(callback, 1000 / 60);
    };
var elementsToShow = null;

function loop() {
    elementsToShow.forEach(function (element) {
        if (isElementInViewport(element)) {
            console.log(1);
            element.classList.add("is-visible");
        } else {
            console.log(2);
            element.classList.remove("is-visible");
        }
    });
    scroll(loop);
}

function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >=
            (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top <=
                (window.innerHeight ||
                    document.documentElement.clientHeight)) ||
        (rect.top >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight))
    );
}

function randomStar() {
    let els = document.getElementsByClassName("star");
    for (let i = 0; i < els.length; i++) {
        els[i].remove();
    }

    for (let i = 0; i < 30; i++) {
        let el = document.createElement("div");
        el.style.left =
            Math.floor(Math.random() * window.document.body.offsetWidth) + "px";
        el.style.bottom =
            Math.floor(Math.random() * window.document.body.offsetHeight) +
            "px";
        el.style.width = Math.floor(Math.random() * 5) + 5 + "px";
        el.style.height = el.style.width;
        el.classList.add("star");

        document.body.appendChild(el);
    }
}

window.onload = function () {
    elementsToShow = document.querySelectorAll(".show-on-scroll");

    loop();
    randomStar();

    new fullpage("#fullpage", {
        autoScrolling: true,
        scrollHorizontally: true,
        anchors: [
            "Page1",
            "Page2",
            "Page3",
            "Page4",
            "Page5",
            "Page6",
            "Page7",
        ],
        navigationTooltips: [
            "Mercury",
            "Venus",
            "Earth",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
        ],
        menu: "#myMenu",
        navigation: true,
        scrollingSpeed: 1000,

        dropEffect: true,
        onLeave: function (origin, destination, direction) {
            requestAnimationFrame(randomStar);
        },
    });
};
