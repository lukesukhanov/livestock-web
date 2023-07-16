/*
 * Methods for rendering an image.
 */
class ImageView {
  /*
   * Renders an image in the given element using existing Promise with the image object URL.
   */
  render(imageEl, imageObjectUrlPromise) {
    imageObjectUrlPromise.then(imageUrl => (imageEl.src = imageUrl));
  }
}

export default new ImageView();
