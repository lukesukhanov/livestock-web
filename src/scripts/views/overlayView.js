const overlayFullEl = document.querySelector(".overlay-full");
const overlayBodyEl = document.querySelector(".overlay-body");
const bodyEl = document.querySelector("body");

/*
 * Methods for rendering an overlay.
 */
class OverlayView {
  /*
   * Renders an overlay on the full window.
   */
  renderFullOverlay() {
    overlayFullEl.classList.add("active");
    bodyEl.classList.add("noscroll");
  }

  /*
   * Closes an overlay on the full window.
   */
  closeFullOverlay() {
    overlayFullEl.classList.remove("active");
    bodyEl.classList.remove("noscroll");
  }

  /*
   * Toggles an overlay on the full window.
   */
  toggleFullOverlay() {
    overlayFullEl.classList.toggle("active");
    bodyEl.classList.toggle("noscroll");
  }

  /*
   * Renders an overlay on the 'body' element.
   */
  renderBodyOverlay() {
    overlayBodyEl.classList.add("active");
    bodyEl.classList.add("noscroll");
  }

  /*
   * Closes an overlay on the 'body' element.
   */
  closeBodyOverlay() {
    overlayBodyEl.classList.remove("active");
    bodyEl.classList.remove("noscroll");
  }

  /*
   * Toggles an overlay on the 'body' element.
   */
  toggleBodyOverlay() {
    overlayBodyEl.classList.toggle("active");
    bodyEl.classList.toggle("noscroll");
  }
}

export default new OverlayView();
