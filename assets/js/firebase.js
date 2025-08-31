<!-- assets/js/firebase.js -->
<script type="module">
// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, addDoc, collection, getDocs, query, where, updateDoc, orderBy, serverTimestamp, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL, listAll
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Replace with your Firebase config from console
const firebaseConfig = {
  apiKey: "AIzaSyBRtcPlCS7bvILNPNysSDHKbM0zp4patSY",
  authDomain: "valiyaparambil.firebaseapp.com",
  projectId: "valiyaparambil",
  storageBucket: "valiyaparambil.firebasestorage.app",
  messagingSenderId: "157607413961",
  appId: "1:157607413961:web:575e3d477099ce49f82518",
  measurementId: "G-1HF77ZZS4E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  db, doc, getDoc, setDoc, addDoc, collection, getDocs, query, where, updateDoc, orderBy, serverTimestamp, deleteDoc,
  storage, ref, uploadBytes, getDownloadURL, listAll
};
</script>