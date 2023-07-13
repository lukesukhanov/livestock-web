const cartIconEl = document.querySelector(".top-frame__right__cart");

cartIconEl.addEventListener("click", event => {
  event.preventDefault();
  window.location = window.location.origin + "/cart.html";
});
