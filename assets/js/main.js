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
});
