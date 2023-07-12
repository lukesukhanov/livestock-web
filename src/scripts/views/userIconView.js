const usernameEl = document.querySelector(".top-frame__right__user__username");

class UserIconView {
  renderUsername(username) {
    usernameEl.textContent = username;
  }

  clearUsername() {
    usernameEl.textContent = "Войти";
  }
}

export default new UserIconView();
