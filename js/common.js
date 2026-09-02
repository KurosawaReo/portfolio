/*
  - common.js -
  全ページに使う汎用的なもの。
*/

/* =============================== 
  ▼ スムーススクロール ▼
  aタグをクリックした時のアニメーション
================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===============================
  ▼ イントロ ▼
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");

  // 「intro-load」が付いた要素だけ読み込み待機する
  const loadingElements = document.querySelectorAll(".intro-load");

  // イントロ演出の時間
  const introDuration = 2800;

  // 要素の読み込み完了を待つ
  const waitForElement = (element) => {
    return new Promise((resolve) => {
      if (element.tagName === "VIDEO") {
        // 動画が再生可能なら完了
        if (element.readyState >= 3) {
          resolve();
          return;
        }

        // 動画が再生可能になったら完了
        element.addEventListener("canplay", resolve, { once: true });

        // 読み込み失敗時もイントロが止まり続けないようにする
        element.addEventListener("error", resolve, { once: true });
      } else if (element.tagName === "IMG") {
        // 画像がすでに読み込まれていれば完了
        if (element.complete) {
          resolve();
          return;
        }

        // 画像の読み込み完了
        element.addEventListener("load", resolve, { once: true });

        // 読み込み失敗時もイントロを終了できるようにする
        element.addEventListener("error", resolve, { once: true });
      } else {
        // video / img 以外は待機しない
        resolve();
      }
    });
  };

  // イントロアニメーションの終了を待つ
  const waitForIntro = new Promise((resolve) => {
    setTimeout(resolve, introDuration);
  });

  // 待機対象がなければ即座に完了扱いにする
  const waitForLoading =
    loadingElements.length > 0
      ? Promise.all([...loadingElements].map(waitForElement))
      : Promise.resolve();

  // イントロと対象要素の読み込み、両方が完了したら終了
  Promise.all([
    waitForIntro,
    waitForLoading
  ]).then(() => {
    intro.classList.add("is-ended");
  });
});

/* =============================== 
  ▼ 背景演出 ▼
================================ */
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

//粒子生成.
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.3 + 0.1,
    alpha: Math.random() * 0.5 + 0.2,
    drift: (Math.random() - 0.5) * 0.2 // ← 横揺れ追加
  });
}

function bgDraw() {
  ctx.clearRect(0, 0, w, h);

  /* =====================
    ▼ 粒子
  ===================== */
  particles.forEach(p => {
    p.y -= p.speed;
    p.x += p.drift;

    if (p.y < 0 || p.x < 0 || p.x > w) {
      p.y = h + Math.random() * 50;
      p.x = Math.random() * w;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(51,231,255,${p.alpha})`;
    ctx.shadowColor = "#33e7ff";
    ctx.shadowBlur = 10;

    ctx.fill();
  });

  requestAnimationFrame(bgDraw);
}
bgDraw();

/* =============================== 
  ▼ カーソルの発光(PC用) ▼
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const cursorWrap = document.querySelector('.cursor');
  if (!cursorWrap) return;

  // クリック時だけ波紋
  window.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });

  function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    cursorWrap.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
  }
});