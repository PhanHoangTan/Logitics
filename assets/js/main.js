document.addEventListener("DOMContentLoaded", function () {
  // Initialize WOW.js
  new WOW().init();

  // Kiểm tra nếu đang ở trang Price.html thì active menu "Báo giá"
  const currentPage = window.location.pathname;
  if (currentPage.includes("Price.html")) {
    const priceMenuItem = document.querySelector(
      '.header-nav .nav-item a[href="Price.html"]'
    );
    if (priceMenuItem) {
      priceMenuItem.classList.add("active-scroll");
    }
  }

  // Fix for lazyload images to prevent duplicate display
  document.querySelectorAll("img.lazyload").forEach((img) => {
    // Remove style attribute if present
    if (img.hasAttribute("style")) {
      img.removeAttribute("style");
    }

    // Ensure proper lazyloading
    if (
      img.hasAttribute("data-src") &&
      img.hasAttribute("src") &&
      img.getAttribute("src") === img.getAttribute("data-src")
    ) {
      // If src and data-src are the same, use only data-src
      img.setAttribute(
        "src",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
      );
    }
  });

  // Add hover effects to buttons and interactive elements
  const interactiveElements = document.querySelectorAll(
    ".button_mobile, .nav-item a, .footer-links a, .social-links a"
  );
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.transition = "transform 0.3s ease";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

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
      if (window.scrollY > 100) {
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

  // Xử lý riêng cho nút "Về chúng tôi" trên header
  const aboutUsLink = document.querySelector('a[href="#ve-chung-toi"]');
  if (aboutUsLink) {
    aboutUsLink.addEventListener("click", function (e) {
      e.preventDefault();

      // Tìm section 2
      const section2 = document.querySelector(".awe-section-2");
      if (section2) {
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

        // Scroll đến section 2
        window.scrollTo({
          top: section2.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  }

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top");

  // Khi cuộn trang, kiểm tra vị trí cuộn cho back-to-top button
  window.addEventListener("scroll", function () {
    // Nếu vị trí cuộn > 300px, hiển thị nút
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      // Ngược lại, ẩn nút
      backToTopButton.classList.remove("show");
    }
  });

  // Xử lý sự kiện click vào nút back to top
  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Cuộn mượt về đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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

// Back to top button functionality
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $(".back-to-top").fadeIn("slow");
  } else {
    $(".back-to-top").fadeOut("slow");
  }

  // Add scroll spy functionality - handle menu active state when scrolling
  // Check if this is the index page (only run scroll spy on index page)
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/")
  ) {
    const sections = [
      "#ve-chung-toi",
      "#dich-vu",
      "#van-chuyen",
      "#thong-ke",
      "#tin-tuc",
      "#lien-he",
    ];
    const navItems = {
      "#ve-chung-toi": $(".header-nav .nav-item:nth-child(1) a"),
      "#dich-vu": $(".header-nav .nav-item:nth-child(2) a"),
      "#van-chuyen": $(".header-nav .nav-item:nth-child(3) a"),
      "#thong-ke": $(".header-nav .nav-item:nth-child(4) a"),
      "#tin-tuc": $(".header-nav .nav-item:nth-child(5) a"),
      "#lien-he": $(".header-nav .nav-item:nth-child(6) a"),
    };

    let currentSection = "";

    // Find which section is in view
    sections.forEach((section) => {
      const $section = $(section);
      if ($section.length) {
        const sectionTop = $section.offset().top - 100;
        const sectionBottom = sectionTop + $section.height();

        if (
          $(window).scrollTop() >= sectionTop &&
          $(window).scrollTop() < sectionBottom
        ) {
          currentSection = section;
        }
      }
    });

    // Remove all active classes first
    $(".header-nav .nav-item a").removeClass("active-scroll");

    // Check if we're in the news section (tin-tuc) and don't apply active class if so
    const newsSection = $("#tin-tuc");
    if (newsSection.length) {
      const newsSectionTop = newsSection.offset().top - 100;
      const newsSectionBottom = newsSectionTop + newsSection.height();

      if (
        $(window).scrollTop() >= newsSectionTop &&
        $(window).scrollTop() < newsSectionBottom
      ) {
        // We're in the news section, don't apply any active class
        return;
      }
    }

    // Add active class only to current section's nav item
    if (currentSection && navItems[currentSection]) {
      navItems[currentSection].addClass("active-scroll");
    }
  } else {
    // For other pages, highlight the appropriate nav item based on the current page
    const currentPage = window.location.pathname;
    if (
      currentPage.includes("news.html") ||
      currentPage.includes("tin-tuc-page-2.html")
    ) {
      // Remove active classes first
      $(".header-nav .nav-item a").removeClass("active-scroll");
      // Add active class to the News nav item (5th item)
      $(".header-nav .nav-item:nth-child(5) a").addClass("active-scroll");
    } else if (currentPage.includes("Price.html")) {
      // Remove active classes first
      $(".header-nav .nav-item a").removeClass("active-scroll");
      // Add active class to the Price nav item (7th item)
      $(".header-nav .nav-item:nth-child(7) a").addClass("active-scroll");
    }
  }
});

$(".back-to-top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
  return false;
});

// Smooth scrolling for navigation links
$(".header-nav .nav-item a").on("click", function (e) {
  if (this.hash !== "") {
    e.preventDefault();

    const hash = this.hash;
    const $target = $(hash);

    // Check if the target element exists on the current page
    if ($target.length) {
      $("html, body").animate(
        {
          scrollTop: $target.offset().top - 70,
        },
        800
      );
    } else {
      // If target doesn't exist on this page, it's likely on another page
      // Check if the link has href attribute with the page name
      const href = $(this).attr("href");
      if (href && href.includes("#") && !href.startsWith("#")) {
        // If href contains both a page name and a hash (e.g., "index.html#section")
        // Just follow the link normally
        window.location.href = href;
      }
    }
  }
});
