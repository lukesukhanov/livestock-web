import loginFormView from "../views/loginFormView.js";

const userIconEl = document.querySelector(".top-frame__right__user");

userIconEl.addEventListener("click", event => {
  event.preventDefault();
  loginFormView.render();
});
