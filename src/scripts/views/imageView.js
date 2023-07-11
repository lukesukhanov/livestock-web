class ImageView {
  render(imageEl, imageObjectUrlPromise) {
    imageObjectUrlPromise.then(imageUrl => (imageEl.src = imageUrl));
  }
}

export default new ImageView();
