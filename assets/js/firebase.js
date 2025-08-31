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
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBRtcPlCS7bvILNPNysSDHKbM0zp4patSY",
    authDomain: "valiyaparambil.firebaseapp.com",
    projectId: "valiyaparambil",
    storageBucket: "valiyaparambil.firebasestorage.app",
    messagingSenderId: "157607413961",
    appId: "1:157607413961:web:f1787fd97057cc42f82518",
    measurementId: "G-1Q0E39G2DC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
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