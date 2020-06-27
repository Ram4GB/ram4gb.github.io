/**
 * This is the script for navbar
 */

const clickNavbar = () => {
  let content = document.getElementById("overplay-content");
  let overplay = document.getElementsByClassName("overplay")[0];

  if (overplay.classList.contains("overplay--active")) {
    overplay.classList.remove("overplay--active");
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  } else {
    openOverplay(`
    <ul class="overplay__list">
        <li onClick="closeNavbar()" class="overplay__item">
            <a class="overplay__link" href="#">sản phẩm</a>
        </li>
        <li onClick="closeNavbar()" class="overplay__item">
            <a class="overplay__link" href="#">nam</a>
        </li>
        <li onClick="closeNavbar()" class="overplay__item">
            <a class="overplay__link" href="#">nữ</a>
        </li>
        <li onClick="closeNavbar()" class="overplay__item">
            <a class="overplay__link" href="#">giảm giá</a>
        </li>
    </ul>
    `);
  }
};

const closeNavbar = () => {
  let content = document.getElementById("overplay-content");
  content.innerHTML = "";
  let overplay = document.getElementsByClassName("overplay")[0];
  overplay.classList.remove("overplay--active");
  document.getElementsByTagName("body")[0].style.overflow = "auto";
};

const onScroll = () => {
  let y = window.scrollY;
  let menu = document.getElementsByClassName("menu")[0];

  if (y >= 60) {
    menu.classList.add("menu__fixed");
  } else {
    menu.classList.remove("menu__fixed");
  }
};

const ready = () => {
  let isOpenThisWebiste = localStorage.getItem("isOpen");
  if (!isOpenThisWebiste) {
    openOverplay(`
      <div class="introduction">
          <img
            class="introduction__gif"
            src="https://media.giphy.com/media/10UeedrT5MIfPG/giphy.gif"
            alt=""
          />
          <p class="introduction__text">
            Xin chào mừng bạn tới với trang Ananas của Ram4GB. Website vẫn
            đang trong quá trình xây dựng. Cảm ơn bạn.
          </p>
      </div>
      `);
    localStorage.setItem("isOpen", "I_KNOW_YOU_WILL_FIND_ME.LOVE YOU GUYS.");
  }
};

const openOverplay = (s) => {
  let overplay = document.getElementsByClassName("overplay")[0];
  let content = document.getElementById("overplay-content");
  content.innerHTML = s;

  overplay.classList.add("overplay--active");
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
};

window.onload = function () {
  document.getElementById("btn-toggle").onclick = clickNavbar;
  document.getElementById("close-btn-toggle").onclick = closeNavbar;
  document.onscroll = onScroll;
  ready();
};
