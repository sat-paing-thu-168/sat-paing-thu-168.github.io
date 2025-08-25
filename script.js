// Theme toggle functionality
function initTheme() {
  const themeBtn = document.getElementById("theme-btn");
  const mobileThemeBtn = document.getElementById("mobile-theme-btn");
  const savedTheme = localStorage.getItem("theme");

  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // Default to light theme
    document.documentElement.setAttribute("data-theme", "light");
  }

  function toggleTheme(button) {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Add a subtle animation to the button
    if (button) {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Desktop theme toggle event listener
  if (themeBtn) {
    themeBtn.addEventListener("click", () => toggleTheme(themeBtn));
  }

  // Mobile theme toggle event listener
  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener("click", () => toggleTheme(mobileThemeBtn));
  }
}

// CV download functionality
function initCVDownload() {
  const cvButton = document.getElementById("download-cv");
  const navCvButton = document.getElementById("nav-download-cv");

  function downloadCV(button) {
    // Add click animation
    if (button) {
      button.style.transform = "scale(0.98)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 150);
    }

    // Check if CV file exists, otherwise show alert
    const cvFileName = "Sat_Paing_Thu_CV.pdf";

    // Create a temporary link to try downloading
    const link = document.createElement("a");
    link.href = cvFileName;
    link.download = cvFileName;
    link.style.display = "none";

    document.body.appendChild(link);

    // Try to download, catch error if file doesn't exist
    try {
      link.click();
    } catch (error) {
      alert(
        'CV file not found. Please add your CV file as "Sat_Paing_Thu_CV.pdf" to the same directory.'
      );
    }

    document.body.removeChild(link);
  }

  // Contact section CV button (if exists)
  if (cvButton) {
    cvButton.addEventListener("click", () => downloadCV(cvButton));
  }

  // Navigation CV button
  if (navCvButton) {
    navCvButton.addEventListener("click", () => downloadCV(navCvButton));
  }
}

// Smooth scroll for internal links (if any are added later)
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Add subtle entrance animations
function initEntranceAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Add animation styles and observe sections
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
}

// Mobile navigation functionality
function initMobileNav() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Active navigation link highlighting
function initActiveNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav(); // Call once on load
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCVDownload();
  initSmoothScroll();
  initEntranceAnimations();
  initMobileNav();
  initActiveNavigation();
});

// Add keyboard accessibility for theme toggle
document.addEventListener("keydown", (e) => {
  if (e.key === "t" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    document.getElementById("theme-btn").click();
  }
});
