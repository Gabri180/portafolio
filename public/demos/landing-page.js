document.addEventListener('DOMContentLoaded', () => {
    const demoContainer = document.getElementById('landing-page-demo');
    if (!demoContainer) return;
  
    demoContainer.innerHTML = `
      <div class="landing-demo">
        <section class="hero-demo">
          <h1 class="hero-title">Bienvenido al Futuro</h1>
          <p class="hero-subtitle">Crea experiencias increíbles con nuestras soluciones innovadoras</p>
          <button class="cta-btn">Comenzar Ahora</button>
        </section>
  
        <section class="features-demo">
          <h2>Nuestras Características</h2>
          <div class="features-grid-demo">
            <div class="feature-card-demo">
              <div class="feature-icon-demo">🚀</div>
              <h3>Rápido</h3>
              <p>Rendimiento optimizado para la mejor experiencia</p>
            </div>
            <div class="feature-card-demo">
              <div class="feature-icon-demo">🎨</div>
              <h3>Diseño Moderno</h3>
              <p>Interfaces elegantes y contemporáneas</p>
            </div>
            <div class="feature-card-demo">
              <div class="feature-icon-demo">📱</div>
              <h3>Responsive</h3>
              <p>Perfecto en cualquier dispositivo</p>
            </div>
            <div class="feature-card-demo">
              <div class="feature-icon-demo">🔒</div>
              <h3>Seguro</h3>
              <p>Máxima seguridad para tus datos</p>
            </div>
          </div>
        </section>
  
        <section class="stats-demo">
          <div class="stat-demo">
            <h3 class="stat-number" data-target="10000">0</h3>
            <p>Usuarios Activos</p>
          </div>
          <div class="stat-demo">
            <h3 class="stat-number" data-target="50">0</h3>
            <p>Países</p>
          </div>
          <div class="stat-demo">
            <h3 class="stat-number" data-target="99">0</h3>
            <p>% Satisfacción</p>
          </div>
        </section>
      </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .landing-demo {
        width: 100%;
      }
      .hero-demo {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 4rem 2rem;
        text-align: center;
        border-radius: 1rem;
        margin-bottom: 3rem;
        color: white;
      }
      .hero-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        animation: fadeInUp 1s ease;
      }
      .hero-subtitle {
        font-size: 1.125rem;
        margin-bottom: 2rem;
        opacity: 0.9;
        animation: fadeInUp 1s ease 0.2s both;
      }
      .cta-btn {
        padding: 1rem 2.5rem;
        background: white;
        color: #667eea;
        border: none;
        border-radius: 50px;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
        animation: fadeInUp 1s ease 0.4s both;
      }
      .cta-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .features-demo {
        padding: 2rem 0;
      }
      .features-demo h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
        color: var(--text-light);
      }
      .features-grid-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
      }
      .feature-card-demo {
        background: rgba(255, 255, 255, 0.05);
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        transition: transform 0.3s;
      }
      .feature-card-demo:hover {
        transform: translateY(-10px);
      }
      .feature-icon-demo {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      .feature-card-demo h3 {
        color: var(--text-light);
        margin-bottom: 0.5rem;
      }
      .feature-card-demo p {
        color: var(--text-gray);
        font-size: 0.875rem;
      }
      .stats-demo {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 3rem 2rem;
        border-radius: 1rem;
        color: white;
      }
      .stat-demo {
        text-align: center;
      }
      .stat-number {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .stat-demo p {
        font-size: 1rem;
        opacity: 0.9;
      }
      @media (max-width: 768px) {
        .hero-title {
          font-size: 2rem;
        }
        .stats-demo {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  
    // Animación de contadores
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
  
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString() + (target === 99 ? '%' : '+');
          }
        };
  
        updateCounter();
      });
    };
  
    setTimeout(animateCounters, 500);
  });
  