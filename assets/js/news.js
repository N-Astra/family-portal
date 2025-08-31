const db = firebase.firestore();

db.collection("news").orderBy("createdAt", "desc").get().then(snapshot => {
  const container = document.getElementById("newsContainer");
  snapshot.forEach(doc => {
    const n = doc.data();
    const article = document.createElement("div");
    article.innerHTML = `<h3>${n.title}</h3><p>${n.content}</p>`;
    container.appendChild(article);
  });
});