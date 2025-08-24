// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("active");
menuToggle.classList.toggle("active");
});

// Smooth scroll + close menu after click
document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener("click", function(e) {
e.preventDefault();
const targetID = this.getAttribute("href").slice(1);
const targetSection = document.getElementById(targetID);
if (targetSection) {
targetSection.scrollIntoView({ behavior: "smooth" });
}
navLinks.classList.remove("active");
menuToggle.classList.remove("active");
});
});

// : Contact Form Submission (Formspree)
const form = document.getElementById("contact-form");
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = new FormData(form);
  const response = await fetch("https://formspree.io/f/xeoznpog", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    alert("Thank you! Your message has been sent, will get back to you soon");
    form.reset();
  } else {
    alert( "Oops! Something went wrong. try again later");
  }
});

//  Simple fade-in animation on scroll
const sections = document.querySelectorAll('section');
const options = { threshold: 0.1 };
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, options);

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

// Scroll fade-in animation for main sections
document.addEventListener('DOMContentLoaded', () => {

  const faders = document.querySelectorAll('.about, .stack, .projects, .contact');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('fade-in-visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});