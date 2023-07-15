const cartIconEl = document.querySelector(".top-frame__right__cart");

/*
 * Opens the '/cart' page after clicking on the 'cart' button on the top frame.
 */
cartIconEl.addEventListener("click", event => {
  event.preventDefault();
  window.location = window.location.origin + "/cart.html";
});
