/* Assina — assinatura simulada no documento e troca de periodicidade. */
(function () {
  "use strict";

  var MINUTES = ["14:02", "14:06", "14:11"];
  var IP = ["189.12.33.4", "177.36.90.11", "201.7.44.82"];

  var status = document.querySelector("[data-doc-status]");
  var signBtn = document.querySelector("[data-sign]");
  var pending = Array.prototype.slice.call(document.querySelectorAll("[data-sig]"));

  function paintStatus() {
    if (!status) return;
    var total = pending.length + 1;
    var done = total - pending.length;
    status.textContent = done + " de " + total + (done === 1 ? " assinou" : " assinaram");
    if (signBtn) {
      if (!pending.length) {
        signBtn.disabled = true;
        signBtn.textContent = "Documento assinado";
      } else {
        signBtn.disabled = false;
        signBtn.textContent = "Assinar (demonstração)";
      }
    }
  }

  if (signBtn) {
    signBtn.addEventListener("click", function () {
      var next = pending.shift();
      if (!next) return;
      next.classList.add("is-signed");
      var meta = next.querySelector(".as-sig__meta");
      var index = 3 - pending.length;
      if (meta) {
        meta.textContent = "assinado · " + (MINUTES[index] || "14:12") + " · " + (IP[index] || "201.7.44.82");
      }
      paintStatus();
      next.scrollIntoView && next.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  paintStatus();

  /* ---------- mensal / anual ---------- */

  var monthly = { pro: 39, time: 129 };
  var cycle = "mes";
  var buttons = document.querySelectorAll("[data-cycle]");
  var prices = document.querySelectorAll("[data-price]");
  var labels = document.querySelectorAll("[data-cycle-label]");

  function paintCycle() {
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-cycle") === cycle));
    });
    prices.forEach(function (node) {
      var value = monthly[node.getAttribute("data-price")];
      if (!value) return;
      node.textContent = cycle === "ano" ? "R$ " + Math.round(value * 0.8 * 12) : "R$ " + value;
    });
    labels.forEach(function (node) {
      node.textContent = cycle === "ano" ? "por ano · 20% off" : "por mês";
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      cycle = btn.getAttribute("data-cycle");
      paintCycle();
    });
  });

  paintCycle();
})();
