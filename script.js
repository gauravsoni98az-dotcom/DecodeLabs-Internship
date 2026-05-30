// Select the hamburger button and nav links
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// When hamburger is clicked, toggle the 'open' class
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close the menu when any nav link is clicked (good for mobile)
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});