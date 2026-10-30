/* ------------------------------------------------------------------
   main.js — 2 KB de comportamento, sem bibliotecas
   - menu mobile
   - revelação no scroll (IntersectionObserver, uma vez por elemento)
   - filtro do índice de projetos + lightbox acessível (<dialog>)
   - miniatura que acompanha o cursor na lista da home
------------------------------------------------------------------- */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- menu mobile ---------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");

  if (toggle && mobileNav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      mobileNav.setAttribute("data-open", String(open));
      toggle.textContent = open ? "Fechar" : "Menu";
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 896) setMenu(false);
    });
  }

  /* ---------- revelação no scroll ---------- */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (revealables.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      revealables.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var revealObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            revealObs.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      revealables.forEach(function (el) {
        revealObs.observe(el);
      });
    }
  }

  /* ---------- miniatura que segue o cursor ---------- */
  var list = document.querySelector("[data-worklist]");
  if (list && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduced) {
    var thumb = document.createElement("img");
    thumb.className = "worklist__thumb";
    thumb.alt = "";
    thumb.width = 480;
    thumb.height = 300;
    thumb.decoding = "async";
    list.appendChild(thumb);

    var queued = false;
    var x = 0;
    var y = 0;

    var paint = function () {
      queued = false;
      var box = list.getBoundingClientRect();
      var left = Math.min(Math.max(x - box.left + 24, 8), box.width - thumb.width - 8);
      var top = y - box.top - thumb.height - 16;
      if (top < -thumb.height) top = y - box.top + 24;
      thumb.style.transform = "translate3d(" + left + "px," + top + "px,0)";
    };

    list.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    });

    list.addEventListener("pointerover", function (e) {
      var row = e.target.closest("[data-thumb]");
      if (!row) return;
      list.style.position = "relative";
      var src = row.getAttribute("data-thumb");
      if (thumb.getAttribute("src") !== src) thumb.setAttribute("src", src);
      x = e.clientX;
      y = e.clientY;
      paint();
      thumb.classList.add("is-visible");
    });

    list.addEventListener("pointerleave", function () {
      thumb.classList.remove("is-visible");
    });
  }

  /* ---------- filtros do índice ---------- */
  var filterBar = document.querySelector("[data-filters]");
  var cards = document.querySelectorAll("[data-project-card]");
  var counter = document.querySelector("[data-count]");
  var empty = document.querySelector("[data-empty]");

  if (filterBar && cards.length) {
    var apply = function (value) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = value === "todos" || card.getAttribute("data-cat") === value;
        card.hidden = !match;
        if (match) shown++;
      });
      if (counter) counter.textContent = shown + (shown === 1 ? " projeto" : " projetos");
      if (empty) empty.hidden = shown !== 0;
      filterBar.querySelectorAll("button").forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(btn.getAttribute("data-filter") === value));
      });
    };

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (btn) apply(btn.getAttribute("data-filter"));
    });

    var params = new URLSearchParams(location.search);
    var initial = params.get("cat");
    if (initial) apply(initial);
  }

  /* ---------- lightbox ---------- */
  var dialog = document.getElementById("lightbox");
  var catalog = window.__PROJECTS__ || {};
  var lastFocus = null;
  var current = null;
  var index = 0;

  var el = {
    title: document.getElementById("lb-title"),
    cat: document.getElementById("lb-cat"),
    demo: document.getElementById("lb-demo"),
    img: document.getElementById("lb-img"),
    caption: document.getElementById("lb-caption"),
    thumbs: document.getElementById("lb-thumbs"),
    counter: document.getElementById("lb-counter"),
    prev: document.getElementById("lb-prev"),
    next: document.getElementById("lb-next")
  };

  var render = function () {
    if (!current) return;
    var shot = current.shots[index];
    el.img.src = shot.src;
    el.img.alt = current.title + " — " + shot.caption;
    el.img.width = shot.w || 1600;
    el.img.height = shot.h || 1000;
    el.caption.textContent = shot.caption;
    el.counter.textContent = String(index + 1).padStart(2, "0") + " / " + String(current.shots.length).padStart(2, "0");
    el.prev.disabled = index === 0;
    el.next.disabled = index === current.shots.length - 1;
    el.thumbs.querySelectorAll("button").forEach(function (btn, i) {
      btn.setAttribute("aria-current", String(i === index));
    });
    var upcoming = current.shots[index + 1];
    if (upcoming) {
      var pre = new Image();
      pre.src = upcoming.src;
    }
  };

  var buildThumbs = function () {
    el.thumbs.innerHTML = "";
    current.shots.forEach(function (shot, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ver imagem " + (i + 1));
      var im = document.createElement("img");
      im.src = shot.thumb || shot.src;
      im.alt = "";
      im.width = 136;
      im.height = 85;
      im.loading = "lazy";
      b.appendChild(im);
      b.addEventListener("click", function () {
        index = i;
        render();
      });
      el.thumbs.appendChild(b);
    });
  };

  /* abre e fecha com fallback para navegadores sem <dialog> modal */
  var showModal = function (el) {
    if (typeof el.showModal === "function") el.showModal();
    else el.setAttribute("open", "");
    document.body.classList.add("is-locked");
  };

  var hideModal = function (el) {
    if (!el) return;
    if (typeof el.close === "function") el.close();
    else {
      el.removeAttribute("open");
      document.body.classList.remove("is-locked");
      if (lastFocus && lastFocus.isConnected) lastFocus.focus();
    }
  };

  var open = function (id, trigger) {
    var project = catalog[id];
    if (!dialog || !project) return;
    current = project;
    index = 0;
    lastFocus = trigger || document.activeElement;
    el.title.textContent = project.title;
    el.cat.textContent = project.category + " · " + project.type;
    el.demo.href = project.demo;
    el.demo.setAttribute("aria-label", "Abrir demonstração de " + project.title);
    buildThumbs();
    render();
    showModal(dialog);
  };

  var close = function () {
    if (dialog && dialog.open) hideModal(dialog);
  };

  if (dialog) {
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-open-project]");
      if (trigger) {
        e.preventDefault();
        open(trigger.getAttribute("data-open-project"), trigger);
        return;
      }
      if (e.target.closest("[data-lb-close]")) close();
    });

    el.prev.addEventListener("click", function () {
      if (index > 0) {
        index--;
        render();
      }
    });
    el.next.addEventListener("click", function () {
      if (index < current.shots.length - 1) {
        index++;
        render();
      }
    });

    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (index < current.shots.length - 1) {
          index++;
          render();
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (index > 0) {
          index--;
          render();
        }
      }
    });

    /* clique no backdrop fecha */
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) close();
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("is-locked");
      el.img.removeAttribute("src");
      if (lastFocus && lastFocus.isConnected) lastFocus.focus();
    });

    /* se o navegador não fechar com ESC via cancel, garante aqui */
    dialog.addEventListener("cancel", function (e) {
      e.preventDefault();
      close();
    });

    /* fallback: sem :modal, o ESC é tratado manualmente */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dialog.open && !dialog.matches(":modal")) close();
    });
  }

  /* ---------- ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });
})();
