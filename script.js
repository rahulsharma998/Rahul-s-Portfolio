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
    window.open("./Rahul_Sharma_AI-3.pdf", "_blank");
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
    let scrollTop = document.getElementById("scroll-top");

    if (header) {
      header.classList.toggle("sticky", window.scrollY > 100);
    }

    if (scrollTop) {
      scrollTop.classList.toggle("show", window.scrollY > 500);
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
            strings: ["Full Stack Developer", "AI Engineer","Mobile App Developer", "Frontend Developer"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
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

  if (formResult) {
    formResult.classList.add('hidden');
    formResult.textContent = '';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ml-2"></i>';
      formResult.classList.add('hidden');

      try {
        const formData = new FormData(contactForm);
        
        // Log submission attempt
        console.log('🚀 Sending message to Web3Forms...');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        console.log('📬 Web3Forms API Response:', data);

        // Artificial delay of 800ms to ensure the user sees the "Sending..." state
        await new Promise(resolve => setTimeout(resolve, 800));

        if (data.success) {
          formResult.textContent = '✅ Success! Your message has been sent. Please check your inbox (and Spam folder).';
          formResult.classList.remove('hidden', 'text-red-500');
          formResult.classList.add('text-green-400', 'animate-pulse');
          contactForm.reset();
          
          // Remove pulse after a few seconds
          setTimeout(() => formResult.classList.remove('animate-pulse'), 3000);
        } else {
          throw new Error(data.message || 'The server returned an error.');
        }
      } catch (error) {
        console.error('❌ Form submission failure:', error);
        formResult.textContent = `❌ Error: ${error.message || 'Something went wrong. Please check your connection or contact me via LinkedIn.'}`;
        formResult.classList.remove('hidden', 'text-green-400');
        formResult.classList.add('text-red-500');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-arrow-right ml-2"></i>';
      }
    });
  }

});
