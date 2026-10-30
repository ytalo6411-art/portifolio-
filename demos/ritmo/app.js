/* Ritmo — sequenciador de 16 passos.
   O som é sintetizado com Web Audio (osciladores e ruído), sem arquivos.
   O agendador usa tempo absoluto do AudioContext para não oscilar. */
(function () {
  "use strict";

  var TRACKS = [
    { id: "kick", name: "bumbo", accent: true },
    { id: "snare", name: "caixa", accent: false },
    { id: "hat", name: "chimbal", accent: false },
    { id: "pluck", name: "nota", accent: false }
  ];

  var STEPS = 16;

  var PATTERNS = {
    A: {
      kick: [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hat: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
      pluck: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0]
    },
    B: {
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
      snare: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      hat: [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
      pluck: [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0]
    },
    C: {
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
      snare: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      hat: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      pluck: [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1]
    }
  };

  var state = {
    pattern: "A",
    bpm: 96,
    volume: 0.7,
    playing: false,
    step: 0,
    grid: {}
  };

  TRACKS.forEach(function (track) {
    state.grid[track.id] = PATTERNS.A[track.id].slice();
  });

  /* ---------- construção da grade ---------- */

  var head = document.querySelector("[data-head]");
  var rowHost = document.querySelector(".rt-grid");
  var stepCells = {};

  if (head) {
    for (var i = 0; i < STEPS; i++) {
      var tick = document.createElement("span");
      tick.textContent = String(i + 1);
      if (i % 4 === 0) tick.setAttribute("data-beat", "true");
      head.appendChild(tick);
    }
  }

  TRACKS.forEach(function (track) {
    var row = document.createElement("div");
    row.className = "rt-row";
    row.setAttribute("data-track", track.id);

    var name = document.createElement("span");
    name.className = "rt-row__name";
    name.textContent = track.name;
    row.appendChild(name);

    var steps = document.createElement("div");
    steps.className = "rt-steps";
    stepCells[track.id] = [];

    for (var s = 0; s < STEPS; s++) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rt-step";
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", track.name + ", passo " + (s + 1));
      btn.setAttribute("data-track", track.id);
      btn.setAttribute("data-step", String(s));
      if (s % 4 === 0) btn.setAttribute("data-beat", "true");
      if (track.accent) btn.setAttribute("data-accent", "true");
      steps.appendChild(btn);
      stepCells[track.id].push(btn);
    }

    row.appendChild(steps);
    if (rowHost) rowHost.appendChild(row);
  });

  function paintGrid() {
    TRACKS.forEach(function (track) {
      var row = state.grid[track.id];
      for (var s = 0; s < STEPS; s++) {
        var cell = stepCells[track.id][s];
        if (cell) cell.setAttribute("aria-pressed", row[s] ? "true" : "false");
      }
    });
  }

  paintGrid();

  /* ---------- áudio ---------- */

  var ctx = null;
  var master = null;
  var noiseBuffer = null;

  function ensureAudio() {
    if (ctx) return ctx;
    var Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = state.volume;
    master.connect(ctx.destination);

    var length = Math.floor(ctx.sampleRate * 0.5);
    noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    var data = noiseBuffer.getChannelData(0);
    for (var i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;

    return ctx;
  }

  function noise(time, duration, frequency, gain) {
    var src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    var filter = ctx.createBiquadFilter();
    filter.type = frequency > 3000 ? "highpass" : "bandpass";
    filter.frequency.value = frequency;
    filter.Q.value = 0.8;
    var amp = ctx.createGain();
    amp.gain.setValueAtTime(gain, time);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    src.connect(filter);
    filter.connect(amp);
    amp.connect(master);
    src.start(time);
    src.stop(time + duration);
  }

  function kick(time) {
    var osc = ctx.createOscillator();
    var amp = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(48, time + 0.14);
    amp.gain.setValueAtTime(0.9, time);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);
    osc.connect(amp);
    amp.connect(master);
    osc.start(time);
    osc.stop(time + 0.32);
  }

  function pluck(time, index) {
    var osc = ctx.createOscillator();
    var amp = ctx.createGain();
    var scale = [261.63, 293.66, 329.63, 392.0, 440.0];
    osc.type = "triangle";
    osc.frequency.value = scale[index % scale.length];
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(0.18, time + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);
    osc.connect(amp);
    amp.connect(master);
    osc.start(time);
    osc.stop(time + 0.26);
  }

  function playStep(step, time) {
    if (state.grid.kick[step]) kick(time);
    if (state.grid.snare[step]) noise(time, 0.16, 1800, 0.5);
    if (state.grid.hat[step]) noise(time, 0.05, 7000, 0.22);
    if (state.grid.pluck[step]) pluck(time, step);
  }

  var timer = null;
  var nextTime = 0;
  var lookahead = 0.1;
  var scheduleEvery = 25;

  function scheduler() {
    while (nextTime < ctx.currentTime + lookahead) {
      playStep(state.step % STEPS, nextTime);
      markStep(state.step % STEPS);
      nextTime += 60 / state.bpm / 4;
      state.step = (state.step + 1) % STEPS;
    }
  }

  var lastMarked = -1;

  function markStep(step) {
    if (step === lastMarked) return;
    lastMarked = step;
    TRACKS.forEach(function (track) {
      for (var i = 0; i < STEPS; i++) {
        var cell = stepCells[track.id][i];
        if (cell) cell.setAttribute("data-current", i === step ? "true" : "false");
      }
    });
  }

  function start() {
    var audio = ensureAudio();
    if (!audio) {
      var hint = document.querySelector("[data-audio-hint]");
      if (hint) {
        hint.setAttribute("data-state", "error");
        hint.textContent = "Este navegador não expõe Web Audio — a grade continua editável, mas sem som.";
      }
      return;
    }
    if (audio.state === "suspended" && audio.resume) audio.resume();

    state.playing = true;
    state.step = 0;
    lastMarked = -1;
    nextTime = audio.currentTime + 0.08;
    timer = setInterval(scheduler, scheduleEvery);
    scheduler();

    var btn = document.querySelector("[data-play]");
    var label = document.querySelector("[data-play-label]");
    if (btn) btn.setAttribute("aria-pressed", "true");
    if (label) label.textContent = "Parar";
  }

  function stop() {
    state.playing = false;
    lastMarked = -1;
    if (timer) clearInterval(timer);
    timer = null;
    var btn = document.querySelector("[data-play]");
    var label = document.querySelector("[data-play-label]");
    if (btn) btn.setAttribute("aria-pressed", "false");
    if (label) label.textContent = "Tocar";
    Array.prototype.forEach.call(document.querySelectorAll(".rt-step"), function (cell) {
      cell.setAttribute("data-current", "false");
    });
  }

  /* ---------- interação ---------- */

  if (rowHost) {
    rowHost.addEventListener("click", function (e) {
      var cell = e.target.closest(".rt-step");
      if (!cell || !rowHost.contains(cell)) return;
      var track = cell.getAttribute("data-track");
      var step = Number(cell.getAttribute("data-step"));
      if (!state.grid[track]) return;
      state.grid[track][step] = state.grid[track][step] ? 0 : 1;
      cell.setAttribute("aria-pressed", state.grid[track][step] ? "true" : "false");
      if (state.grid[track][step] && ctx) playStep(step, ctx.currentTime + 0.01);
    });
  }

  var playBtn = document.querySelector("[data-play]");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (state.playing) stop();
      else start();
    });
  }

  var bpmInput = document.querySelector("[data-bpm]");
  var bpmOut = document.querySelector("[data-bpm-out]");
  if (bpmInput) {
    bpmInput.addEventListener("input", function () {
      state.bpm = Number(bpmInput.value) || 96;
      if (bpmOut) bpmOut.textContent = String(state.bpm);
    });
  }

  var volInput = document.querySelector("[data-volume]");
  var volOut = document.querySelector("[data-volume-out]");
  if (volInput) {
    volInput.addEventListener("input", function () {
      state.volume = Number(volInput.value) / 100;
      if (volOut) volOut.textContent = volInput.value;
      if (master) master.gain.value = state.volume;
    });
  }

  function loadPattern(key) {
    if (!PATTERNS[key]) return;
    state.pattern = key;
    TRACKS.forEach(function (track) {
      state.grid[track.id] = PATTERNS[key][track.id].slice();
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-pattern]"), function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-pattern") === key));
    });
    paintGrid();
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-pattern]"), function (btn) {
    btn.addEventListener("click", function () {
      loadPattern(btn.getAttribute("data-pattern"));
    });
  });

  var clearBtn = document.querySelector("[data-clear]");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      TRACKS.forEach(function (track) {
        state.grid[track.id] = new Array(STEPS).fill(0);
      });
      paintGrid();
    });
  }

  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    if (e.code === "Space") {
      e.preventDefault();
      if (state.playing) stop();
      else start();
      return;
    }
    if (e.key === "a" || e.key === "A") loadPattern("A");
    if (e.key === "b" || e.key === "B") loadPattern("B");
    if (e.key === "c" || e.key === "C") loadPattern("C");

    var digits = ["1", "2", "3", "4"];
    var index = digits.indexOf(e.key);
    if (index !== -1) {
      var track = TRACKS[index];
      if (!track) return;
      state.grid[track.id] = state.grid[track.id].map(function (v) {
        return v ? 0 : 1;
      });
      paintGrid();
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden && state.playing) stop();
  });

  window.addEventListener("pagehide", function () {
    if (state.playing) stop();
  });
})();
