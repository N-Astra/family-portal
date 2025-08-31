<!-- assets/js/profile.js -->
<script type="module">
import { getMember, getAllMembers } from './db.js';

function qs(name) { return new URLSearchParams(location.search).get(name); }

function pill(label) {
  return `<span class="badge rounded-pill text-bg-light badge-relationship me-1">${label}</span>`;
}

(async function init() {
  const id = qs('id');
  const el = document.getElementById('profile');
  if (!id) { el.innerHTML = '<div class="alert alert-warning">No member ID provided.</div>'; return; }

  const m = await getMember(id);
  if (!m) { el.innerHTML = '<div class="alert alert-danger">Member not found.</div>'; return; }

  const all = await getAllMembers();
  const byId = Object.fromEntries(all.map(x => [x.id, x]));

  const relationships = [];
  if (m.fatherId && byId[m.fatherId]) relationships.push(`Father: <a href="profile.html?id=${m.fatherId}">${byId[m.fatherId].name}</a>`);
  if (m.motherId && byId[m.motherId]) relationships.push(`Mother: <a href="profile.html?id=${m.motherId}">${byId[m.motherId].name}</a>`);
  if (m.spouseIds?.length) relationships.push(`Spouse(s): ${m.spouseIds.map(s => `<a href="profile.html?id=${s}">${byId[s]?.name || 'Unknown'}</a>`).join(', ')}`);
  if (m.childrenIds?.length) relationships.push(`Children: ${m.childrenIds.map(c => `<a href="profile.html?id=${c}">${byId[c]?.name || 'Unknown'}</a>`).join(', ')}`);

  el.innerHTML = `
    <div class="row g-4">
      <div class="col-md-4">
        <img class="img-fluid rounded border" src="${m.photoUrl || 'assets/img/placeholder.png'}" alt="">
      </div>
      <div class="col-md-8">
        <h2>${m.name}</h2>
        <div class="text-muted mb-2">${m.bio || ''}</div>
        <div class="mb-2">${relationships.map(pill).join(' ')}</div>
        <ul class="list-group mb-3">
          ${m.dob ? `<li class="list-group-item"><strong>Born:</strong> ${dayjs(m.dob).format('DD MMM YYYY')}</li>` : ''}
          ${m.dod ? `<li class="list-group-item"><strong>Died:</strong> ${dayjs(m.dod).format('DD MMM YYYY')}</li>` : ''}
          ${m.location ? `<li class="list-group-item"><strong>Location:</strong> ${m.location}</li>` : ''}
        </ul>
        <a class="btn btn-outline-secondary" href="profiles.html">Back to profiles</a>
      </div>
    </div>
  `;
})();
</script>