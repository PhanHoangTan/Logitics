document.addEventListener("DOMContentLoaded", function () {
  // Initialize WOW.js
  new WOW().init();

  // Mobile menu toggle
  const menuBar = document.querySelector(".menu-bar");
  const mobileMenu = document.querySelector(".item_big");
  const body = document.body;
  const overlay = document.querySelector(".menu-overlay");

  if (menuBar) {
    menuBar.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      if (mobileMenu) {
        mobileMenu.classList.toggle("active");
        // Toggle overlay
        if (overlay) {
          overlay.classList.toggle("active");
        }
        // Prevent body scrolling when menu is open
        if (mobileMenu.classList.contains("active")) {
          body.style.overflow = "hidden";
        } else {
          body.style.overflow = "";
        }
      }
    });
  }

  // Add click event to overlay to close menu
  if (overlay) {
    overlay.addEventListener("click", function () {
      if (menuBar && menuBar.classList.contains("active")) {
        menuBar.classList.remove("active");
      }
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
      }
      overlay.classList.remove("active");
      body.style.overflow = "";
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".menu-bar-mobile") &&
      !event.target.closest(".item_big")
    ) {
      if (menuBar && menuBar.classList.contains("active")) {
        menuBar.classList.remove("active");
        if (mobileMenu) {
          mobileMenu.classList.remove("active");
          if (overlay) {
            overlay.classList.remove("active");
          }
          body.style.overflow = "";
        }
      }
    }
  });

  // Handle header sticky behavior
  const header = document.querySelector(".header-fixed");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }
    });
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(href);

        if (targetElement) {
          // Close mobile menu if open
          if (menuBar && menuBar.classList.contains("active")) {
            menuBar.classList.remove("active");
            if (mobileMenu) {
              mobileMenu.classList.remove("active");
              if (overlay) {
                overlay.classList.remove("active");
              }
              body.style.overflow = "";
            }
          }

          // Scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header height
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Reset menu state on window resize
      if (window.innerWidth > 991.98) {
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          if (menuBar) {
            menuBar.classList.remove("active");
          }
          if (overlay) {
            overlay.classList.remove("active");
          }
          body.style.overflow = "";
        }
      }
    }, 250);
  });

  // Sticky header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  });

  // Counter animation for statistics
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // The lower the slower

  const startCounters = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target =
          +counter.getAttribute("data-target") || +counter.innerText;
        const count = +counter.innerText.replace(/,/g, "") || 0;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      // Set data-target attribute if not present
      if (!counter.getAttribute("data-target")) {
        counter.setAttribute("data-target", counter.innerText);
      }

      counter.innerText = "0";
      updateCount();
    });
  };

  // Start counters when they come into view
  const statsSection = document.querySelector(".section_stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
  }

  // Initialize lazy loading for images
  document.querySelectorAll(".lazyload").forEach(function (el) {
    if (el.dataset.src) {
      if (el.tagName.toLowerCase() === "img") {
        el.src = el.dataset.src;
      } else {
        el.style.backgroundImage = "url(" + el.dataset.src + ")";
      }
      el.dataset.wasProcessed = true;
    }
  });

  // Animate progress bars when they come into view
  const progressBars = document.querySelectorAll(".progress-bar");
  if (progressBars.length > 0) {
    const animateProgressBars = () => {
      progressBars.forEach((bar) => {
        const rect = bar.getBoundingClientRect();
        const isInViewport =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (isInViewport && !bar.classList.contains("animated")) {
          const width =
            (bar.getAttribute("aria-valuenow") /
              bar.getAttribute("aria-valuemax")) *
              100 +
            "%";
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.width = width;
            bar.classList.add("animated");
          }, 100);
        }
      });
    };

    // Run once on page load
    animateProgressBars();

    // Run on scroll
    window.addEventListener("scroll", animateProgressBars);
  }
});
