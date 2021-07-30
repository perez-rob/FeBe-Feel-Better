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
      console.log(res);
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
    M.toast({ html: "Passwords must match, try again" });
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
      const resMsg = await res.json();

      console.log(resMsg);
      switch (resMsg.errors[0].message) {
        case "user.username must be unique":
          M.toast({ html: "Username taken, choose a different one" });
          break;
        case "user.email must be unique":
          M.toast({
            html: "Email already in use, try logging in or use a different one",
          });
          break;
        case "Validation len on password failed":
          M.toast({ html: "Passwords must be at least 8 characters" });
          break;
        case "Validation isEmail on email failed":
          M.toast({ html: "Please enter a valid email address" });
          break;
        default:
          M.toast({ html: "Server error, please try again later" });
      }
    }
  }
};


$(document).ready(function(){
  $('.parallax').parallax();
});


document.getElementById("login-form").addEventListener("submit", loginForm);
document.getElementById("signup-form").addEventListener("submit", signUp);
