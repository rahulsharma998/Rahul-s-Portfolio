document.addEventListener('DOMContentLoaded', function () {

  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.getElementById("nav-menu");

  if (menuIcon && navMenu) {
    menuIcon.addEventListener("click", function () {
      navMenu.classList.toggle("nav-active");
      menuIcon.classList.toggle("bx-x");
      menuIcon.classList.toggle("bx-menu");
    });
  }

  // GitHub Calendar (only if element exists)
  const calendarElement = document.querySelector(".calendar");
  if (calendarElement && typeof GitHubCalendar !== 'undefined') {
    try {
      GitHubCalendar(".calendar", "rahulsharma998", { responsive: true });
    } catch (error) {
      console.log('GitHub calendar not loaded (section may be commented out)');
    }
  }

  const resume1 = document.getElementById("resume-button-1");
  const resume2 = document.getElementById("resume-button-2");

  function NewTab() {
    window.open("./RahulResume.pdf", "_blank");
  }

  if (resume1) {
    resume1.addEventListener("click", NewTab);
  }
  if (resume2) {
    resume2.addEventListener("click", NewTab);
  }

  let sections = document.querySelectorAll("section");
  let navlinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navlinks.forEach((links) => {
          links.classList.remove("active");
          const activeLink = document.querySelector("header nav a[href*=" + id + "]");
          if (activeLink) {
            activeLink.classList.add("active");
          }
        });
      }
    });

    let header = document.querySelector("header");
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 100);
    }

    if (menuIcon && navMenu) {
      menuIcon.classList.remove("bx-x");
      menuIcon.classList.add("bx-menu");
      navMenu.classList.remove("nav-active");
    }
  };

  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
      distance: "80px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
    ScrollReveal().reveal(".home-img, .skills-container, .project-card, .contact form", { origin: "bottom" });
    ScrollReveal().reveal(".home-content h1", { origin: "left" });
    ScrollReveal().reveal(".home-content p, .about-content", { origin: "left" });
  }

  setTimeout(function () {
    try {
      if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector(".multiple-text");
        if (typedElement) {
          const typed = new Typed(".multiple-text", {
            strings: ["Full Stack Developer", "Mobile App Developer", "Frontend Developer"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1500,
            startDelay: 0,
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
          });
          console.log('✅ Typed.js initialized successfully');
        } else {
          console.error('❌ .multiple-text element not found');
        }
      } else {
        console.error('❌ Typed.js library not loaded');
      }
    } catch (error) {
      console.error('❌ Error initializing Typed.js:', error);
    }
  }, 100);

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formResult = document.getElementById('formResult');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ml-2"></i>';
      formResult.classList.add('hidden');

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          formResult.textContent = '✅ Thank you! Your message has been sent successfully.';
          formResult.classList.remove('hidden', 'text-red-500');
          formResult.classList.add('text-green-400');
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Something went wrong');
        }
      } catch (error) {
        formResult.textContent = '❌ Oops! Something went wrong. Please try again.';
        formResult.classList.remove('hidden', 'text-green-400');
        formResult.classList.add('text-red-500');
        console.error('Form submission error:', error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-arrow-right ml-2"></i>';
      }
    });
  }

});
