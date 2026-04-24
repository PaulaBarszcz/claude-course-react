const MODULES = ['home', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10'];
const completed = new Set(JSON.parse(localStorage.getItem('react-course-completed') || '[]'));

function showPage(id) {
  document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id)?.classList.add('active');
  document.querySelector(`[data-page="${id}"]`)?.classList.add('active');
  window.scrollTo(0, 0);
  if (id !== 'home') markCompleted(id);
  updateProgress();
}

function markCompleted(id) {
  completed.add(id);
  localStorage.setItem('react-course-completed', JSON.stringify([...completed]));
  const nav = document.querySelector(`[data-page="${id}"]`);
  if (nav && id !== 'home') nav.classList.add('completed');
}

function updateProgress() {
  const modules = MODULES.slice(1);
  const done = modules.filter(m => completed.has(m)).length;
  const pct = Math.round((done / modules.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  document.querySelectorAll('.nav-item').forEach(n => {
    const pg = n.dataset.page;
    if (pg && pg !== 'home' && completed.has(pg)) {
      n.classList.add('completed');
    }
  });
}

updateProgress();
