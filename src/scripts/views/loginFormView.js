const overlayEl = document.querySelector(".overlay-full");
const loginFormBoxEl = document.querySelector(".login-form-box");
const loginFormEl = document.querySelector(".login-form-box__login-form");

/*
 * Methods for rendering a login form.
 */
class LoginFormView {
  /*
   * Renders a login form.
   */
  render() {
    loginFormBoxEl.classList.add("active");
    overlayEl.classList.add("active");
  }

  /*
   * Closes a login form.
   */
  close() {
    overlayEl.classList.remove("active");
    loginFormBoxEl.classList.remove("active");
    this.#clearInputs();
    this.clearErrors();
  }

  #clearInputs() {
    for (let inputEl of loginFormEl.elements) inputEl.value = null;
  }

  /*
   * Renders incorrect inputs of the login form using an array with the names of the incorrect
   * inputs.
   */
  renderErrors(errors) {
    for (let error of errors) {
      const inputEl = loginFormEl.elements[error];
      inputEl.classList.add("error");
    }
  }

  /*
   * Removes incorrect status from each input of the login form.
   */
  clearErrors() {
    for (let inputEl of loginFormEl.elements) inputEl.classList.remove("error");
  }
}

export default new LoginFormView();
