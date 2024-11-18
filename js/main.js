// Main JavaScript file
import './styles/main.less'

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.createElement('button');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = '☰';
  
  if (window.innerWidth <= 768) {
    document.querySelector('.main-nav').prepend(hamburger);
    navLinks.style.display = 'none';
    
    hamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
    });
  }

  // Donation amount buttons
  const amountButtons = document.querySelectorAll('.amount-btn');
  amountButtons.forEach(button => {
    button.addEventListener('click', () => {
      amountButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.');
      form.reset();
    });
  });

  // Event registration buttons
  const registerButtons = document.querySelectorAll('.register-btn');
  registerButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('¡Registro exitoso! Te enviaremos más información por correo electrónico.');
    });
  });

  // Service appointment buttons
  const appointmentButtons = document.querySelectorAll('.cta-button');
  appointmentButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = '/contacto.html';
    });
  });
});