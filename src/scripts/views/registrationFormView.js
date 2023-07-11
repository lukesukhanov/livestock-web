const overlayEl = document.querySelector(".overlay-full");
const registrationFormEl = document.querySelector(".registration-form");

class RegistrationFormView {
  render() {
    registrationFormEl.classList.add("active");
    overlayEl.classList.add("active");
  }

  close() {
    overlayEl.classList.remove("active");
    registrationFormEl.classList.remove("active");
    this.#clearInputs();
    this.clearErrors();
  }

  #clearInputs() {
    for (let inputEl of registrationFormEl.elements) inputEl.value = null;
  }

  renderErrors(errors) {
    for (let error of errors) {
      const inputEl = registrationFormEl.elements[error];
      inputEl.classList.add("error");
    }
  }

  clearErrors() {
    for (let inputEl of registrationFormEl.elements) inputEl.classList.remove("error");
  }
}

export default new RegistrationFormView();
