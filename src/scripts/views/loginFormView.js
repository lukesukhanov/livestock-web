const overlayEl = document.querySelector(".overlay-full");
const loginFormBoxEl = document.querySelector(".login-form-box");
const loginFormEl = document.querySelector(".login-form-box__login-form");

class LoginFormView {
  render() {
    loginFormBoxEl.classList.add("active");
    overlayEl.classList.add("active");
  }

  close() {
    overlayEl.classList.remove("active");
    loginFormBoxEl.classList.remove("active");
    this.#clearInputs();
    this.clearErrors();
  }

  #clearInputs() {
    for (let inputEl of loginFormEl.elements) inputEl.value = null;
  }

  renderErrors(errors) {
    for (let error of errors) {
      const inputEl = loginFormEl.elements[error];
      inputEl.classList.add("error");
    }
  }

  clearErrors() {
    for (let inputEl of loginFormEl.elements) inputEl.classList.remove("error");
  }
}

export default new LoginFormView();
