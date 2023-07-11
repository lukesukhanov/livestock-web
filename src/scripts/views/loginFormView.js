const overlayEl = document.querySelector(".overlay-login-form");
const formEl = document.querySelector(".login-form");

class LoginFormView {
  render() {
    formEl.classList.add("active");
    overlayEl.classList.add("active");
  }

  close() {
    overlayEl.classList.remove("active");
    formEl.classList.remove("active");
  }
}

export default new LoginFormView();
