const overlayEl = document.querySelector(".overlay-full");
const registrationFormEl = document.querySelector(".registration-form");

/*
 * Methods for rendering a registration form.
 */
class RegistrationFormView {
  /*
   * Renders a registration form.
   */
  render() {
    registrationFormEl.classList.add("active");
    overlayEl.classList.add("active");
  }

  /*
   * Closes a registration form.
   */
  close() {
    overlayEl.classList.remove("active");
    registrationFormEl.classList.remove("active");
    this.#clearInputs();
    this.clearErrors();
  }

  #clearInputs() {
    for (let inputEl of registrationFormEl.elements) inputEl.value = null;
  }

  /*
   * Renders incorrect inputs of the registration form using an array with the names of the
   * incorrect inputs.
   */
  renderErrors(errors) {
    for (let error of errors) {
      const inputEl = registrationFormEl.elements[error];
      inputEl.classList.add("error");
    }
  }

  /*
   * Removes incorrect status from each input of the registration form.
   */
  clearErrors() {
    for (let inputEl of registrationFormEl.elements) inputEl.classList.remove("error");
  }
}

export default new RegistrationFormView();
