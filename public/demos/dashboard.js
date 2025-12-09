document.addEventListener('DOMContentLoaded', () => {
    const demoContainer = document.getElementById('dashboard-demo');
    if (!demoContainer) return;
  
    demoContainer.innerHTML = `
      <div class="dashboard-demo">
        <div class="dashboard-header-demo">
          <h2>📊 Analytics Dashboard</h2>
          <button id="theme-toggle-demo" class="theme-btn-demo">🌙</button>
        </div>
  
        <div class="stats-overview-demo">
          <div class="stat-card-demo blue">
            <div class="stat-icon-demo">👥</div>
            <div class="stat-info-demo">
              <p>Usuarios Totales</p>
              <h3>24,567</h3>
              <span class="positive">+12.5%</span>
            </div>
          </div>
          <div class="stat-card-demo green">
            <div class="stat-icon-demo">💰</div>
            <div class="stat-info-demo">
              <p>Ventas</p>
              <h3>$45,890</h3>
              <span class="positive">+8.2%</span>
            </div>
          </div>
          <div class="stat-card-demo purple">
            <div class="stat-icon-demo">📈</div>
            <div class="stat-info-demo">
              <p>Conversión</p>
              <h3>3.24%</h3>
              <span class="positive">+0.5%</span>
            </div>
          </div>
          <div class="stat-card-demo red">
            <div class="stat-icon-demo">📉</div>
            <div class="stat-info-demo">
              <p>Tasa de Rebote</p>
              <h3>42.3%</h3>
              <span class="negative">-2.1%</span>
            </div>
          </div>
        </div>
  
        <div class="charts-section-demo">
          <div class="chart-card-demo">
            <h3>Ingresos Mensuales</h3>
            <div class="bar-chart-demo">
              <div class="bar-container-demo">
                <div class="bar-demo" style="height: 70%">
                  <span class="bar-value-demo">45k</span>
                </div>
                <span class="bar-label-demo">Ene</span>
              </div>
              <div class="bar-container-demo">
                <div class="bar-demo" style="height: 85%">
                  <span class="bar-value-demo">52k</span>
                </div>
                <span class="bar-label-demo">Feb</span>
              </div>
              <div class="bar-container-demo">
                <div class="bar-demo" style="height: 75%">
                  <span class="bar-value-demo">48k</span>
                </div>
                <span class="bar-label-demo">Mar</span>
              </div>
              <div class="bar-container-demo">
                <div class="bar-demo" style="height: 95%">
                  <span class="bar-value-demo">61k</span>
                </div>
                <span class="bar-label-demo">Abr</span>
              </div>
              <div class="bar-container-demo">
                <div class="bar-demo" style="height: 90%">
                  <span class="bar-value-demo">58k</span>
                </div>
                <span class="bar-label-demo">May</span>
              </div>
              <div class="bar-container-demo">
                <div class="bar-demo" style="height: 100%">
                  <span class="bar-value-demo">67k</span>
                </div>
                <span class="bar-label-demo">Jun</span>
              </div>
            </div>
          </div>
  
          <div class="chart-card-demo">
            <h3>Actividad Reciente</h3>
            <div class="activity-list-demo">
              <div class="activity-item-demo">
                <div class="activity-avatar-demo">AG</div>
                <div class="activity-content-demo">
                  <p><strong>Ana García</strong> realizó una compra</p>
                  <span>Hace 5 min</span>
                </div>
                <div class="activity-amount-demo">$125.00</div>
              </div>
              <div class="activity-item-demo">
                <div class="activity-avatar-demo">CL</div>
                <div class="activity-content-demo">
                  <p><strong>Carlos López</strong> se registró</p>
                  <span>Hace 12 min</span>
                </div>
              </div>
              <div class="activity-item-demo">
                <div class="activity-avatar-demo">MR</div>
                <div class="activity-content-demo">
                  <p><strong>María Rodríguez</strong> dejó una reseña</p>
                  <span>Hace 25 min</span>
                </div>
                <div class="activity-amount-demo">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .dashboard-demo {
        width: 100%;
        --dashboard-bg: #0f172a;
        --dashboard-card: #1e293b;
        --dashboard-text: #f1f5f9;
        --dashboard-text-secondary: #94a3b8;
        transition: all 0.3s;
      }
      .dashboard-demo.light {
        --dashboard-bg: #f8fafc;
        --dashboard-card: #ffffff;
        --dashboard-text: #0f172a;
        --dashboard-text-secondary: #64748b;
      }
      .dashboard-header-demo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }
      .dashboard-header-demo h2 {
        color: var(--dashboard-text);
        margin: 0;
      }
      .theme-btn-demo {
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 0.5rem;
        font-size: 1.25rem;
        cursor: pointer;
        transition: background 0.3s;
      }
      .theme-btn-demo:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .stats-overview-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      .stat-card-demo {
        background: var(--dashboard-card);
        padding: 1.5rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: transform 0.3s;
      }
      .stat-card-demo:hover {
        transform: translateY(-5px);
      }
      .stat-icon-demo {
        font-size: 2.5rem;
      }
      .stat-info-demo p {
        color: var(--dashboard-text-secondary);
        font-size: 0.875rem;
        margin: 0 0 0.25rem 0;
      }
      .stat-info-demo h3 {
        color: var(--dashboard-text);
        margin: 0 0 0.25rem 0;
        font-size: 1.75rem;
      }
      .stat-info-demo span {
        font-size: 0.875rem;
        font-weight: 600;
      }
      .positive { color: #10b981; }
      .negative { color: #ef4444; }
      .charts-section-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      .chart-card-demo {
        background: var(--dashboard-card);
        padding: 1.5rem;
        border-radius: 1rem;
      }
      .chart-card-demo h3 {
        color: var(--dashboard-text);
        margin: 0 0 1.5rem 0;
      }
      .bar-chart-demo {
        display: flex;
        align-items: flex-end;
        gap: 1rem;
        height: 200px;
      }
      .bar-container-demo {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      }
      .bar-demo {
        width: 100%;
        background: linear-gradient(to top, #667eea, #764ba2);
        border-radius: 0.5rem 0.5rem 0 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 0.5rem;
        transition: all 0.3s;
      }
      .bar-demo:hover {
        opacity: 0.8;
      }
      .bar-value-demo {
        font-size: 0.75rem;
        font-weight: bold;
        color: white;
      }
      .bar-label-demo {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--dashboard-text-secondary);
      }
      .activity-list-demo {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .activity-item-demo {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--dashboard-bg);
        border-radius: 0.5rem;
        transition: transform 0.3s;
      }
      .activity-item-demo:hover {
        transform: translateX(5px);
      }
      .activity-avatar-demo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 0.875rem;
      }
      .activity-content-demo {
        flex: 1;
      }
      .activity-content-demo p {
        color: var(--dashboard-text);
        margin: 0 0 0.25rem 0;
        font-size: 0.875rem;
      }
      .activity-content-demo span {
        color: var(--dashboard-text-secondary);
        font-size: 0.75rem;
      }
      .activity-amount-demo {
        font-weight: bold;
        color: #10b981;
      }
      @media (max-width: 768px) {
        .stats-overview-demo,
        .charts-section-demo {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  
    let isLight = false;
    document.getElementById('theme-toggle-demo').addEventListener('click', () => {
      isLight = !isLight;
      demoContainer.querySelector('.dashboard-demo').classList.toggle('light', isLight);
      document.getElementById('theme-toggle-demo').textContent = isLight ? '☀️' : '🌙';
    });
  });
  