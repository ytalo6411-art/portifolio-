/* ------------------------------------------------------------------
   demo.js — comportamento comum das demonstrações institucionais:
   menu no celular, formulários de contato (sem envio) e ano no rodapé.
------------------------------------------------------------------- */
(function () {
  "use strict";

  /* ---------- menu ---------- */

  var toggle = document.querySelector("[data-menu]");
  var panel = document.querySelector("[data-mobile]");

  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      panel.setAttribute("data-open", String(open));
      var label = toggle.querySelector("[data-menu-label]");
      if (label) label.textContent = open ? "Fechar" : "Menu";
      else toggle.textContent = open ? "Fechar" : "Menu";
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    if (window.matchMedia) {
      var mq = window.matchMedia("(min-width: 56rem)");
      var onChange = function () {
        if (mq.matches) setOpen(false);
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
    }
  }

  /* ---------- formulários demonstrativos ---------- */

  Array.prototype.forEach.call(document.querySelectorAll("form[data-demo-form]"), function (form) {
    var status = form.querySelector("[data-form-status]");
    var success = form.getAttribute("data-success") || "Tudo certo — mas esta é uma demonstração: nada foi enviado.";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("is-checked");

      if (!form.checkValidity()) {
        if (status) {
          status.setAttribute("data-state", "error");
          status.textContent = "Confira os campos destacados antes de enviar.";
        }
        var invalid = form.querySelector(":invalid");
        if (invalid) invalid.focus();
        return;
      }

      if (status) {
        status.setAttribute("data-state", "ok");
        status.textContent = success;
      }
      form.reset();
      form.classList.remove("is-checked");
    });
  });

  /* ---------- ano ---------- */

  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- perguntas: uma aberta por vez ---------- */

  var faq = document.querySelector("[data-faq]");
  if (faq) {
    faq.addEventListener("toggle", function (e) {
      var item = e.target;
      if (!item.open) return;
      Array.prototype.forEach.call(faq.querySelectorAll("details"), function (other) {
        if (other !== item) other.open = false;
      });
    }, true);
  }
})();
