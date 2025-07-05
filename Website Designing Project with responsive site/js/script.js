/**
 * TechServe - Main JavaScript File
 * This file contains all the custom JavaScript functionality for the website
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Initialize all tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize all popovers
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Smooth scrolling for anchor links
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for fixed navbar
            behavior: "smooth",
          });

          // Update URL hash without jumping
          history.pushState(null, null, targetId);
        }
      });
    });

  // Navbar scroll behavior
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });
  }

  // Portfolio filtering functionality (if on portfolio page)
  const portfolioFilters = document.querySelectorAll(".portfolio-filters .btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
    portfolioFilters.forEach(function (filter) {
      filter.addEventListener("click", function () {
        // Remove active class from all filters
        portfolioFilters.forEach(function (btn) {
          btn.classList.remove("active");
        });

        // Add active class to clicked filter
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Show/hide portfolio items based on filter
        portfolioItems.forEach(function (item) {
          if (filterValue === "*") {
            item.style.display = "block";
          } else if (item.classList.contains(filterValue.substring(1))) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Contact form validation and submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      let isValid = true;
      const formElements = contactForm.elements;

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (element.hasAttribute("required") && element.value.trim() === "") {
          isValid = false;
          element.classList.add("is-invalid");
        } else if (element.type === "email" && element.value.trim() !== "") {
          // Simple email validation
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(element.value)) {
            isValid = false;
            element.classList.add("is-invalid");
          } else {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
          }
        } else if (element.value.trim() !== "") {
          element.classList.remove("is-invalid");
          element.classList.add("is-valid");
        }

        // Add event listeners to clear validation on input
        element.addEventListener("input", function () {
          if (this.value.trim() !== "") {
            this.classList.remove("is-invalid");
          }
        });
      }

      if (isValid) {
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show a success message
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement("div");
        successMessage.className = "alert alert-success mt-3";
        successMessage.innerHTML =
          "<strong>Thank you!</strong> Your message has been sent successfully. We will get back to you soon.";

        // Hide the form and show success message
        contactForm.style.display = "none";
        formContainer.appendChild(successMessage);

        // Reset form
        contactForm.reset();

        // Remove success message and show form after 5 seconds (for demo purposes)
        setTimeout(function () {
          successMessage.remove();
          contactForm.style.display = "block";

          // Remove validation classes
          for (let i = 0; i < formElements.length; i++) {
            formElements[i].classList.remove("is-valid");
          }
        }, 5000);
      }
    });
  }

  // Testimonial carousel initialization (if exists)
  const testimonialCarousel = document.querySelector("#testimonialCarousel");
  if (testimonialCarousel) {
    new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      wrap: true,
    });
  }

  // Animation on scroll
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  if (animatedElements.length > 0) {
    // Simple function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    // Add animation class when element comes into view
    function handleScrollAnimation() {
      animatedElements.forEach(function (element) {
        if (isInViewport(element) && !element.classList.contains("animated")) {
          element.classList.add("animated", "animate-fade-in");
        }
      });
    }

    // Initial check and add scroll event listener
    handleScrollAnimation();
    window.addEventListener("scroll", handleScrollAnimation);
  }

  // Back to top button functionality
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Mobile menu toggle improvement
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      const isNavbarToggler = navbarToggler.contains(e.target);
      const isNavbarCollapse = navbarCollapse.contains(e.target);

      if (
        !isNavbarToggler &&
        !isNavbarCollapse &&
        navbarCollapse.classList.contains("show")
      ) {
        navbarToggler.click();
      }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = navbarCollapse.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      });
    });
  }

  // Add current year to copyright in footer
  const copyrightYear = document.querySelector(".copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
