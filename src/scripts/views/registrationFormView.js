const overlayEl = document.querySelector(".overlay-full");
const formEl = document.querySelector(".registration-form");

class RegistrationFormView {
  render() {
    formEl.classList.add("active");
    overlayEl.classList.add("active");
  }

  close() {
    overlayEl.classList.remove("active");
    formEl.classList.remove("active");
  }
}

export default new RegistrationFormView();
