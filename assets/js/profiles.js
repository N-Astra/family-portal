<!-- assets/js/profiles.js -->
<script type="module">
import { getAllMembers } from './db.js';

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const filter = document.getElementById('filter');

let members = [];
let view = [];

function card(m) {
  return `
  <div class="col-6 col-md-4 col-lg-3">
    <div class="card h-100">
      <img src="${m.photoUrl || 'assets/img/placeholder.png'}" class="card-img-top" alt="">
      <div class="card-body">
        <h6 class="card-title mb-1">${m.name}</h6>
        <div class="small text-muted">${m.bio ? m.bio.slice(0, 60) : ''}</div>
      </div>
      <div class="card-footer bg-white">
        <a class="btn btn-sm btn-outline-primary w-100" href="profile.html?id=${m.id}">View profile</a>
      </div>
    </div>
  </div>
  `;
}

function render() {
  const q = search.value.toLowerCase();
  view = members.filter(m => m.name.toLowerCase().includes(q)).filter(m => {
    if (filter.value === 'hasBirthday') {
      if (!m.dob) return false;
      return dayjs(m.dob).month() === dayjs().month();
    }
    if (filter.value === 'hasSpouse') return (m.spouseIds?.length || 0) > 0;
    return true;
  });
  grid.innerHTML = view.map(card).join('');
}

(async function init() {
  members = await getAllMembers();
  render();
})();

search.addEventListener('input', render);
filter.addEventListener('change', render);
</script>