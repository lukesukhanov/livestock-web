const overlayFullEl = document.querySelector(".overlay-full");
const overlayBodyEl = document.querySelector(".overlay-body");
const bodyEl = document.querySelector("body");

class OverlayView {
  renderFullOverlay() {
    overlayFullEl.classList.add("active");
    bodyEl.classList.add("noscroll");
  }

  closeFullOverlay() {
    overlayFullEl.classList.remove("active");
    bodyEl.classList.remove("noscroll");
  }

  toggleFullOverlay() {
    overlayFullEl.classList.toggle("active");
    bodyEl.classList.toggle("noscroll");
  }

  renderBodyOverlay() {
    overlayBodyEl.classList.add("active");
    bodyEl.classList.add("noscroll");
  }

  closeBodyOverlay() {
    overlayBodyEl.classList.remove("active");
    bodyEl.classList.remove("noscroll");
  }

  toggleBodyOverlay() {
    overlayBodyEl.classList.toggle("active");
    bodyEl.classList.toggle("noscroll");
  }
}

export default new OverlayView();
