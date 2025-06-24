// Script xử lý điều hướng menu
document.addEventListener("DOMContentLoaded", function () {
  // Lấy đường dẫn hiện tại
  const currentPage = window.location.pathname;

  // Xác định trang hiện tại
  const isIndexPage =
    currentPage.includes("index.html") ||
    currentPage.endsWith("/") ||
    currentPage.endsWith("\\");
  const isPricePage = currentPage.includes("Price.html");

  // Lấy tất cả các menu item
  const menuItems = document.querySelectorAll(".header-nav .nav-item a");

  // Xóa tất cả active-scroll class trước khi thiết lập lại
  menuItems.forEach((item) => {
    item.classList.remove("active-scroll");
  });

  // Nếu đang ở trang Price.html, active menu "Báo giá"
  if (isPricePage) {
    const priceMenuItem = document.querySelector(
      '.header-nav .nav-item a[href="Price.html"]'
    );
    if (priceMenuItem) {
      priceMenuItem.classList.add("active-scroll");
    }

    // Xử lý click vào các menu item khi đang ở trang Price.html
    menuItems.forEach((item) => {
      const href = item.getAttribute("href");

      // Nếu link có dấu # (link nội trang) và không phải link báo giá
      if (href.startsWith("#") && !href.includes("Price.html")) {
        item.addEventListener("click", function (e) {
          e.preventDefault(); // Ngăn chặn hành vi mặc định
          // Điều hướng về trang chủ với section tương ứng
          window.location.href = "index.html" + href;
        });
      }
    });
  }

  // Xử lý khi scroll trang (chỉ khi ở trang chủ)
  if (isIndexPage) {
    // Thêm active class cho menu Home ban đầu nếu ở đầu trang
    if (window.scrollY < 200) {
      const homeMenuItem = document.querySelector(
        ".header-nav .nav-item:first-child a"
      );
      if (homeMenuItem) {
        homeMenuItem.classList.add("active-scroll");
      }
    }

    window.addEventListener("scroll", function () {
      // Danh sách các section và menu item tương ứng
      const sections = [
        { id: "ve-chung-toi", menuIndex: 0 },
        { id: "dich-vu", menuIndex: 1 },
        { id: "van-chuyen", menuIndex: 2 },
        { id: "thong-ke", menuIndex: 3 },
        { id: "tin-tuc", menuIndex: 4 },
        { id: "lien-he", menuIndex: 5 },
      ];

      // Vị trí scroll hiện tại
      const scrollPosition = window.scrollY;

      // Xóa tất cả active class
      menuItems.forEach((item) => {
        item.classList.remove("active-scroll");
      });

      // Kiểm tra từng section
      let currentSection = null;
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop - 150;
          const offsetBottom = offsetTop + element.offsetHeight;

          // Nếu đang scroll trong phạm vi section
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSection = section;
          }
        }
      });

      // Thêm active class cho menu item tương ứng
      if (currentSection) {
        const menuItem = document.querySelector(
          `.header-nav .nav-item:nth-child(${currentSection.menuIndex + 1}) a`
        );
        if (menuItem) {
          menuItem.classList.add("active-scroll");
        }
      }
    });
  }
});
