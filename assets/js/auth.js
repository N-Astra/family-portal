<!-- assets/js/auth.js -->
<script type="module">
import { auth, onAuthStateChanged, signOut } from './firebase.js';

const authBtn = document.getElementById('authBtn');

onAuthStateChanged(auth, (user) => {
  if (authBtn) {
    if (user) {
      authBtn.textContent = 'Sign out';
      authBtn.classList.remove('btn-outline-primary');
      authBtn.classList.add('btn-primary');
      authBtn.href = '#';
      authBtn.onclick = async (e) => { e.preventDefault(); await signOut(auth); location.reload(); };
    } else {
      authBtn.textContent = 'Sign in';
      authBtn.classList.add('btn-outline-primary');
      authBtn.classList.remove('btn-primary');
      authBtn.href = 'login.html';
    }
  }
});

// Simple guard to restrict admin page
if (location.pathname.endsWith('admin.html')) {
  onAuthStateChanged(auth, (user) => {
    if (!user) location.href = 'login.html';
  });
}
</script>