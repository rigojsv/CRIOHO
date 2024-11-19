// Main JavaScript file
import '../less/main.less';

document.addEventListener('DOMContentLoaded', () => {
  const mySlider = new SliderController();

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



class SliderController {
  slider = null;
  slides = [];
  framestack = null;
  intervalTime = 3000;
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
