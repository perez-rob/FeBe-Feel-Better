const loginForm = async (event) => {
  event.preventDefault();
  const userInfo = document.getElementById("user-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (userInfo && password) {
    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ userInfo, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      document.location.replace("/profile");
    } else {
      alert(res.statusText);
    }
  }
};

const signUp = async (event) => {
  event.preventDefault();
  const username = document.getElementById("username-signup").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();
  const passwordConfirm = document
    .getElementById("password-confirm")
    .value.trim();

  if (password !== passwordConfirm) {
    M.toast({ html: "Passwords must match!" });
    return;
  }

  if (username && email && password) {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      document.location.replace("/profile");
    } else {
      alert(res.statusText);
    }
  }
};

document.getElementById("login-form").addEventListener("submit", loginForm);
document.getElementById("signup-form").addEventListener("submit", signUp);
