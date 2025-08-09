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

// Optional: Contact Form Submission (Formspree or EmailJS example)
const form = document.getElementById("contact-form");
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = new FormData(form);
  const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    alert("Thank you! Your message has been sent.");
    form.reset();
  } else {
    alert("Oops! Something went wrong.");
  }
});

// Optional: Simple fade-in animation on scroll
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
