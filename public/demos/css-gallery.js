document.addEventListener('DOMContentLoaded', () => {
    const demoContainer = document.getElementById('css-gallery-demo');
    if (!demoContainer) return;
  
    const images = [
      { title: 'Proyecto Principal', desc: 'Un diseño espectacular', tags: ['Diseño', 'UI/UX'], color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      { title: 'Arte Digital', desc: 'Creación artística moderna', tags: ['Arte', 'Digital'], color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      { title: 'Fotografía', desc: 'Capturando momentos únicos', tags: ['Foto'], color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
      { title: 'Ilustración', desc: 'Ilustraciones originales', tags: ['Ilustración'], color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
      { title: 'Diseño Web', desc: 'Interfaces modernas', tags: ['Web', 'UI'], color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
      { title: 'Branding', desc: 'Identidad visual impactante', tags: ['Marca'], color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
      { title: 'Motion Design', desc: 'Animaciones fluidas', tags: ['Animación'], color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
      { title: '3D Art', desc: 'Modelado 3D', tags: ['3D'], color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }
    ];
  
    demoContainer.innerHTML = `
      <div class="gallery-demo">
        <h2>Galería Creativa</h2>
        <p class="gallery-subtitle">Explora nuestra colección de diseños increíbles</p>
        <div class="gallery-grid-demo">
          ${images.map((img, index) => `
            <div class="gallery-item-demo ${index === 0 ? 'featured' : ''}" style="background: ${img.color}">
              <div class="gallery-overlay-demo">
                <h3>${img.title}</h3>
                <p>${img.desc}</p>
                <div class="gallery-tags-demo">
                  ${img.tags.map(tag => `<span class="tag-demo">${tag}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .gallery-demo {
        width: 100%;
      }
      .gallery-demo h2 {
        text-align: center;
        font-size: 2.5rem;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
      }
      .gallery-subtitle {
        text-align: center;
        color: var(--text-gray);
        margin-bottom: 2rem;
      }
      .gallery-grid-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        grid-auto-rows: 200px;
      }
      .gallery-item-demo {
        border-radius: 1rem;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: transform 0.3s;
      }
      .gallery-item-demo.featured {
        grid-column: span 2;
        grid-row: span 2;
      }
      .gallery-item-demo:hover {
        transform: translateY(-5px);
      }
      .gallery-overlay-demo {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.5rem;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .gallery-item-demo:hover .gallery-overlay-demo {
        opacity: 1;
      }
      .gallery-overlay-demo h3 {
        color: white;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        transform: translateY(20px);
        transition: transform 0.3s 0.1s;
      }
      .gallery-item-demo:hover .gallery-overlay-demo h3 {
        transform: translateY(0);
      }
      .gallery-overlay-demo p {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.875rem;
        margin-bottom: 0.75rem;
        transform: translateY(20px);
        transition: transform 0.3s 0.2s;
      }
      .gallery-item-demo:hover .gallery-overlay-demo p {
        transform: translateY(0);
      }
      .gallery-tags-demo {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        transform: translateY(20px);
        transition: transform 0.3s 0.3s;
      }
      .gallery-item-demo:hover .gallery-tags-demo {
        transform: translateY(0);
      }
      .tag-demo {
        padding: 0.25rem 0.75rem;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        font-size: 0.75rem;
        color: white;
      }
      @media (max-width: 768px) {
        .gallery-grid-demo {
          grid-template-columns: 1fr;
        }
        .gallery-item-demo.featured {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
    `;
    document.head.appendChild(style);
  });
  