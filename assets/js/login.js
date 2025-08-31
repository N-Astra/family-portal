const auth = firebase.auth();

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("loginMessage").innerText = "Login successful!";
      window.location.href = "admin.html";
    })
    .catch(err => {
      document.getElementById("loginMessage").innerText = err.message;
    });
});