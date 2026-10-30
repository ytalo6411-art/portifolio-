/* ------------------------------------------------------------------
   system.js — comportamento dos painéis: troca de visão, ordenação e
   filtro de tabela, gráfico em barras, painel lateral de detalhe.
------------------------------------------------------------------- */
(function () {
  "use strict";

  /* ---------- visões ---------- */

  var links = Array.prototype.slice.call(document.querySelectorAll("[data-view-link]"));
  var views = Array.prototype.slice.call(document.querySelectorAll("[data-view]"));
  var titleNode = document.querySelector("[data-view-title]");
  var subNode = document.querySelector("[data-view-sub]");

  function showView(id, push) {
    var found = false;
    views.forEach(function (view) {
      var match = view.getAttribute("data-view") === id;
      view.hidden = !match;
      if (match) found = true;
    });
    if (!found) return false;

    links.forEach(function (link) {
      var match = link.getAttribute("data-view-link") === id;
      if (match) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    var active = links.filter(function (l) {
      return l.getAttribute("data-view-link") === id;
    })[0];

    if (titleNode && active) titleNode.textContent = active.getAttribute("data-label") || "";
    if (subNode && active) subNode.textContent = active.getAttribute("data-sub") || "";

    document.title = (active && active.getAttribute("data-label") ? active.getAttribute("data-label") + " — " : "") + document.title.split(" — ").pop();

    if (push && location.hash !== "#" + id) {
      try {
        history.replaceState(null, "", "#" + id);
      } catch (err) {
        /* file:// pode bloquear — o painel continua funcionando */
      }
    }
    return true;
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("data-view-link");
      if (!document.querySelector('[data-view="' + id + '"]')) return;
      e.preventDefault();
      showView(id, true);
      var main = document.querySelector(".sys-main");
      if (main && main.scrollIntoView) main.scrollIntoView({ block: "start" });
    });
  });

  if (views.length) {
    var initial = (location.hash || "").replace("#", "");
    if (!initial || !showView(initial, false)) {
      showView(views[0].getAttribute("data-view"), false);
    }
  }

  /* ---------- tabelas: ordenar ---------- */

  function cellValue(row, index) {
    var cell = row.children[index];
    if (!cell) return "";
    var raw = cell.getAttribute("data-value");
    if (raw != null) return raw;
    return cell.textContent.trim();
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-sortable-table]"), function (table) {
    var headers = Array.prototype.slice.call(table.querySelectorAll("th[data-sortable]"));
    var body = table.tBodies[0];
    if (!body) return;

    headers.forEach(function (th) {
      th.addEventListener("click", function () {
        var index = Array.prototype.indexOf.call(th.parentNode.children, th);
        var current = th.getAttribute("aria-sort");
        var dir = current === "ascending" ? "descending" : "ascending";

        headers.forEach(function (other) {
          other.removeAttribute("aria-sort");
        });
        th.setAttribute("aria-sort", dir);

        var rows = Array.prototype.slice.call(body.rows);
        rows.sort(function (a, b) {
          var av = cellValue(a, index);
          var bv = cellValue(b, index);
          var an = parseFloat(String(av).replace(/[^\d,.-]/g, "").replace(",", "."));
          var bn = parseFloat(String(bv).replace(/[^\d,.-]/g, "").replace(",", "."));
          var isNum = !isNaN(an) && !isNaN(bn) && /[\d]/.test(av) && /[\d]/.test(bv);
          var cmp = isNum ? an - bn : String(av).localeCompare(String(bv), "pt-BR");
          return dir === "ascending" ? cmp : -cmp;
        });
        rows.forEach(function (row) {
          body.appendChild(row);
        });
      });
    });
  });

  /* ---------- tabelas: buscar e filtrar ---------- */

  function initTableFilters() {
    var table = document.querySelector("[data-filter-table]");
    if (!table) return;
    var input = document.querySelector("[data-table-search]");
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-status-filter]"));
    var counter = document.querySelector("[data-table-count]");
    var empty = document.querySelector("[data-table-empty]");
    var body = table.tBodies[0];
    if (!body) return;

    function apply() {
      var q = input ? input.value.trim().toLowerCase() : "";
      var status = "todos";
      chips.forEach(function (chip) {
        if (chip.getAttribute("aria-pressed") === "true") status = chip.getAttribute("data-status-filter");
      });

      var shown = 0;
      Array.prototype.forEach.call(body.rows, function (row) {
        var text = row.textContent.toLowerCase();
        var okText = !q || text.indexOf(q) !== -1;
        var okStatus = status === "todos" || row.getAttribute("data-status") === status;
        var ok = okText && okStatus;
        row.hidden = !ok;
        if (ok) shown++;
      });

      if (counter) counter.textContent = shown + (shown === 1 ? " registro" : " registros");
      if (empty) empty.hidden = shown !== 0;
    }

    if (input) {
      input.addEventListener("input", apply);
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        apply();
      });
    });

    apply();
  }

  initTableFilters();

  /* ---------- gráfico em barras ---------- */

  Array.prototype.forEach.call(document.querySelectorAll("[data-chart]"), function (node) {
    var values = (node.getAttribute("data-values") || "")
      .split(",")
      .map(function (v) {
        return Number(v.trim());
      })
      .filter(function (v) {
        return !isNaN(v);
      });
    var labels = (node.getAttribute("data-labels") || "").split(",");
    var unit = node.getAttribute("data-unit") || "";
    if (!values.length) return;

    var max = Math.max.apply(null, values) || 1;
    node.innerHTML = "";

    values.forEach(function (value, i) {
      var bar = document.createElement("div");
      bar.className = "sys-chart__bar";
      bar.style.height = Math.max(2, Math.round((value / max) * 100)) + "%";
      bar.setAttribute("tabindex", "0");
      var label = (labels[i] || String(i + 1)).trim();
      bar.setAttribute("aria-label", label + ": " + value + unit);
      var tip = document.createElement("span");
      tip.textContent = value + unit;
      bar.appendChild(tip);
      if (i === values.length - 1) bar.setAttribute("data-emphasis", "true");
      node.appendChild(bar);
    });

    var axis = document.querySelector("[data-chart-axis]");
    if (axis && labels.length) {
      axis.innerHTML = "";
      labels.forEach(function (label) {
        var span = document.createElement("span");
        span.textContent = label.trim();
        axis.appendChild(span);
      });
    }
  });

  /* ---------- painel lateral ---------- */

  var drawer = document.querySelector("[data-drawer]");
  var scrim = document.querySelector("[data-drawer-scrim]");

  function openDrawer(trigger) {
    if (!drawer) return;
    var title = trigger.getAttribute("data-title");
    var heading = drawer.querySelector("[data-drawer-title]");
    if (heading && title) heading.textContent = title;

    var facts = drawer.querySelector("[data-drawer-facts]");
    if (facts) {
      facts.innerHTML = "";
      Array.prototype.forEach.call(trigger.attributes, function (attr) {
        if (attr.name.indexOf("data-fact-") !== 0) return;
        var label = attr.name.replace("data-fact-", "").replace(/-/g, " ");
        var row = document.createElement("div");
        row.innerHTML = "<dt>" + label + "</dt><dd>" + attr.value + "</dd>";
        facts.appendChild(row);
      });
    }

    var statusNode = drawer.querySelector("[data-drawer-status]");
    if (statusNode) {
      var state = trigger.getAttribute("data-state") || "neutral";
      statusNode.textContent = trigger.getAttribute("data-status-label") || "";
      statusNode.setAttribute("data-state", state);
    }

    drawer.setAttribute("data-open", "true");
    drawer.removeAttribute("aria-hidden");
    if (scrim) scrim.setAttribute("data-open", "true");
    document.body.classList.add("drawer-open");
    var closeBtn = drawer.querySelector("[data-drawer-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.setAttribute("data-open", "false");
    drawer.setAttribute("aria-hidden", "true");
    if (scrim) scrim.setAttribute("data-open", "false");
    document.body.classList.remove("drawer-open");
    if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus();
  }

  var lastTrigger = null;

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-drawer-open]");
    if (trigger) {
      e.preventDefault();
      lastTrigger = trigger;
      openDrawer(trigger);
      return;
    }
    if (e.target.closest("[data-drawer-close]") || e.target === scrim) {
      closeDrawer();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.getAttribute("data-open") === "true") closeDrawer();
  });

  /* ---------- ano ---------- */

  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (node) {
    node.textContent = String(new Date().getFullYear());
  });
})();
