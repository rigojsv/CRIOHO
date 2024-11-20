// Main JavaScript file
import '../less/main.less';

document.addEventListener('DOMContentLoaded', () => {
  const mySlider = new SliderController();

  // Mobile menu toggle
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');

  if (window.innerWidth <= 768) {
    hamburger.addEventListener('click', () => {
      console.log("funciona hasta aqui");
      navLinks.classList.toggle('active');
    });
  }

  // Event registration buttons
  const registerButtons = document.querySelectorAll('.register-btn');
  registerButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('¡Registro exitoso! Te enviaremos más información por correo electrónico.');
    });
  });
});



class SliderController {
  slider = null;
  slides = [];
  framestack = null;
  intervalTime = 8000;
  intervalId = null;
  currentSlide = -1;
  slideDirection = 1;

  constructor() {
    this.slider = document.querySelector('.slider');
    this.framestack = document.querySelector('.frametrack');
    this.slides = [...document.querySelectorAll('.frametrack .slide')];

    if (!this.slider || !this.framestack || this.slides.length === 0) {
      console.error("Estructura del slider no encontrada.");
      return;
    }

    this.currentSlide = 0;
    this.generateUI();
    this.moveToSlide(0);
  }

  moveToSlide(slideIndex) {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
    this.currentSlide = slideIndex;
    this.framestack.style.left = `-${this.currentSlide * 100}vw`;
    this.updateNavigation();
    this.tick();
  }

  tick() {
    this.intervalId = setTimeout(() => {
      this.moveToNext();
    }, this.intervalTime);
  }

  moveToNext() {
    if (this.currentSlide + this.slideDirection >= this.slides.length || this.currentSlide + this.slideDirection < 0) {
      this.slideDirection *= -1;
    }
    this.currentSlide += this.slideDirection;
    this.moveToSlide(this.currentSlide);
  }


  updateNavigation() {
    const navigationIndexes = document.querySelectorAll('.navigation-index');
    navigationIndexes.forEach((nav, i) => {
      nav.classList.toggle('active', i === this.currentSlide);
    });
  }

  generateUI() {
    let btnDerecha = document.createElement("div");
    btnDerecha.innerHTML = '&gt;';
    btnDerecha.classList.add('navigation-btn', 'navigate-right');
    btnDerecha.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.slideDirection = 1;
      this.moveToNext();
    });

    let btnIzquierda = document.createElement("div");
    btnIzquierda.innerHTML = '&lt;';
    btnIzquierda.classList.add('navigation-btn', 'navigate-left');
    btnIzquierda.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.slideDirection = -1;
      this.moveToNext();
    });

    this.slider.appendChild(btnIzquierda);
    this.slider.appendChild(btnDerecha);

    let contenedorNavegacion = document.createElement("div");
    contenedorNavegacion.classList.add('navigation-container');

    this.slides.forEach((_o, i) => {
      let slideNavigate = document.createElement('div');
      slideNavigate.classList.add('navigation-index');
      slideNavigate.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.moveToSlide(i);
      });
      contenedorNavegacion.appendChild(slideNavigate);
    });

    this.slider.appendChild(contenedorNavegacion);
    this.updateNavigation();
  }
}


//validacione de formulario
const forms = document.querySelectorAll('form');




forms.forEach(form => {
  const nameInput = form.querySelector('[id="name"]');
  const emailInput = form.querySelector('[id="email"]');
  const phoneInput = form.querySelector('[id="phone"]');
  const messageInput = form.querySelector('[id="message"]');

  phoneInput.addEventListener('input', (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/g, '');
    if (value.length > 8) {
      e.target.value = value.slice(0, 8);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    
    if (!nameInput || nameInput.value.trim() === '') {
      alert('Por favor, ingresa tu nombre.');
      valid = false;
    } else if (!emailInput || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      valid = false;
    }else if (!phoneInput || phoneInput.value.length < 8) {
      alert('Por favor, ingresa un número de teléfono válido.');
      valid = false;
    }else if (!messageInput || messageInput.value.trim() === '') {
      alert('Por favor, ingresa un mensaje.');
      valid = false;
    }

    if (valid) {
      alert('¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.');
      form.reset();
    }
  });
});