const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut();
});

document.getElementById("eventForm").addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("events").add({
    title: document.getElementById("eventTitle").value,
    date: document.getElementById("eventDate").value,
    description: document.getElementById("eventDesc").value
  }).then(() => alert("Event added!"));
});

document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("news").add({
    title: document.getElementById("newsTitle").value,
    content: document.getElementById("newsContent").value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => alert("News added!"));
});