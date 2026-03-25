// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initBMICalculator();
  initContactForm();
  initMobileMenu();
});

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile menu if open
        document.querySelector('.nav-links')?.classList.remove('active');
      }
    });
  });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ========== BMI CALCULATOR ==========
function initBMICalculator() {
  const form = document.getElementById('bmi-form');
  const resultEl = document.getElementById('bmi-result');
  const bmiValueEl = document.getElementById('bmi-value');
  const bmiCategoryEl = document.getElementById('bmi-category');
  const bmiBarFill = document.getElementById('bmi-bar-fill');
  const bmiMessageEl = document.getElementById('bmi-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      showBMIError('Please enter valid height and weight values.');
      return;
    }

    if (height < 50 || height > 300) {
      showBMIError('Height should be between 50 and 300 cm.');
      return;
    }

    if (weight < 10 || weight > 500) {
      showBMIError('Weight should be between 10 and 500 kg.');
      return;
    }

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const bmiRound = bmi.toFixed(1);

    let category, color, message, barWidth;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#29B6F6';
      message = 'You may need to gain some weight. Consult our nutritionists for a personalized plan.';
      barWidth = Math.max(10, (bmi / 40) * 100);
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = '#4CAF50';
      message = 'Great job! You\'re in the healthy range. Maintain your lifestyle with our wellness programs.';
      barWidth = (bmi / 40) * 100;
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#FF9800';
      message = 'You\'re slightly above the healthy range. Our weight loss plans can help you get back on track.';
      barWidth = (bmi / 40) * 100;
    } else {
      category = 'Obese';
      color = '#F44336';
      message = 'Our specialized Anti-Gravity Therapy and diet plans are designed to help you achieve your ideal weight.';
      barWidth = Math.min(100, (bmi / 40) * 100);
    }

    bmiValueEl.textContent = bmiRound;
    bmiValueEl.style.color = color;
    bmiCategoryEl.textContent = category;
    bmiCategoryEl.style.color = color;
    bmiBarFill.style.width = barWidth + '%';
    bmiBarFill.style.background = `linear-gradient(90deg, ${color}, ${color}dd)`;
    bmiMessageEl.textContent = message;

    resultEl.classList.add('show');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function showBMIError(msg) {
    bmiValueEl.textContent = '—';
    bmiValueEl.style.color = '#F44336';
    bmiCategoryEl.textContent = 'Invalid Input';
    bmiCategoryEl.style.color = '#F44336';
    bmiBarFill.style.width = '0%';
    bmiMessageEl.textContent = msg;
    resultEl.classList.add('show');
  }
}

// ========== CONTACT FORM ==========
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    const btn = form.querySelector('.contact-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      successEl.classList.add('show');

      setTimeout(() => {
        successEl.classList.remove('show');
      }, 5000);
    }, 1500);
  });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}
