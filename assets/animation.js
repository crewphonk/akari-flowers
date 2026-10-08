(() => {
  const root = document.getElementById("kooizy-page");
  if (!root || root.dataset.ready === "true") return;
  root.dataset.ready = "true";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reducedMotion.matches;
  let affection = 0;
  const motionButton = root.querySelector(".motion-toggle");
  const setPaused = () => {
    root.classList.toggle("is-paused", paused);
    motionButton.setAttribute("aria-pressed", String(paused));
    motionButton.textContent = paused ? "Ativar movimentos" : "Pausar movimentos";
  };
  setPaused();
  motionButton.addEventListener("click", () => { paused = !paused; setPaused(); });
  reducedMotion.addEventListener("change", event => { paused = event.matches; setPaused(); });

  root.querySelector(".day-toggle").addEventListener("click", event => {
    const night = root.classList.toggle("is-night");
    event.currentTarget.setAttribute("aria-pressed", String(night));
    event.currentTarget.textContent = night ? "Voltar ao dia" : "Virar noite";
    root.querySelector(".speech-bubble").textContent = night ? "Boa noite, você! ♥" : "Oi, você! ♥";
  });

  const giveLove = () => {
    affection += 1;
    const messages = [
      "Ganhei meu primeiro carinho. ♥",
      "Meu vasinho ficou cheio de amor. ♥",
      "Gostei de você. Fica mais um pouquinho? ♥",
      "A nossa história já começou. ♥"
    ];
    root.querySelector(".love-status").textContent = messages[Math.min(affection - 1, messages.length - 1)];
    const container = root.querySelector(".heart-particles");
    if (paused || reducedMotion.matches || container.childElementCount >= 15) return;
    for (let i = 0; i < 3; i += 1) {
      const heart = document.createElement("span");
      heart.className = "love-particle";
      heart.textContent = "♥";
      heart.style.left = (42 + Math.random() * 15) + "%";
      heart.style.setProperty("--drift", (Math.random() * 70 - 35) + "px");
      heart.style.animationDelay = (i * .12) + "s";
      container.appendChild(heart);
      window.setTimeout(() => heart.remove(), 2200);
    }
  };
  root.querySelector(".plant-touch").addEventListener("click", giveLove);
  root.querySelector(".love-button").addEventListener("click", giveLove);

  root.querySelectorAll('a[href^="#kooizy-"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = root.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior: paused || reducedMotion.matches ? "instant" : "smooth", block: "start"});
    });
  });

  if (window.__kooizyStoryObserver) window.__kooizyStoryObserver.disconnect();
  const segments = Array.from(root.querySelectorAll(".progress-track i"));
  const setChapter = chapter => {
    segments.forEach((segment, index) => segment.classList.toggle("active", index < chapter));
    root.querySelector(".progress-count").textContent = String(chapter).padStart(2, "0") + " / 03";
  };
  setChapter(1);
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const entry = visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    const chapter = Number(entry.target.dataset.chapter);
    setChapter(chapter);
    if (!entry.target.dataset.seen) {
      entry.target.dataset.seen = "true";
      entry.target.classList.add("just-seen");
    }
  }, {threshold:[.15,.35,.65]});
  root.querySelectorAll(".chapter").forEach(chapter => observer.observe(chapter));
  window.__kooizyStoryObserver = observer;
})();
