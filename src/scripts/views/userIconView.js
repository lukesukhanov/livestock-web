const usernameEl = document.querySelector(".top-frame__right__user__username");

/*
 * Methods for rendering a user icon on the top frame.
 */
class UserIconView {
  /*
   * Renders the given username below the user icon.
   */
  renderUsername(username) {
    usernameEl.textContent = username;
  }

  /*
   * Removes the username below the user icon.
   */
  clearUsername() {
    usernameEl.textContent = "Войти";
  }
}

export default new UserIconView();
