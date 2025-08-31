<!-- assets/js/tree.js -->
<script type="module">
import { getAllMembers } from './db.js';

// Build a mapping of relationships and render a collapsible tree
function buildHierarchy(members) {
  const byId = Object.fromEntries(members.map(m => [m.id, { ...m, children: [] }]));
  let roots = [];

  // Link children to parents if parent IDs exist
  members.forEach(m => {
    if (m.fatherId && byId[m.fatherId]) byId[m.fatherId].children.push(byId[m.id]);
    else if (m.motherId && byId[m.motherId]) byId[m.motherId].children.push(byId[m.id]);
  });

  // Roots are those without recorded parents
  roots = members.filter(m => !m.fatherId && !m.motherId).map(m => byId[m.id]);
  return { roots, byId };
}

function createNodeEl(member) {
  const el = document.createElement('div');
  el.className = 'tree-node d-flex align-items-center gap-2 py-1';
  el.innerHTML = `
    <img class="avatar" src="${member.photoUrl || 'assets/img/placeholder.png'}" alt="">
    <div>
      <a href="profile.html?id=${member.id}" class="fw-semibold text-decoration-none">${member.name}</a>
      ${member.spouseIds?.length ? `<div class="small text-muted">Spouse(s): ${member.spouseIds.length}</div>` : ''}
    </div>
  `;
  return el;
}

function renderTree(container, roots) {
  roots.forEach(root => {
    const branch = document.createElement('div');
    branch.appendChild(createNodeEl(root));

    // Toggleable children
    if (root.children?.length) {
      const toggle = document.createElement('button');
      toggle.className = 'btn btn-sm btn-outline-secondary ms-2';
      toggle.textContent = 'Toggle';
      branch.appendChild(toggle);

      const childrenWrap = document.createElement('div');
      childrenWrap.className = 'tree-children mt-2';
      root.children.forEach(ch => {
        const childBranch = document.createElement('div');
        childBranch.appendChild(createNodeEl(ch));
        if (ch.children?.length) {
          // Recursively render grandchildren
          const sub = document.createElement('div');
          sub.className = 'tree-children mt-2';
          renderTree(sub, ch.children);
          childBranch.appendChild(sub);
        }
        childrenWrap.appendChild(childBranch);
      });

      branch.appendChild(childrenWrap);
      toggle.addEventListener('click', () => {
        childrenWrap.style.display = childrenWrap.style.display === 'none' ? '' : 'none';
      });
    }

    container.appendChild(branch);
  });
}

(async function init() {
  const container = document.getElementById('treeContainer');
  container.innerHTML = '<div class="text-muted">Loading tree…</div>';
  const members = await getAllMembers();
  const { roots } = buildHierarchy(members);
  container.innerHTML = '';
  if (!roots.length) {
    container.innerHTML = '<div class="alert alert-info">No members yet. Sign in and add members in Admin.</div>';
    return;
  }
  renderTree(container, roots);
})();
</script>