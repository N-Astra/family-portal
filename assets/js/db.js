<!-- assets/js/db.js -->
<script type="module">
import { db, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from './firebase.js';

const col = (name) => collection(db, name);

async function getAllMembers() {
  const snap = await getDocs(query(col('members'), orderBy('name')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function getMember(id) {
  const d = await getDoc(doc(db, 'members', id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}

async function upsertMember(member) {
  if (member.id) {
    await updateDoc(doc(db, 'members', member.id), member);
    return member.id;
  } else {
    const ref = await addDoc(col('members'), { ...member, createdAt: serverTimestamp() });
    return ref.id;
  }
}

async function deleteMember(id) {
  await deleteDoc(doc(db, 'members', id));
}

async function getPosts() {
  const snap = await getDocs(query(col('posts'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function addPost(post) {
  return addDoc(col('posts'), { ...post, createdAt: serverTimestamp() });
}

async function getEvents() {
  const snap = await getDocs(query(col('events'), orderBy('date')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function upsertEvent(evt) {
  if (evt.id) return updateDoc(doc(db, 'events', evt.id), evt);
  return addDoc(col('events'), evt);
}

export { getAllMembers, getMember, upsertMember, deleteMember, getPosts, addPost, getEvents, upsertEvent };
</script>