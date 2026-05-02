// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initBMICalculator();
  initContactForm();
  initMobileMenu();
  initChatbot();
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

// ========== CHATBOT ==========
function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const window_ = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messagesEl = document.getElementById('chatbot-messages');
  const suggestionsEl = document.getElementById('chatbot-suggestions');
  const badge = document.getElementById('chatbot-badge');

  if (!toggle || !window_) return;

  let isOpen = false;
  let hasGreeted = false;

  // --- Knowledge Base ---
  const knowledgeBase = [
    {
      keywords: ['diet plan', 'plans', 'meal plan', 'weight loss plan', 'what plan', 'which plan'],
      response: `We offer three tailored diet plans:\n\n🟢 **Basic** ($49/mo) — Personalized meal plan, weekly nutritionist check-in, recipe library access, and progress tracking.\n\n🔵 **Premium** ($99/mo) — Everything in Basic plus Anti-Gravity therapy sessions (2x/week), daily nutritionist support, custom workouts, and body composition analysis.\n\n🟣 **Elite** ($199/mo) — Everything in Premium plus unlimited Anti-Gravity sessions, 1-on-1 personal trainer, genetic nutrition profiling, and monthly lab work.\n\nWould you like to explore a specific plan?`
    },
    {
      keywords: ['basic plan', 'basic'],
      response: `The **Basic Plan** is perfect for getting started at **$49/month**. It includes:\n\n✅ Personalized meal plan\n✅ Weekly nutritionist check-in\n✅ Access to our recipe library\n✅ Progress tracking app\n✅ Email support\n\nIt's great for those who want professional guidance at an affordable price. Would you like to sign up?`
    },
    {
      keywords: ['premium plan', 'premium'],
      response: `Our most popular **Premium Plan** at **$99/month** gives you the full experience:\n\n✅ Everything in Basic\n✅ Anti-Gravity therapy sessions (2x/week)\n✅ Daily nutritionist support\n✅ Custom workout routines\n✅ Body composition analysis\n✅ Priority booking\n\n97% of our success stories come from Premium members! Would you like to book a consultation?`
    },
    {
      keywords: ['elite plan', 'elite'],
      response: `The **Elite Plan** is our most comprehensive offering at **$199/month**. You get:\n\n✅ Everything in Premium\n✅ Unlimited Anti-Gravity sessions\n✅ 1-on-1 personal trainer\n✅ Genetic nutrition profiling\n✅ Monthly health lab work\n✅ 24/7 concierge support\n\nThis is ideal for those who want the absolute best results with VIP-level care.`
    },
    {
      keywords: ['anti-gravity', 'gravity therapy', 'therapy', 'suspension', 'anti gravity'],
      response: `🛸 Our **Anti-Gravity Therapy** is a revolutionary, science-backed approach to exercise!\n\nIt uses advanced suspension technology to reduce joint stress by up to 80% during workouts. This makes it:\n\n• Perfect for people with joint problems or injuries\n• Effective for all body types and fitness levels\n• Low-impact yet highly efficient for calorie burning\n• Clinically proven to accelerate weight loss\n\nAvailable in our Premium ($99/mo) and Elite ($199/mo) plans. Want to try a session?`
    },
    {
      keywords: ['bmi', 'body mass index', 'ideal weight', 'calculate', 'healthy weight'],
      response: `📊 **BMI (Body Mass Index)** helps assess if your weight is healthy for your height. Here's a quick guide:\n\n• **Under 18.5** — Underweight\n• **18.5 – 24.9** — Normal (healthy)\n• **25 – 29.9** — Overweight\n• **30+** — Obese\n\nYou can use our **BMI Calculator** right on this page! Scroll to the "Health Check" section or click the "Check Your BMI" button in the hero.\n\nWant me to help you interpret your results?`
    },
    {
      keywords: ['book', 'consultation', 'appointment', 'schedule', 'sign up', 'register', 'get started'],
      response: `📅 Booking a **free consultation** is easy! You have a few options:\n\n1. **Fill out the form** in our Contact section below\n2. **Call us** at +1 (555) 0-GRAVITY\n3. **Email** hello@antigravityclinic.com\n\nOur team will create a personalized plan based on your goals, health conditions, and lifestyle. The first consultation is completely free!\n\nShall I scroll you to the contact form?`
    },
    {
      keywords: ['price', 'pricing', 'cost', 'how much', 'expensive', 'afford', 'pay', 'payment'],
      response: `💰 Our plans are designed to be accessible:\n\n• **Basic** — $49/month\n• **Premium** — $99/month ⭐ Most Popular\n• **Elite** — $199/month\n\nAll plans include a money-back guarantee for the first 30 days. We also offer flexible payment options and insurance partnership programs.\n\nThe first consultation is always **free**! Would you like to learn more about a specific plan?`
    },
    {
      keywords: ['nutrition', 'nutritionist', 'food', 'eat', 'meal', 'recipe', 'calorie', 'macro', 'protein', 'carb'],
      response: `🥗 Our **Nutrition Guidance** is led by certified nutritionists who provide:\n\n• Personalized meal frameworks based on your metabolism\n• Custom calorie and macro targets\n• Adaptive plans that evolve with your progress\n• Access to 500+ healthy recipes\n• Food allergy and preference accommodations\n\nEvery plan includes nutrition guidance — from weekly check-ins (Basic) to daily support (Premium/Elite).`
    },
    {
      keywords: ['result', 'success', 'testimonial', 'review', 'before after', 'how long', 'effective'],
      response: `🌟 Our results speak for themselves!\n\n• **15,000+** patients treated\n• **97%** success rate\n• **4.9★** average patient rating\n\nReal success stories:\n• Sarah R. lost **35 kg** in 8 months (Premium)\n• Marcus J. lost **42 kg** (Elite)\n• Anita P. lost **28 kg** (Premium)\n\nMost patients see noticeable results within 4-6 weeks. Every body is different, and our plans adapt to ensure steady, sustainable progress.`
    },
    {
      keywords: ['location', 'address', 'where', 'visit', 'clinic', 'office', 'near'],
      response: `📍 Our clinic is located at:\n\n**42 Orbital Avenue, Health District, NY 10001**\n\n🕐 Working Hours: Mon — Sat: 7:00 AM — 9:00 PM\n📞 Phone: +1 (555) 0-GRAVITY\n✉️ Email: hello@antigravityclinic.com\n\nOur state-of-the-art facility features the latest anti-gravity technology and is staffed by 45+ expert doctors and nutritionists. We'd love to see you!`
    },
    {
      keywords: ['doctor', 'team', 'expert', 'staff', 'specialist', 'who'],
      response: `👨‍⚕️ Our clinic is staffed by **45+ expert doctors and nutritionists** who specialize in:\n\n• Clinical nutrition & dietetics\n• Sports medicine\n• Anti-gravity rehabilitation therapy\n• Metabolic health\n• Behavioral psychology for eating habits\n\nAll our practitioners are board-certified and stay up to date with the latest research. Your health is in the best hands!`
    },
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo'],
      response: `Hey there! 👋 Welcome to AntiGravity Clinic! I'm GravityBot, your wellness assistant.\n\nI can help you with:\n🔹 Diet plans & pricing\n🔹 Anti-Gravity therapy info\n🔹 BMI & nutrition questions\n🔹 Booking a consultation\n\nWhat would you like to know?`
    },
    {
      keywords: ['thank', 'thanks', 'thx', 'appreciated', 'helpful'],
      response: `You're welcome! 😊 I'm glad I could help. If you have any more questions about our services, plans, or anything else, feel free to ask anytime!\n\nYou can also book a **free consultation** whenever you're ready. Your transformation journey is just a click away! 🚀`
    },
    {
      keywords: ['lose weight', 'weight loss', 'fat', 'slim', 'thin', 'burn', 'shed'],
      response: `🏋️ Weight loss is at the core of what we do! Our approach combines:\n\n1. **Personalized Nutrition** — Custom meal plans based on your metabolism\n2. **Anti-Gravity Therapy** — Low-impact exercise that burns more calories with less joint stress\n3. **Expert Coaching** — Regular check-ins with certified nutritionists\n4. **Progress Tracking** — Data-driven adjustments for continuous results\n\nOur patients lose an average of **4-6 kg per month** safely and sustainably. Which plan interests you?`
    },
    {
      keywords: ['exercise', 'workout', 'gym', 'fitness', 'training'],
      response: `💪 Our exercise programs are tailored to your fitness level:\n\n• **Anti-Gravity Sessions** — Revolutionary low-impact workouts (Premium & Elite)\n• **Custom Workout Routines** — Designed by certified trainers (Premium & Elite)\n• **1-on-1 Personal Training** — Dedicated trainer for maximum results (Elite)\n\nThe beauty of Anti-Gravity therapy is that it reduces joint stress by 80%, making effective exercise accessible for everyone — regardless of current physical condition!`
    },
    {
      keywords: ['insurance', 'cover', 'health plan'],
      response: `🏥 We partner with several major insurance providers. Coverage varies by plan and region.\n\nTo check if your insurance covers our services:\n1. Contact us at +1 (555) 0-GRAVITY\n2. Email hello@antigravityclinic.com with your insurance details\n3. Our billing team will verify coverage within 24 hours\n\nMany patients find that our plans are partially or fully covered. Let us help you find out!`
    },
    {
      keywords: ['safe', 'side effect', 'risk', 'danger', 'medical'],
      response: `✅ Safety is our top priority!\n\n• All programs are supervised by board-certified doctors\n• Anti-Gravity therapy is FDA-reviewed and clinically tested\n• We conduct thorough health assessments before starting any plan\n• Regular monitoring ensures your body responds well\n• Our Elite plan includes monthly lab work for full health tracking\n\nWe've treated 15,000+ patients with a stellar safety record. Your wellbeing always comes first.`
    }
  ];

  // Fallback responses
  const fallbackResponses = [
    `That's a great question! I'm not sure I fully understand, but I'd love to connect you with our team. You can reach us at **hello@antigravityclinic.com** or call **+1 (555) 0-GRAVITY**.\n\nOr try asking me about our diet plans, Anti-Gravity therapy, BMI, pricing, or booking a consultation! 😊`,
    `Hmm, I might not have the answer to that specific question. 🤔 Our human experts would be the best to help! You can:\n\n📞 Call: +1 (555) 0-GRAVITY\n✉️ Email: hello@antigravityclinic.com\n\nOr feel free to rephrase — I know a lot about our services, plans, and the science behind them!`,
    `I appreciate your question! While I may not have that specific info, I can tell you all about our **diet plans**, **Anti-Gravity therapy**, **nutrition guidance**, or help you **book a free consultation**.\n\nWhat interests you most?`
  ];

  let fallbackIndex = 0;

  // --- Time formatter ---
  function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // --- Create message HTML ---
  function createMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `chatbot-msg ${sender}`;

    const avatar = sender === 'bot' ? '🤖' : '👤';
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    div.innerHTML = `
      <div class="chatbot-msg-avatar">${avatar}</div>
      <div>
        <div class="chatbot-msg-bubble">${formattedText}</div>
        <span class="chatbot-msg-time">${getTimeString()}</span>
      </div>
    `;

    return div;
  }

  // --- Add typing indicator ---
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chatbot-typing';
    div.id = 'chatbot-typing-indicator';
    div.innerHTML = `
      <div class="chatbot-msg-avatar">🤖</div>
      <div class="chatbot-typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function hideTyping() {
    const indicator = document.getElementById('chatbot-typing-indicator');
    if (indicator) indicator.remove();
  }

  // --- Scroll to latest message ---
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  // --- Find best response ---
  function getResponse(userText) {
    const lower = userText.toLowerCase();

    // Score each knowledge entry
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (lower.includes(kw)) {
          score += kw.split(' ').length; // multi-word keywords score higher
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch.response;
    }

    // Fallback — rotate through different responses
    const resp = fallbackResponses[fallbackIndex % fallbackResponses.length];
    fallbackIndex++;
    return resp;
  }

  // --- Send user message & get bot reply ---
  function sendMessage(text) {
    if (!text.trim()) return;

    // Add user message
    const userMsg = createMessage(text, 'user');
    messagesEl.appendChild(userMsg);
    scrollToBottom();

    // Show typing, then respond
    setTimeout(() => {
      showTyping();
      scrollToBottom();

      const delay = 800 + Math.random() * 1200;
      setTimeout(() => {
        hideTyping();
        const response = getResponse(text);
        const botMsg = createMessage(response, 'bot');
        messagesEl.appendChild(botMsg);
        scrollToBottom();
      }, delay);
    }, 300);
  }

  // --- Toggle chat window ---
  function openChat() {
    isOpen = true;
    toggle.classList.add('open');
    window_.classList.add('open');
    badge.classList.add('hidden');

    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          hideTyping();
          const greeting = createMessage(
            `Hey there! 👋 I'm **GravityBot**, your personal wellness assistant at AntiGravity Clinic.\n\nI can help you with diet plans, Anti-Gravity therapy, BMI questions, pricing, booking, and more.\n\nHow can I help you today?`,
            'bot'
          );
          messagesEl.appendChild(greeting);
          scrollToBottom();
        }, 1200);
      }, 400);
    }

    setTimeout(() => input.focus(), 500);
  }

  function closeChat() {
    isOpen = false;
    toggle.classList.remove('open');
    window_.classList.remove('open');
  }

  // --- Event Listeners ---
  toggle.addEventListener('click', () => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  closeBtn.addEventListener('click', closeChat);

  // Send on form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      sendMessage(text);
      input.value = '';
    }
  });

  // Quick reply chips
  suggestionsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.chatbot-chip');
    if (chip) {
      const query = chip.getAttribute('data-query');
      sendMessage(query);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeChat();
    }
  });
}

