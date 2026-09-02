/*
  - main_page.css -
  最初のページに使うもの。
*/

//新しいタブで開く.
const openNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

/* ========================================
  ▼ Hero EN ネオンランダム点灯 ▼
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero-name .hero-en span");

  if (!letters.length) return;

  // 1文字を点灯・消灯させる
  const flicker = (letter) => {
    // すでに点灯している文字は除外
    if (letter.classList.contains("is-lit")) return;

    // 一瞬で点灯
    letter.classList.add("is-lit");

    // 点灯時間を短くする
    const litTime = 50 + Math.random() * 100;

    setTimeout(() => {
      // 点灯解除
      // → CSSのtransitionで自然に暗くなる
      letter.classList.remove("is-lit");
    }, litTime);
  };

  // ランダムな間隔で次の点灯を発生させる
  const schedule = () => {
    const delay = 150 + Math.random() * 1200;

    setTimeout(() => {
      // 1文字または2文字をランダムに点灯
      const count = Math.random() < 0.75 ? 1 : 2;

      for (let i = 0; i < count; i++) {
        // 空白文字は除外
        const candidates = [...letters].filter(
          letter => letter.textContent.trim() !== ""
        );

        // ランダムな文字を選択
        const letter = candidates[Math.floor(Math.random() * candidates.length)];

        flicker(letter);
      }

      // 次回の点灯を予約
      schedule();
    }, delay);
  };

  schedule();
});

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