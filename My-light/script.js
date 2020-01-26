let isLight = false;
function turnTheLight() {
  let img = document.getElementById("light-img");
  let button = document.getElementById("btn-click");
  let title = document.getElementById("title");
  if (isLight) {
    img.src = "light-off.jpg";
    isLight = false;

    button.innerHTML = "Turn on";
    title.innerHTML = "Click this to turn on the light";
  } else {
    img.src = "light-on.jpg";
    isLight = true;

    button.innerHTML = "Turn off";
    title.innerHTML = "Click this to turn off the light";
  }
}
