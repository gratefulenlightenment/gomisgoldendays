(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const GAME_SECONDS = params.has("qa") ? 60 : params.has("test") ? 6 : 45;

  const moments = [
    { icon: "🌼", name: "a flower to sniff" },
    { icon: "🦋", name: "a new little friend" },
    { icon: "☀️", name: "a patch of sunlight" },
    { icon: "🍂", name: "a dancing leaf" },
    { icon: "🦴", name: "a favorite treat" },
    { icon: "🎾", name: "time to play" },
    { icon: "💛", name: "a gentle touch" },
    { icon: "🐾", name: "tiny new footsteps" }
  ];

  const card = document.querySelector("#game-card");
  const layer = document.querySelector("#moment-layer");
  const gomi = document.querySelector("#gomi-wrap");
  const startScreen = document.querySelector("#start-screen");
  const endScreen = document.querySelector("#end-screen");
  const startButton = document.querySelector("#start-button");
  const replayButton = document.querySelector("#replay-button");
  const shareButton = document.querySelector("#share-button");
  const shareNote = document.querySelector("#share-note");
  const timeDisplay = document.querySelector("#time-display");
  const scoreDisplay = document.querySelector("#score-display");
  const finalScore = document.querySelector("#final-score");
  const timeProgress = document.querySelector("#time-progress");

  let running = false;
  let score = 0;
  let startedAt = 0;
  let frameId = 0;
  let lastSpawnAt = 0;
  let lastSecond = GAME_SECONDS;

  timeDisplay.textContent = GAME_SECONDS;

  function startGame() {
    stopTimers();
    running = true;
    score = 0;
    startedAt = performance.now();
    lastSpawnAt = startedAt;
    lastSecond = GAME_SECONDS;
    scoreDisplay.textContent = "0";
    timeDisplay.textContent = GAME_SECONDS;
    timeProgress.style.transform = "scaleX(1)";
    shareNote.textContent = "";
    layer.replaceChildren();
    startScreen.hidden = true;
    endScreen.hidden = true;
    card.classList.add("playing");
    gomi.classList.add("walking");
    spawnBalloon(0);
    window.setTimeout(() => spawnBalloon(0), 260);
    frameId = requestAnimationFrame(updateGame);
  }

  function updateGame(now) {
    if (!running) return;

    const elapsed = (now - startedAt) / 1000;
    const remaining = Math.max(0, GAME_SECONDS - elapsed);
    const shownSecond = Math.ceil(remaining);
    const progress = remaining / GAME_SECONDS;

    timeProgress.style.transform = `scaleX(${progress})`;
    if (shownSecond !== lastSecond) {
      timeDisplay.textContent = shownSecond;
      lastSecond = shownSecond;
    }

    const difficulty = getDifficulty(elapsed);
    const activeBalloons = layer.querySelectorAll(".balloon-flight:not(.done)").length;
    if (now - lastSpawnAt >= difficulty.spawnEvery && activeBalloons < difficulty.maxActive) {
      spawnBalloon(elapsed);
      lastSpawnAt = now;
    }

    if (remaining <= 0) {
      endGame();
      return;
    }

    frameId = requestAnimationFrame(updateGame);
  }

  function spawnBalloon(elapsed) {
    if (!running) return;

    const data = moments[Math.floor(Math.random() * moments.length)];
    const speed = chooseSpeed(elapsed);
    const duration = getRiseDuration(speed);
    const flight = document.createElement("div");
    flight.className = `balloon-flight speed-${speed}`;
    flight.style.left = `${randomBetween(4, 82)}%`;
    flight.style.setProperty("--rise-duration", `${duration}s`);
    flight.style.setProperty("--sway-a", `${randomBetween(-34, 34)}px`);
    flight.style.setProperty("--sway-b", `${randomBetween(-42, 42)}px`);
    flight.style.setProperty("--drift", `${randomBetween(-58, 58)}px`);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "golden-balloon";
    button.setAttribute("aria-label", `Pop the balloon for ${data.name}`);
    button.dataset.name = data.name;
    button.innerHTML = `<span aria-hidden="true">${data.icon}</span><span class="moment-name">${data.name}</span>`;

    const pop = (event) => {
      event.preventDefault();
      if (!running || flight.classList.contains("done")) return;
      flight.classList.add("done");
      flight.style.animationPlayState = "paused";
      button.classList.add("popped");
      score += 1;
      scoreDisplay.textContent = score;
      celebrate(button);
      clearTimeout(Number(flight.dataset.timer));
      window.setTimeout(() => flight.remove(), 420);
    };

    button.addEventListener("click", pop, { once: true });
    flight.append(button);
    layer.append(flight);

    const timer = window.setTimeout(() => {
      if (!flight.isConnected || flight.classList.contains("done")) return;
      flight.classList.add("done");
      flight.remove();
    }, duration * 1000 + 250);
    flight.dataset.timer = timer;
  }

  function getDifficulty(elapsed) {
    if (params.has("qa")) return { spawnEvery: 900, maxActive: 5 };
    if (elapsed < 10) return { spawnEvery: 800, maxActive: 3 };
    if (elapsed < 28) return { spawnEvery: 650, maxActive: 4 };
    return { spawnEvery: 520, maxActive: 5 };
  }

  function chooseSpeed(elapsed) {
    const roll = Math.random();
    if (elapsed < 10) return roll < .22 ? "fast" : roll < .7 ? "medium" : "slow";
    if (elapsed < 28) return roll < .4 ? "fast" : roll < .82 ? "medium" : "slow";
    return roll < .58 ? "fast" : roll < .9 ? "medium" : "slow";
  }

  function getRiseDuration(speed) {
    const ranges = {
      slow: [6.25, 7],
      medium: [4.44, 5.19],
      fast: [3, 3.63]
    };
    const duration = randomBetween(...ranges[speed]);
    return params.has("qa") ? duration * 3 : duration;
  }

  function celebrate(button) {
    const buttonRect = button.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    const originX = buttonRect.left - layerRect.left + buttonRect.width / 2;
    const originY = buttonRect.top - layerRect.top + buttonRect.height / 2;

    for (let index = 0; index < 7; index += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.textContent = index % 2 ? "✦" : "·";
      sparkle.style.left = `${originX}px`;
      sparkle.style.top = `${originY}px`;
      sparkle.style.setProperty("--dx", `${randomBetween(-56, 56)}px`);
      sparkle.style.setProperty("--dy", `${randomBetween(-65, 28)}px`);
      layer.append(sparkle);
      window.setTimeout(() => sparkle.remove(), 720);
    }

    const heart = document.createElement("span");
    heart.className = "love-heart";
    heart.setAttribute("aria-hidden", "true");
    heart.textContent = "♥";
    heart.style.setProperty("--heart-x", `${randomBetween(-24, 24)}px`);
    gomi.append(heart);
    window.setTimeout(() => heart.remove(), 900);

    gomi.classList.remove("happy");
    void gomi.offsetWidth;
    gomi.classList.add("happy");
    window.setTimeout(() => gomi.classList.remove("happy"), 920);
  }

  function endGame() {
    running = false;
    stopTimers();
    card.classList.remove("playing");
    gomi.classList.remove("walking", "happy");
    layer.querySelectorAll(".balloon-flight").forEach((item) => item.remove());
    timeDisplay.textContent = "0";
    timeProgress.style.transform = "scaleX(0)";
    finalScore.textContent = score;
    endScreen.hidden = false;
    replayButton.focus({ preventScroll: true });
  }

  function stopTimers() {
    cancelAnimationFrame(frameId);
    layer.querySelectorAll(".balloon-flight").forEach((item) => clearTimeout(Number(item.dataset.timer)));
  }

  async function shareResult() {
    const text = `I found ${score} golden moments with little Gomi today. Some golden moments arrive late. They still count.`;
    const shareData = {
      title: "Gomi's Golden Walk",
      text,
      url: window.location.href.split("?")[0]
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        shareNote.textContent = "A golden moment shared. ♥";
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${shareData.url}`);
        shareNote.textContent = "Result copied — ready to share. ♥";
      } else {
        shareNote.textContent = text;
      }
    } catch (error) {
      if (error.name !== "AbortError") shareNote.textContent = "Sharing wasn't available, but the moment still counts. ♥";
    }
  }

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  startButton.addEventListener("click", startGame);
  replayButton.addEventListener("click", startGame);
  shareButton.addEventListener("click", shareResult);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running) endGame();
  });
})();
