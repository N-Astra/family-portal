<!-- assets/js/gallery.js -->
<script type="module">
import { storage, ref, uploadBytes, getDownloadURL, listAll } from './firebase.js';

const albumInput = document.getElementById('album');
const filesInput = document.getElementById('files');
const uploadBtn = document.getElementById('uploadBtn');
const grid = document.getElementById('mediaGrid');
const albumFilter = document.getElementById('albumFilter');
const refresh = document.getElementById('refresh');

function tile(url, name) {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(name);
  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card h-100">
        ${isVideo ? `<video controls class="w-100" src="${url}"></video>` : `<img class="card-img-top" src="${url}" alt="">`}
        <div class="card-body small text-muted">${name}</div>
      </div>
    </div>
  `;
}

async function listMedia() {
  grid.innerHTML = '<div class="text-muted">Loading