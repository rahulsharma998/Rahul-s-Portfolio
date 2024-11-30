// *=============================== toggle icon navbar ==================================
// Select the menu icon (hamburger) and nav menu
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

// Add event listener to the menu icon
menuIcon.addEventListener('click', function() {
    // Toggle the 'nav-active' class to show or hide the menu
    navMenu.classList.toggle('nav-active');
    
    // Toggle the 'bx-x' class to change the hamburger icon to 'X'
    menuIcon.classList.toggle('bx-x');
});

// *=============================== github calender ==================================
GitHubCalendar(".calendar", "rahulsharma998");

// or enable responsive functionality:
GitHubCalendar(".calendar", "rahulsharma998", { responsive: true });

// *=============================== resume opening in a new tab ==================================
let resume1 = document.getElementById("resume-button-1").addEventListener("click", NewTab);
let resume2 = document.getElementById("resume-button-2").addEventListener("click", NewTab);

function NewTab() {
    window.open(
        "./RahulSharma-FullStackWebDeveloper-2rz9.pdf",
        "_blank"
    );
}

// *=============================== scroll sections active link ==================================
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // *=============================== sticky navbar ==================================
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // *=============================== remove toggle icon and navbar when click navbar link (scroll) ==================================
    menuIcon.classList.remove('bx-x');
    navMenu.classList.remove('nav-active');
};

// *=============================== scroll reveal ==================================
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .project-card, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'left' });

// *=============================== typed js ===================================
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Web Developer', 'Frontend Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backdelay: 1000,
    loop: true
});
