/*
  - main_page.css -
  最初のページに使うもの。
*/

//新しいタブで開く.
const openNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

/* =============================== 
  ▼ カードの軽いチルト効果 ▼
================================ */
const tiltCards = document.querySelectorAll('[data-tilt]');
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;  // 0..1
    const py = (e.clientY - r.top)  / r.height; // 0..1
    const rx = (py - 0.5) * -6; // rotateX
    const ry = (px - 0.5) * 8;  // rotateY
    card.style.transform = `translateY(-3px) rotateX(${clamp(rx,-8,8)}deg) rotateY(${clamp(ry,-10,10)}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* =============================== 
  ▼ ページ移動 ▼
  カードをクリックで開く。
================================ */
document.getElementById("activity-card-real").onclick = () => {
  openNewTab("pages/activity/real.html");
};
document.getElementById("activity-card-net").onclick = () => {
  openNewTab("pages/activity/net.html");
};

document.getElementById("works-card-01").onclick = () => {
  openNewTab("pages/works/reflect_line.html");
};
document.getElementById("works-card-02").onclick = () => {
  openNewTab("pages/works/gun_action.html");
};
document.getElementById("works-card-03").onclick = () => {
  openNewTab("pages/works/krlib.html");
};
document.getElementById("works-card-04").onclick = () => {
  openNewTab("pages/works/tetris.html");
};
document.getElementById("works-card-05").onclick = () => {
  openNewTab("pages/works/pac_muscle.html");
};
document.getElementById("works-card-06").onclick = () => {
  openNewTab("pages/works/5host.html");
};
document.getElementById("works-card-07").onclick = () => {
  openNewTab("pages/works/trans_water.html");
};
document.getElementById("works-card-08").onclick = () => {
  openNewTab("pages/works/ai_goal.html");
};
document.getElementById("works-card-09").onclick = () => {
  openNewTab("pages/works/yarira_rhythm.html");
};