document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      mainNav.classList.toggle("active");

      // Create overlay if it doesn't exist
      if (!overlay) {
        const newOverlay = document.createElement("div");
        newOverlay.classList.add("overlay");
        body.appendChild(newOverlay);

        // Update overlay reference
        overlay = newOverlay;
      }

      overlay.classList.toggle("active");
      body.classList.toggle("no-scroll");
    });
  }

  // Close mobile nav when clicking on overlay
  if (overlay) {
    overlay.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("no-scroll");
    });
  }

  // Portfolio Filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Show/hide portfolio items based on filter
        portfolioItems.forEach((item) => {
          if (filterValue === "all") {
            item.style.display = "block";
          } else if (item.classList.contains(filterValue)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", function () {
        // Close all other FAQ items
        faqItems.forEach((faqItem) => {
          if (faqItem !== item) {
            faqItem.classList.remove("active");
          }
        });

        // Toggle current FAQ item
        item.classList.toggle("active");
      });
    });
  }

  // Testimonial Slider
  const testimonialSlider = document.querySelector(".testimonial-slider");
  const testimonialDots = document.querySelector(".testimonial-dots");
  const testimonialCards = document.querySelectorAll(".testimonial-card");

  if (testimonialSlider && testimonialCards.length > 0) {
    // Create dots for each testimonial
    testimonialCards.forEach((_, index) => {
      if (testimonialDots) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("data-index", index);
        testimonialDots.appendChild(dot);
      }
    });

    // Add click event to dots
    const dots = document.querySelectorAll(".dot");
    if (dots.length > 0) {
      dots.forEach((dot) => {
        dot.addEventListener("click", function () {
          const index = this.getAttribute("data-index");

          // Remove active class from all dots
          dots.forEach((d) => d.classList.remove("active"));

          // Add active class to clicked dot
          this.classList.add("active");

          // Scroll to the corresponding testimonial
          const cardWidth =
            testimonialCards[0].offsetWidth +
            parseInt(getComputedStyle(testimonialCards[0]).marginRight);
          testimonialSlider.scrollTo({
            left: cardWidth * index,
            behavior: "smooth",
          });
        });
      });
    }

    // Update active dot on scroll
    testimonialSlider.addEventListener("scroll", function () {
      const scrollPosition = testimonialSlider.scrollLeft;
      const cardWidth =
        testimonialCards[0].offsetWidth +
        parseInt(getComputedStyle(testimonialCards[0]).marginRight);
      const activeIndex = Math.round(scrollPosition / cardWidth);

      dots.forEach((dot) => dot.classList.remove("active"));
      dots[activeIndex]?.classList.add("active");
    });
  }

  // Form Validation
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      let isValid = true;
      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector(
        'textarea[name="message"]'
      );

      // Reset error messages
      const errorMessages = contactForm.querySelectorAll(".error-message");
      errorMessages.forEach((error) => error.remove());

      // Validate name
      if (nameInput && nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name");
        isValid = false;
      }

      // Validate email
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
          showError(emailInput, "Please enter your email");
          isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
          showError(emailInput, "Please enter a valid email");
          isValid = false;
        }
      }

      // Validate message
      if (messageInput && messageInput.value.trim() === "") {
        showError(messageInput, "Please enter your message");
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
      } else {
        // For demo purposes, prevent form submission and show success message
        e.preventDefault();
        contactForm.innerHTML =
          '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Thank you for your message!</h3><p>We will get back to you as soon as possible.</p></div>';
      }
    });

    function showError(input, message) {
      const formGroup = input.closest(".form-group");
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = message;
      formGroup.appendChild(errorMessage);
      input.classList.add("error");
    }
  }

  // Smooth Scroll for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (menuToggle && menuToggle.classList.contains("active")) {
          menuToggle.classList.remove("active");
          mainNav.classList.remove("active");
          overlay?.classList.remove("active");
          body.classList.remove("no-scroll");
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for header
          behavior: "smooth",
        });
      }
    });
  });

  // Animate on Scroll
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  if (animatedElements.length > 0) {
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    }

    // Add animation class when element is in viewport
    function animateOnScroll() {
      animatedElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add("animated");
        }
      });
    }

    // Run on page load
    animateOnScroll();

    // Run on scroll
    window.addEventListener("scroll", animateOnScroll);
  }

  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (
      currentPage === linkPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });
});
