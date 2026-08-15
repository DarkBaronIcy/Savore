document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader") || document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  const closeNav = () => {
    if (!toggle || !nav) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeNav();
    });
    document.addEventListener("click", e => {
      if (!nav.classList.contains("open")) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeNav();
    });
  }

  if (header && !header.classList.contains("solid")) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Use the user's local calendar date rather than UTC (toISOString()).
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const now = new Date();
    const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    dateInput.min = localDate;
  }

  const reservation = document.getElementById("reservationForm");
  const reservationMessage = document.getElementById("reservationMessage");
  if (reservation && reservationMessage) {
    reservation.addEventListener("submit", e => {
      e.preventDefault();
      reservationMessage.className = "form-note success";
      const guests = reservation.elements.guests?.value || "";
      reservationMessage.textContent = guests === "7+ Guests"
        ? "Your details are valid. For 7+ guests, please call 0703 252 4984 to confirm availability."
        : "Your reservation details are valid. This demo does not send reservations yet.";
    });
  }

  const contact = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");
  if (contact && contactMessage) {
    contact.addEventListener("submit", e => {
      e.preventDefault();
      contactMessage.className = "form-note success";
      contactMessage.textContent = "Your message is valid. This demo does not send messages yet.";
    });
  }

  // Lightweight gallery preview without navigating away from the page.
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.querySelector(".lightbox-close");
  let lastFocusedGalleryImage = null;

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lastFocusedGalleryImage) lastFocusedGalleryImage.focus();
  };

  if (lightbox && lightboxImage) {
    document.querySelectorAll(".gallery-grid img").forEach(img => {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      const open = () => {
        lastFocusedGalleryImage = img;
        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt;
        lightbox.hidden = false;
        document.body.classList.add("lightbox-open");
        lightboxClose?.focus();
      };
      img.addEventListener("click", open);
      img.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });
  }

  // Canonical URL is generated from the actual deployed origin so no placeholder domain is invented.
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = window.location.href.split("#")[0];
});
