/* ==========================================================================
   Noroz Hussain — Portfolio front-end
   Vanilla JS: theme, nav, reveal-on-scroll, hero typing, skill bars,
   project/gallery rendering + filtering, lightbox, contact form.
   No build step, no framework — works from any static/PHP host.
   ========================================================================== */
(function () {
  "use strict";

  var $  = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  document.addEventListener("DOMContentLoaded", function () {
    initPreloader();
    initTheme();
    initNav();
    initMouseGlow();
    initReveal();
    initHeroTyping();
    initSkills();
    initResumeMenu();
    initProjects();
    initGallery();
    initGallerySlider();
    initCaseStudies();
    initLightbox();
    initContactForm();
    initBackToTop();
    initYear();
    initActiveNav();
  });

  /* ---------------- Preloader ---------------- */
  function initPreloader() {
    var el = $("#preloader");
    if (!el) return;
    window.addEventListener("load", function () {
      setTimeout(function () { el.classList.add("hide"); }, 300);
    });
    // fallback in case load already fired
    setTimeout(function () { el.classList.add("hide"); }, 2500);
  }

  /* ---------------- Theme ---------------- */
  function initTheme() {
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem("noroz:theme"); } catch (e) {}
    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme = saved || (prefersLight ? "light" : "dark");
    root.setAttribute("data-theme", theme);

    var btn = $("#theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("noroz:theme", next); } catch (e) {}
      });
    }
  }

  /* ---------------- Nav (mobile menu + scrolled state) ---------------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var menu = $("#mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        menu.classList.toggle("open");
      });
      $$("#mobile-menu a").forEach(function (a) {
        a.addEventListener("click", function () { menu.classList.remove("open"); });
      });
    }
  }

  function initActiveNav() {
    var links = $$(".nav-links a");
    if (!links.length) return;
    var sections = links
      .map(function (l) { return l.getAttribute("href"); })
      .filter(function (h) { return h && h.indexOf("#") === 0; })
      .map(function (h) { return document.getElementById(h.slice(1)); })
      .filter(Boolean);
    if (!sections.length) return;

    var onScroll = function () {
      var pos = window.scrollY + 140;
      var current = sections[0];
      sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
      links.forEach(function (l) {
        var href = l.getAttribute("href") || "";
        l.classList.toggle("active", href === "#" + current.id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Mouse glow ---------------- */
  function initMouseGlow() {
    var glow = $("#mouse-glow");
    if (!glow) return;
    var x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y;
    window.addEventListener("mousemove", function (e) { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      glow.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var els = $$(".reveal:not(.in-view)");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });

    // Safety net: never let content stay permanently invisible — if for any
    // reason an element hasn't revealed itself after a few seconds (odd
    // viewport/print/accessibility-tool edge cases), show it anyway.
    setTimeout(function () {
      $$(".reveal:not(.in-view)").forEach(function (el) { el.classList.add("in-view"); });
    }, 2500);
  }

  /* ---------------- Hero role typing ---------------- */
  function initHeroTyping() {
    var el = $("#role-typed");
    if (!el || typeof SITE_CONTENT === "undefined") return;
    var roles = SITE_CONTENT.roles;
    var ri = 0, ci = 0, deleting = false;

    el.innerHTML = '<span class="word"></span><span class="cursor">&nbsp;</span>';
    var word = $(".word", el);

    function tick() {
      var current = roles[ri];
      if (!deleting) {
        ci++;
        word.textContent = current.slice(0, ci);
        if (ci === current.length) {
          deleting = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        ci--;
        word.textContent = current.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 75);
    }
    tick();
  }

  /* ---------------- Skills ---------------- */
  function initSkills() {
    var techWrap = $("#skills-tech");
    var artWrap = $("#skills-art");
    if (!techWrap || typeof SITE_CONTENT === "undefined") return;

    function row(skill, artFill) {
      var div = document.createElement("div");
      div.className = "skill-row reveal";
      div.innerHTML =
        '<div class="skill-row-top"><span>' + skill.name + '</span><span>' + skill.level + '%</span></div>' +
        '<div class="skill-track"><div class="skill-fill' + (artFill ? " art-fill" : "") + '" data-level="' + skill.level + '"></div></div>';
      return div;
    }

    SITE_CONTENT.skills.tech.forEach(function (s) { techWrap.appendChild(row(s, false)); });
    SITE_CONTENT.skills.art.forEach(function (s) { artWrap.appendChild(row(s, true)); });

    var fills = $$(".skill-fill");
    if (!("IntersectionObserver" in window)) {
      fills.forEach(function (f) { f.style.width = f.dataset.level + "%"; });
      initReveal();
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + "%";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(function (f) { io.observe(f); });

    initReveal(); // pick up newly injected .reveal rows
  }

  /* ---------------- Resume dropdown (Developer CV / Artist CV) ---------------- */
  function initResumeMenu() {
    var dd = $(".resume-dd");
    if (!dd) return;
    var toggle = $("#resume-toggle", dd);
    var menu = $("#resume-menu", dd);
    if (!toggle || !menu) return;

    function close() {
      dd.classList.remove("open");
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      dd.classList.add("open");
      menu.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (menu.classList.contains("open")) close(); else open();
    });
    document.addEventListener("click", function (e) {
      if (!dd.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    $$(".resume-menu-item", menu).forEach(function (a) {
      a.addEventListener("click", function () { close(); });
    });
  }

  /* ---------------- Projects ---------------- */
  function initProjects() {
    var grid = $("#projects-grid");
    if (!grid || typeof SITE_CONTENT === "undefined") return;

    function card(p) {
      var el = document.createElement("article");
      el.className = "card project-card reveal";
      el.dataset.category = p.category;
      var external = p.link && /^https?:\/\//.test(p.link);
      var linkHtml = p.link
        ? '<a class="project-link" href="' + p.link + '"' + (external ? ' target="_blank" rel="noreferrer"' : "") + ">" +
          (external ? "View project " : "View case study ") + ICON_LINK + "</a>"
        : "";
      el.innerHTML =
        '<div class="project-top">' +
          '<div class="project-icon">' + (p.category === "AI" ? ICON_BOT : ICON_SPARK) + "</div>" +
          '<span class="project-cat">' + p.category + "</span>" +
        "</div>" +
        "<h3>" + p.title + "</h3>" +
        '<p class="project-sub">' + p.subtitle + "</p>" +
        '<p class="project-desc">' + p.desc + "</p>" +
        '<div class="tech-row">' + p.tech.map(function (t) { return '<span class="tech-pill">' + t + "</span>"; }).join("") + "</div>" +
        linkHtml;
      return el;
    }

    function render(filter) {
      grid.innerHTML = "";
      var items = filter === "All" ? SITE_CONTENT.projects : SITE_CONTENT.projects.filter(function (p) { return p.category === filter; });
      if (!items.length) {
        grid.innerHTML = '<p class="empty-note">No projects in this category yet.</p>';
        return;
      }
      items.forEach(function (p) { grid.appendChild(card(p)); });
      initReveal();
    }

    render("All");

    $$(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        render(btn.dataset.filter);
      });
    });
  }

  /* ---------------- Gallery ---------------- */
  function initGallery() {
    var grid = $("#gallery-grid");
    if (!grid || typeof SITE_CONTENT === "undefined") return;

    var filtersWrap = $("#gallery-filters");
    var categories = ["All"].concat(
      SITE_CONTENT.gallery
        .map(function (a) { return a.category; })
        .filter(function (c, i, arr) { return arr.indexOf(c) === i; })
    );

    if (filtersWrap) {
      filtersWrap.innerHTML = categories
        .map(function (c, i) { return '<button class="filter-btn' + (i === 0 ? " active" : "") + '" data-filter="' + c + '">' + c + "</button>"; })
        .join("");
    }

    function card(a) {
      var el = document.createElement("div");
      el.className = "art-card reveal";
      el.dataset.category = a.category;
      el.innerHTML =
        '<img src="' + a.image + '" alt="' + a.title + '" loading="lazy">' +
        '<div class="art-overlay"><div><p class="cat">' + a.category + '</p><h3>' + a.title + "</h3></div></div>";
      el.addEventListener("click", function () { openLightbox(a.image, a.title + " — " + a.category); });
      return el;
    }

    function render(filter) {
      grid.innerHTML = "";
      var items = filter === "All" ? SITE_CONTENT.gallery : SITE_CONTENT.gallery.filter(function (a) { return a.category === filter; });
      if (!items.length) {
        grid.innerHTML = '<p class="empty-note">No artworks in this category yet.</p>';
        return;
      }
      items.forEach(function (a) { grid.appendChild(card(a)); });
      initReveal();
    }

    render("All");

    if (filtersWrap) {
      filtersWrap.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;
        $$(".filter-btn", filtersWrap).forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        render(btn.dataset.filter);
      });
    }
  }

  /* ---------------- Gallery hero slider (gallery.html) ---------------- */
  function initGallerySlider() {
    var track = $("#gallery-slider-track");
    if (!track || typeof SITE_CONTENT === "undefined") return;

    var items = SITE_CONTENT.gallery;
    if (!items.length) return;

    items.forEach(function (a, i) {
      var img = document.createElement("img");
      img.src = a.image;
      img.alt = a.title + " — " + a.category;
      img.loading = i === 0 ? "eager" : "lazy";
      img.className = "gallery-slide" + (i === 0 ? " active" : "");
      img.addEventListener("click", function () { openLightbox(a.image, a.title + " — " + a.category); });
      track.appendChild(img);
    });

    var slides = $$(".gallery-slide", track);
    if (!slides.length) return;
    var current = 0;
    var timer = null;

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, si) { s.classList.toggle("active", si === current); });
    }
    function next() { show(current + 1); }
    function prev() { show(current - 1); }
    function start() {
      stop();
      if (slides.length > 1) timer = setInterval(next, 3800);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    var wrap = $("#gallery-slider");
    var prevBtn = $("#gallery-slider-prev");
    var nextBtn = $("#gallery-slider-next");

    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); start(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); start(); });

    if (wrap) {
      wrap.addEventListener("mouseenter", stop);
      wrap.addEventListener("mouseleave", start);

      var startX = null;
      wrap.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
      wrap.addEventListener("touchend", function (e) {
        if (startX !== null) {
          var dx = e.changedTouches[0].clientX - startX;
          if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
          startX = null;
        }
        start();
      }, { passive: true });
    }

    start();
  }

  /* ---------------- Case studies (projects.html) ---------------- */
  function initCaseStudies() {
    var wrap = $("#case-studies");
    if (!wrap || typeof SITE_CONTENT === "undefined") return;

    function slider(p, idx) {
      var hasImages = p.images && p.images.length;
      var el = document.createElement("div");
      el.className = "case-media";
      if (!hasImages) {
        el.innerHTML = '<div class="case-media-empty">' + (p.category === "AI" ? ICON_BOT : ICON_SPARK) + "</div>";
        return el;
      }

      var track = document.createElement("div");
      track.className = "case-slides";
      p.images.forEach(function (src, i) {
        var img = document.createElement("img");
        img.src = src;
        img.alt = p.title + " — screenshot " + (i + 1);
        img.loading = "lazy";
        img.className = "case-slide" + (i === 0 ? " active" : "");
        img.addEventListener("click", function () { openLightbox(src, p.title + " — " + (i + 1) + "/" + p.images.length); });
        track.appendChild(img);
      });
      el.appendChild(track);

      if (p.images.length > 1) {
        var prev = document.createElement("button");
        prev.className = "slider-arrow prev";
        prev.setAttribute("aria-label", "Previous image");
        prev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
        var next = document.createElement("button");
        next.className = "slider-arrow next";
        next.setAttribute("aria-label", "Next image");
        next.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
        el.appendChild(prev);
        el.appendChild(next);

        var dots = document.createElement("div");
        dots.className = "slider-dots";
        p.images.forEach(function (_, i) {
          var d = document.createElement("button");
          d.className = "slider-dot" + (i === 0 ? " active" : "");
          d.setAttribute("aria-label", "Go to image " + (i + 1));
          dots.appendChild(d);
        });
        el.appendChild(dots);

        var current = 0;
        var slides = $$(".case-slide", el);
        var dotEls = $$(".slider-dot", dots);
        function show(i) {
          current = (i + slides.length) % slides.length;
          slides.forEach(function (s, si) { s.classList.toggle("active", si === current); });
          dotEls.forEach(function (d, di) { d.classList.toggle("active", di === current); });
        }
        prev.addEventListener("click", function () { show(current - 1); });
        next.addEventListener("click", function () { show(current + 1); });
        dotEls.forEach(function (d, i) { d.addEventListener("click", function () { show(i); }); });

        // swipe support
        var startX = null;
        el.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
        el.addEventListener("touchend", function (e) {
          if (startX === null) return;
          var dx = e.changedTouches[0].clientX - startX;
          if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
          startX = null;
        }, { passive: true });
      }

      return el;
    }

    function card(p, idx) {
      var el = document.createElement("article");
      el.className = "case-card card reveal";
      if (p.slug) el.id = p.slug;

      el.appendChild(slider(p, idx));

      var body = document.createElement("div");
      body.className = "case-body";
      body.innerHTML =
        '<div class="project-top"><span class="project-cat">' + p.category + "</span></div>" +
        "<h3>" + p.title + "</h3>" +
        '<p class="project-sub">' + p.subtitle + "</p>" +
        '<p class="project-desc">' + (p.overview || p.desc) + "</p>";

      if (p.features && p.features.length) {
        var feat = document.createElement("div");
        feat.className = "case-features";
        feat.innerHTML = "<h4>Key features</h4>" +
          p.features.map(function (f) { return "<p>• " + f + "</p>"; }).join("");
        body.appendChild(feat);
      }

      var techRow = document.createElement("div");
      techRow.className = "tech-row";
      techRow.innerHTML = p.tech.map(function (t) { return '<span class="tech-pill">' + t + "</span>"; }).join("");
      body.appendChild(techRow);

      el.appendChild(body);
      return el;
    }

    SITE_CONTENT.projects.forEach(function (p, i) { wrap.appendChild(card(p, i)); });
    initReveal();
  }

  /* ---------------- Lightbox ---------------- */
  function openLightbox(src, caption) {
    var box = $("#lightbox");
    if (!box) return;
    $("#lightbox-img").src = src;
    $("#lightbox-img").alt = caption;
    $("#lightbox-caption").textContent = caption;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    var box = $("#lightbox");
    if (!box) return;
    box.classList.remove("open");
    document.body.style.overflow = "";
  }
  function initLightbox() {
    var box = $("#lightbox");
    if (!box) return;
    $("#lightbox-close").addEventListener("click", closeLightbox);
    box.addEventListener("click", function (e) { if (e.target === box) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
  }

  /* ---------------- Contact form ---------------- */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    var statusEl = $("#form-status");
    var submitBtn = form.querySelector('button[type="submit"]');
    var RATE_KEY = "noroz:contact:lastSentAt";
    var RATE_MS = 30000;

    var rules = {
      name: function (v) { return v.trim().length >= 2 && v.trim().length <= 80; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && v.trim().length <= 160; },
      subject: function (v) { return v.trim().length >= 2 && v.trim().length <= 140; },
      message: function (v) { return v.trim().length >= 10 && v.trim().length <= 2000; }
    };

    function setFieldError(name, on) {
      var field = $("#field-" + name);
      if (field) field.classList.toggle("error", !!on);
    }

    function showStatus(msg, ok) {
      statusEl.textContent = msg;
      statusEl.className = "form-status show " + (ok ? "ok" : "fail");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitBtn.classList.contains("loading")) return;

      var data = new FormData(form);

      // Honeypot
      if ((data.get("company") || "").toString().length) {
        form.reset();
        showStatus("Message sent successfully. I'll get back to you soon.", true);
        return;
      }

      var values = {
        name: (data.get("name") || "").toString(),
        email: (data.get("email") || "").toString(),
        subject: (data.get("subject") || "").toString(),
        message: (data.get("message") || "").toString()
      };

      var valid = true;
      Object.keys(rules).forEach(function (key) {
        var ok = rules[key](values[key]);
        setFieldError(key, !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        showStatus("Please fix the highlighted fields.", false);
        return;
      }

      try {
        var last = Number(localStorage.getItem(RATE_KEY) || 0);
        var wait = RATE_MS - (Date.now() - last);
        if (wait > 0) {
          showStatus("Please wait " + Math.ceil(wait / 1000) + "s before sending again.", false);
          return;
        }
      } catch (e) {}

      submitBtn.classList.add("loading");
      statusEl.className = "form-status";

      fetch("php/contact.php", { method: "POST", body: data, headers: { "X-Requested-With": "XMLHttpRequest" } })
        .then(function (res) { return res.json().catch(function () { return { success: res.ok }; }); })
        .then(function (json) {
          submitBtn.classList.remove("loading");
          if (json && json.success) {
            try { localStorage.setItem(RATE_KEY, String(Date.now())); } catch (e) {}
            showStatus("Message sent successfully. I'll get back to you soon.", true);
            form.reset();
          } else {
            showStatus((json && json.message) || "Something went wrong. Please email me directly instead.", false);
          }
        })
        .catch(function () {
          submitBtn.classList.remove("loading");
          showStatus("Could not reach the server. Please email norozk123@gmail.com directly.", false);
        });
    });

    // Clear field error state as the user fixes it
    ["name", "email", "subject", "message"].forEach(function (key) {
      var input = $("#" + key);
      if (input) input.addEventListener("input", function () { setFieldError(key, false); });
    });
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop() {
    var btn = $("#to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Footer year ---------------- */
  function initYear() {
    var el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
