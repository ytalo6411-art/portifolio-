/* ------------------------------------------------------------------
   shop.js — carrinho, catálogo e página de produto das lojas conceituais.
   Sem servidor: o estado vive no localStorage do navegador.
   Cada loja define window.SHOP_DATA antes de carregar este arquivo.
------------------------------------------------------------------- */
(function () {
  "use strict";

  var data = window.SHOP_DATA;
  if (!data) return;

  var Art = window.Art || {};
  var CART_KEY = data.cartKey || "loja-conceito";

  /* ---------- utilidades ---------- */

  function money(value) {
    try {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: data.currency || "BRL",
        minimumFractionDigits: 2
      }).format(value);
    } catch (err) {
      return "R$ " + value.toFixed(2).replace(".", ",");
    }
  }

  function product(id) {
    for (var i = 0; i < data.products.length; i++) {
      if (data.products[i].id === id) return data.products[i];
    }
    return null;
  }

  function artFor(item) {
    var fn = Art[item.art];
    if (typeof fn !== "function") return "";
    var colors = item.colors3 || [];
    return fn(colors[0], colors[1], colors[2]);
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  /* ---------- carrinho ---------- */

  var cart = { items: [] };

  function readCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      var parsed = raw ? JSON.parse(raw) : null;
      if (parsed && Array.isArray(parsed.items)) cart = parsed;
    } catch (err) {
      cart = { items: [] };
    }
  }

  function writeCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
      /* modo privado pode bloquear — o carrinho segue só em memória */
    }
  }

  function count() {
    return cart.items.reduce(function (sum, line) {
      return sum + line.qty;
    }, 0);
  }

  function subtotal() {
    return cart.items.reduce(function (sum, line) {
      return sum + line.qty * line.price;
    }, 0);
  }

  function add(item, size, qty) {
    var chosen = size || (item.sizes && item.sizes[0]) || "único";
    var key = item.id + "::" + chosen;
    var line = null;
    for (var i = 0; i < cart.items.length; i++) {
      if (cart.items[i].key === key) line = cart.items[i];
    }
    if (line) {
      line.qty = Math.min(line.qty + (qty || 1), 9);
    } else {
      cart.items.push({
        key: key,
        id: item.id,
        name: item.name,
        price: item.price,
        size: chosen,
        art: item.art,
        colors3: item.colors3,
        qty: qty || 1
      });
    }
    writeCart();
    paintBadge();
    paintDrawer();
    toast(item.name + " · " + chosen + " na sacola");
  }

  function setQty(key, delta) {
    for (var i = 0; i < cart.items.length; i++) {
      if (cart.items[i].key === key) {
        cart.items[i].qty = Math.min(Math.max(cart.items[i].qty + delta, 0), 9);
        if (cart.items[i].qty === 0) cart.items.splice(i, 1);
        break;
      }
    }
    writeCart();
    paintBadge();
    paintDrawer();
  }

  function removeLine(key) {
    cart.items = cart.items.filter(function (line) {
      return line.key !== key;
    });
    writeCart();
    paintBadge();
    paintDrawer();
  }

  /* ---------- interface do carrinho ---------- */

  var badge = document.querySelector("[data-cart-count]");
  var drawer = document.querySelector("[data-cart-drawer]");
  var scrim = document.querySelector("[data-cart-scrim]");
  var drawerBody = document.querySelector("[data-cart-body]");
  var totalNode = document.querySelector("[data-cart-total]");
  var toastNode = document.querySelector("[data-toast]");

  function paintBadge() {
    if (!badge) return;
    var n = count();
    badge.textContent = String(n);
    badge.setAttribute("data-empty", n === 0 ? "true" : "false");
  }

  function paintDrawer() {
    if (!drawerBody) return;
    drawerBody.innerHTML = "";

    if (!cart.items.length) {
      drawerBody.appendChild(
        el(
          "p",
          "shop-drawer__empty",
          "A sacola está vazia. Escolha uma peça no catálogo — os itens ficam guardados neste navegador, então você pode navegar entre as páginas sem perder nada."
        )
      );
    }

    cart.items.forEach(function (line) {
      var wrap = el("div", "shop-line");
      wrap.appendChild(el("div", "shop-line__art", artFor(line)));

      var body = el("div", "shop-line__body");
      body.appendChild(el("p", "shop-line__name", line.name));
      body.appendChild(el("p", "shop-line__meta", "tam. " + line.size + " · " + money(line.price)));

      var row = el("div", "shop-line__row");
      var qty = el("div", "shop-qty");
      var minus = el("button", null, "−");
      minus.type = "button";
      minus.setAttribute("aria-label", "Diminuir quantidade de " + line.name);
      minus.addEventListener("click", function () {
        setQty(line.key, -1);
      });
      var value = el("span", null, String(line.qty));
      var plus = el("button", null, "+");
      plus.type = "button";
      plus.setAttribute("aria-label", "Aumentar quantidade de " + line.name);
      plus.addEventListener("click", function () {
        setQty(line.key, 1);
      });
      qty.appendChild(minus);
      qty.appendChild(value);
      qty.appendChild(plus);
      row.appendChild(qty);

      var del = el("button", "shop-line__remove", "remover");
      del.type = "button";
      del.addEventListener("click", function () {
        removeLine(line.key);
      });
      row.appendChild(del);

      body.appendChild(row);
      wrap.appendChild(body);
      drawerBody.appendChild(wrap);
    });

    if (totalNode) totalNode.textContent = money(subtotal());
  }

  var toastTimer = null;
  function toast(message) {
    if (!toastNode) return;
    toastNode.textContent = message;
    toastNode.setAttribute("data-open", "true");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastNode.setAttribute("data-open", "false");
    }, 2400);
  }

  function openDrawer() {
    if (!drawer) return;
    drawer.setAttribute("data-open", "true");
    drawer.removeAttribute("aria-hidden");
    if (scrim) scrim.setAttribute("data-open", "true");
    document.body.classList.add("shop-locked");
    var closeBtn = drawer.querySelector("[data-cart-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.setAttribute("data-open", "false");
    drawer.setAttribute("aria-hidden", "true");
    if (scrim) scrim.setAttribute("data-open", "false");
    document.body.classList.remove("shop-locked");
    var trigger = document.querySelector("[data-cart-open]");
    if (trigger) trigger.focus();
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-cart-open]")) {
      e.preventDefault();
      openDrawer();
      return;
    }
    if (e.target.closest("[data-cart-close]") || e.target === scrim) {
      closeDrawer();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.getAttribute("data-open") === "true") closeDrawer();
  });

  /* ---------- cartões de produto ---------- */

  function cardFor(item) {
    var card = el("article", "shop-card");
    card.setAttribute("data-id", item.id);

    var link = el("a", "shop-card__media");
    link.href = "produto.html?p=" + encodeURIComponent(item.id);
    link.setAttribute("aria-label", item.name + " — abrir página do produto");
    link.innerHTML = artFor(item);
    if (item.badge) link.appendChild(el("span", "shop-card__badge", item.badge));
    card.appendChild(link);

    var name = el("h3", "shop-card__name");
    name.innerHTML = '<a href="produto.html?p=' + encodeURIComponent(item.id) + '">' + item.name + "</a>";
    card.appendChild(name);

    var meta = el("p", "shop-card__meta");
    var priceHtml = item.oldPrice
      ? "<s>" + money(item.oldPrice) + "</s>" + money(item.price)
      : money(item.price);
    meta.innerHTML = '<span class="shop-card__price">' + priceHtml + "</span><span>" + item.category + "</span>";
    card.appendChild(meta);

    if (item.sizes && item.sizes.length) {
      card.appendChild(el("p", "shop-card__sizes", item.sizes.join(" · ")));
    }

    var quick = el("button", "shop-card__add", "adicionar");
    quick.type = "button";
    quick.addEventListener("click", function () {
      add(item, item.sizes && item.sizes.length > 1 ? null : item.sizes && item.sizes[0]);
      openDrawer();
    });
    link.appendChild(quick);

    return card;
  }

  function renderFeatured() {
    var holder = document.querySelector("[data-featured]");
    if (!holder) return;
    var list = data.products.slice(0, Number(holder.getAttribute("data-featured")) || 4);
    holder.innerHTML = "";
    list.forEach(function (item) {
      holder.appendChild(cardFor(item));
    });
  }

  /* ---------- catálogo ---------- */

  function initCatalog() {
    var grid = document.querySelector("[data-catalog-grid]");
    if (!grid) return;

    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter-cat]"));
    var sizeChips = Array.prototype.slice.call(document.querySelectorAll("[data-filter-size]"));
    var search = document.querySelector("[data-search]");
    var sort = document.querySelector("[data-sort]");
    var countNode = document.querySelector("[data-result-count]");
    var empty = document.querySelector("[data-empty]");
    var state = { cat: "todos", size: "todos", q: "", sort: "padrao" };

    function apply() {
      var list = data.products.slice();

      if (state.cat !== "todos") {
        list = list.filter(function (p) {
          return p.category === state.cat;
        });
      }
      if (state.size !== "todos") {
        list = list.filter(function (p) {
          return p.sizes && p.sizes.indexOf(state.size) !== -1;
        });
      }
      if (state.q) {
        var q = state.q.toLowerCase();
        list = list.filter(function (p) {
          var hay = (p.name + " " + p.category + " " + (p.tags || []).join(" ") + " " + p.desc).toLowerCase();
          return hay.indexOf(q) !== -1;
        });
      }
      if (state.sort === "menor") list.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === "maior") list.sort(function (a, b) { return b.price - a.price; });
      if (state.sort === "nome") list.sort(function (a, b) { return a.name.localeCompare(b.name, "pt-BR"); });

      grid.innerHTML = "";
      list.forEach(function (item) {
        grid.appendChild(cardFor(item));
      });

      if (countNode) countNode.textContent = list.length + (list.length === 1 ? " produto" : " produtos");
      if (empty) empty.hidden = list.length !== 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.cat = chip.getAttribute("data-filter-cat");
        chips.forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        apply();
      });
    });

    sizeChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.size = chip.getAttribute("data-filter-size");
        sizeChips.forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        apply();
      });
    });

    if (search) {
      search.addEventListener("input", function () {
        state.q = search.value.trim();
        apply();
      });
    }

    if (sort) {
      sort.addEventListener("change", function () {
        state.sort = sort.value;
        apply();
      });
    }

    var clear = document.querySelector("[data-clear]");
    if (clear) {
      clear.addEventListener("click", function () {
        state = { cat: "todos", size: "todos", q: "", sort: "padrao" };
        if (search) search.value = "";
        if (sort) sort.value = "padrao";
        chips.forEach(function (c) {
          c.setAttribute("aria-pressed", String(c.getAttribute("data-filter-cat") === "todos"));
        });
        sizeChips.forEach(function (c) {
          c.setAttribute("aria-pressed", String(c.getAttribute("data-filter-size") === "todos"));
        });
        apply();
      });
    }

    var params = new URLSearchParams(location.search);
    var cat = params.get("cat");
    if (cat) {
      state.cat = cat;
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.getAttribute("data-filter-cat") === cat));
      });
    }

    apply();
  }

  /* ---------- página de produto ---------- */

  function initProduct() {
    var root = document.querySelector("[data-pdp]");
    if (!root) return;

    var id = new URLSearchParams(location.search).get("p");
    var item = product(id) || data.products[0];
    if (!item) return;

    document.title = item.name + " — " + data.brand;
    var set = function (selector, value) {
      var node = document.querySelector(selector);
      if (node) node.innerHTML = value;
    };

    set("[data-p-name]", item.name);
    set("[data-p-cat]", item.category);
    set("[data-p-desc]", item.desc);
    set("[data-p-price]", money(item.price) + (item.oldPrice ? "<s>" + money(item.oldPrice) + "</s>" : ""));

    var media = document.querySelector("[data-p-art]");
    if (media) media.innerHTML = artFor(item);

    var specs = document.querySelector("[data-p-specs]");
    if (specs) {
      specs.innerHTML = "";
      (item.specs || []).forEach(function (pair) {
        var row = el("div");
        row.innerHTML = "<dt>" + pair[0] + "</dt><dd>" + pair[1] + "</dd>";
        specs.appendChild(row);
      });
    }

    var sizeHolder = document.querySelector("[data-p-sizes]");
    var chosen = item.sizes && item.sizes.length ? item.sizes[0] : "único";
    function paintSizes() {
      if (!sizeHolder) return;
      sizeHolder.innerHTML = "";
      (item.sizes || ["único"]).forEach(function (size) {
        var btn = el("button", "shop-size", size);
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(size === chosen));
        btn.addEventListener("click", function () {
          chosen = size;
          paintSizes();
        });
        sizeHolder.appendChild(btn);
      });
    }
    paintSizes();

    var addBtn = document.querySelector("[data-p-add]");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        add(item, chosen);
        openDrawer();
      });
    }

    var crumb = document.querySelector("[data-p-crumb]");
    if (crumb) crumb.textContent = item.category;

    var related = document.querySelector("[data-related]");
    if (related) {
      var others = data.products.filter(function (p) {
        return p.id !== item.id;
      });
      var sameCat = others.filter(function (p) {
        return p.category === item.category;
      });
      var picks = (sameCat.length >= 4 ? sameCat : sameCat.concat(others)).slice(0, 4);
      related.innerHTML = "";
      picks.forEach(function (p) {
        related.appendChild(cardFor(p));
      });
    }
  }

  /* ---------- menu mobile ---------- */

  var menuBtn = document.querySelector("[data-shop-menu]");
  var mobileNav = document.querySelector("[data-shop-mobile]");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.getAttribute("data-open") !== "true";
      mobileNav.setAttribute("data-open", String(open));
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        mobileNav.setAttribute("data-open", "false");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- ano no rodapé ---------- */

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- início ---------- */

  readCart();
  paintBadge();
  paintDrawer();
  renderFeatured();
  initCatalog();
  initProduct();
})();
