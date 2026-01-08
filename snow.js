// ===== Snow fall =====
const snowWrap = document.getElementById("snow");
const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function rand(min, max){
  return Math.random() * (max - min) + min;
}

function makeSnowflake(){
  if (!snowWrap) return;

  // LỚP NGOÀI: chỉ rơi
  const flake = document.createElement("div");
  flake.className = "snowflake";

  // LỚP TRONG: icon quay
  const icon = document.createElement("div");
  icon.className = "snowflake__icon";

  // 🌸 icon
  const icons = ["🌸","🌸","🌸"];
  icon.textContent = icons[Math.floor(Math.random() * icons.length)];

  flake.appendChild(icon);

  // size
  const size = rand(16, 40);
  icon.style.fontSize = `${size}px`;
  icon.style.lineHeight = "1";

  // vị trí ngang
  const left = rand(0, 100);
  flake.style.left = `${left}vw`;

  // thời gian rơi
  const fallDur = rand(4, 10);
  flake.style.animationDuration = `${fallDur}s`;

  // thời gian xoay (độc lập)
  const spinDur = rand(4, 12);
  icon.style.animationDuration = `${spinDur}s`;

  // độ mờ
  flake.style.opacity = rand(0.1, 0.5);


  snowWrap.appendChild(flake);

  // xóa khi xong
  setTimeout(() => flake.remove(), fallDur * 1000 + 500);
}

let snowTimer = null;
function startSnow(){
  if (prefersReduce) return;
  snowTimer = setInterval(makeSnowflake, 120);
}
startSnow();


// ===== Snowman throw snowballs =====
const snowman = document.getElementById("snowman");

function throwSnowball(){
  if (!snowman) return;
  const rect = snowman.getBoundingClientRect();

  const ball = document.createElement("div");
  ball.className = "snowball";

  const startX = rect.left + rect.width * 0.7;
  const startY = rect.top + rect.height * 0.35;
  ball.style.left = `${startX}px`;
  ball.style.top = `${startY}px`;

  const dx = rand(160, 420);
  const dy = -rand(180, 520);
  ball.style.setProperty("--dx", `${dx}px`);
  ball.style.setProperty("--dy", `${dy}px`);

  document.body.appendChild(ball);
  setTimeout(() => ball.remove(), 1000);
}

// Click người tuyết → ném
snowman?.addEventListener("click", throwSnowball);

// Tự ném (đỡ cô đơn 😄)
if (!prefersReduce) {
  setInterval(() => {
    if (Math.random() < 0.6) throwSnowball();
  }, 2200);
}
