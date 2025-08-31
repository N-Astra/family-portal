const db = firebase.firestore();

db.collection("events").orderBy("date", "asc").get().then(snapshot => {
  const list = document.getElementById("eventsList");
  snapshot.forEach(doc => {
    const e = doc.data();
    const li = document.createElement("li");
    li.textContent = `${e.date} - ${e.title}: ${e.description}`;
    list.appendChild(li);
  });
});