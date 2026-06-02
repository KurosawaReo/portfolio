/*
  - kr_common.js - (HTML)
  ver.2026/06/02

  汎用的に使える機能。(<body>内の一番下に入れる)
*/

/* =============================== 
  ▼ コードブロック ▼
  html上で綺麗に記述できるように
================================ */
document.querySelectorAll("pre code").forEach(block => {
  const lines = block.textContent.split("\n");

  //先頭・末尾の空行を削除.
  while (lines[0]?.trim() === "") lines.shift();
  while (lines[lines.length - 1]?.trim() === "") lines.pop();

  //最小インデント取得(空行除外)
  const minIndent = Math.min(
    ...lines
      .filter(line => line.trim())
      .map(line => line.match(/^\s*/)[0].length)
  );

  //インデント削除.
  const trimmed = lines.map(line => line.slice(minIndent)).join("\n");

  block.textContent = trimmed;
});

/* ===============================
  ▼ スクロールアニメーション ▼
================================ */
window.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll('[class*="kr-anim_"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("anim-show");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0,
    rootMargin: "0px 0px -15% 0px"
  });

  cards.forEach(card => observer.observe(card));
});

//kr-anim_staggerの遅延処理.
window.addEventListener("DOMContentLoaded", () => {

  const staggerGroups = document.querySelectorAll(
    ".kr-anim_stagger-group"
  );

  //スマホ判定.
  const isMobile = window.innerWidth <= 640;

  staggerGroups.forEach(group => {

    const items = group.querySelectorAll(
      ".kr-anim_fade-in-stagger"
    );

    items.forEach((el, i) => {

      //スマホは遅延なし.
      if (isMobile) {
        el.style.transitionDelay = "0s";
        return;
      }

      //PC/タブレットでは遅延を作る.
      el.style.transitionDelay =
        `${i * 0.12}s`;
    });
  });
});