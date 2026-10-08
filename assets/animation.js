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
    if (paused || reducedMotion.matches) return;
    const sprite = root.querySelector(".kooizy-character");
    if (!sprite || !sprite.naturalWidth) return;
    const sceneBounds = container.getBoundingClientRect();
    const spriteBounds = sprite.getBoundingClientRect();
    const scale = Math.min(spriteBounds.width / sprite.naturalWidth, spriteBounds.height / sprite.naturalHeight);
    const renderedHeight = sprite.naturalHeight * scale;
    // The pot's succulent is at 41% of the supplied sprite's height.
    // object-position is center bottom, including on narrow screens.
    const originX = spriteBounds.left - sceneBounds.left + spriteBounds.width / 2;
    const originY = spriteBounds.bottom - sceneBounds.top - renderedHeight * .59;
    if (container.childElementCount >= 15) return;
    for (let i = 0; i < 3; i += 1) {
      const heart = document.createElement("span");
      heart.className = "love-particle";
      heart.setAttribute("aria-hidden", "true");
      heart.style.left = (originX + Math.random() * 10 - 5) + "px";
      heart.style.top = originY + "px";
      heart.style.setProperty("--drift", (Math.random() * 38 - 19) + "px");
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

  const carousel = root.querySelector(".story-carousel");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotsContainer = carousel.querySelector(".carousel-dots");
  let activeSlide = 0;
  const dots = slides.map((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", "Ir para imagem " + (index + 1));
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
    return dot;
  });
  const showSlide = index => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== activeSlide; });
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === activeSlide)));
    carousel.querySelector(".carousel-count").textContent =
      String(activeSlide + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
  };
  carousel.querySelector(".carousel-prev").addEventListener("click", () => showSlide(activeSlide - 1));
  carousel.querySelector(".carousel-next").addEventListener("click", () => showSlide(activeSlide + 1));
  carousel.querySelectorAll(".carousel-prev,.carousel-next").forEach(button => { button.disabled = slides.length < 2; });
  carousel.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showSlide(activeSlide + (event.key === "ArrowRight" ? 1 : -1));
  });
  let touchStart = null;
  const carouselArt = carousel.querySelector(".carousel-slides");
  carouselArt.addEventListener("touchstart", event => {
    const touch = event.touches[0];
    touchStart = event.touches.length === 1 ? {x: touch.clientX, y: touch.clientY} : null;
  }, {passive: true});
  carouselArt.addEventListener("touchend", event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(activeSlide + (dx < 0 ? 1 : -1));
  }, {passive: true});
  carouselArt.addEventListener("touchcancel", () => { touchStart = null; }, {passive: true});
  showSlide(0);

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
