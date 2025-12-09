document.addEventListener('DOMContentLoaded', () => {
    const demoContainer = document.getElementById('ecommerce-demo');
    if (!demoContainer) return;
  
    const products = [
      { id: 1, name: 'MacBook Pro 16"', price: 2499, category: 'Laptops', rating: 4.8, image: '💻' },
      { id: 2, name: 'iPhone 15 Pro', price: 1199, category: 'Smartphones', rating: 4.9, image: '📱' },
      { id: 3, name: 'AirPods Pro', price: 249, category: 'Audio', rating: 4.7, image: '🎧' },
      { id: 4, name: 'iPad Air', price: 599, category: 'Tablets', rating: 4.6, image: '📲' },
      { id: 5, name: 'Apple Watch S9', price: 429, category: 'Wearables', rating: 4.8, image: '⌚' },
      { id: 6, name: 'Magic Keyboard', price: 149, category: 'Accessories', rating: 4.5, image: '⌨️' }
    ];
  
    let cart = [];
    let searchTerm = '';
    let selectedCategory = 'All';
  
    demoContainer.innerHTML = `
      <div class="ecommerce-demo">
        <div class="shop-header-demo">
          <h2>🛍️ Tech Store</h2>
          <button id="cart-btn-demo" class="cart-btn-demo">
            🛒 Carrito (<span id="cart-count">0</span>)
          </button>
        </div>
  
        <div class="shop-controls-demo">
          <input type="text" id="search-input" placeholder="Buscar productos..." />
          <select id="category-select">
            <option value="All">Todas las categorías</option>
            <option value="Laptops">Laptops</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Audio">Audio</option>
            <option value="Tablets">Tablets</option>
            <option value="Wearables">Wearables</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
  
        <div id="products-grid" class="products-grid-demo"></div>
  
        <div id="cart-modal" class="cart-modal-demo" style="display: none;">
          <div class="cart-modal-content">
            <div class="cart-modal-header">
              <h3>🛒 Tu Carrito</h3>
              <button id="close-cart" class="close-btn-demo">✕</button>
            </div>
            <div id="cart-items" class="cart-items-demo"></div>
            <div class="cart-footer-demo">
              <div class="cart-total-demo">
                <span>Total:</span>
                <strong id="cart-total">$0.00</strong>
              </div>
              <button class="checkout-btn-demo">Proceder al Pago</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .ecommerce-demo {
        width: 100%;
      }
      .shop-header-demo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }
      .shop-header-demo h2 {
        color: var(--text-light);
        margin: 0;
      }
      .cart-btn-demo {
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s;
      }
      .cart-btn-demo:hover {
        transform: translateY(-2px);
      }
      .shop-controls-demo {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .shop-controls-demo input,
      .shop-controls-demo select {
        flex: 1;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
        color: var(--text-light);
        font-size: 1rem;
      }
      .shop-controls-demo input:focus,
      .shop-controls-demo select:focus {
        outline: none;
        border-color: #667eea;
      }
      .products-grid-demo {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      .product-card-demo {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 1rem;
        padding: 1.5rem;
        text-align: center;
        transition: transform 0.3s;
      }
      .product-card-demo:hover {
        transform: translateY(-5px);
      }
      .product-image-demo {
        font-size: 4rem;
        margin-bottom: 1rem;
      }
      .product-category-demo {
        font-size: 0.75rem;
        color: var(--text-gray);
        margin-bottom: 0.5rem;
      }
      .product-name-demo {
        color: var(--text-light);
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }
      .product-rating-demo {
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }
      .product-footer-demo {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .product-price-demo {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--text-light);
      }
      .add-to-cart-btn-demo {
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s;
      }
      .add-to-cart-btn-demo:hover {
        transform: scale(1.05);
      }
      .add-to-cart-btn-demo.added {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      }
      .cart-modal-demo {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .cart-modal-content {
        background: var(--bg-card);
        border-radius: 1rem;
        width: 90%;
        max-width: 500px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
      }
      .cart-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .cart-modal-header h3 {
        color: var(--text-light);
        margin: 0;
      }
      .close-btn-demo {
        background: none;
        border: none;
        color: var(--text-light);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
      }
      .cart-items-demo {
        flex: 1;
        overflow-y: auto;
        padding: 1.5rem;
      }
      .cart-item-demo {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
      }
      .cart-item-image-demo {
        font-size: 2rem;
      }
      .cart-item-info-demo {
        flex: 1;
      }
      .cart-item-info-demo h4 {
        color: var(--text-light);
        margin: 0 0 0.25rem 0;
        font-size: 0.875rem;
      }
      .cart-item-info-demo p {
        color: var(--text-gray);
        margin: 0;
        font-size: 0.875rem;
      }
      .cart-item-quantity-demo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .cart-item-quantity-demo button {
        width: 25px;
        height: 25px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 0.25rem;
        color: var(--text-light);
        cursor: pointer;
      }
      .cart-footer-demo {
        padding: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      .cart-total-demo {
        display: flex;
        justify-content: space-between;
        font-size: 1.25rem;
        color: var(--text-light);
        margin-bottom: 1rem;
      }
      .checkout-btn-demo {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s;
      }
      .checkout-btn-demo:hover {
        transform: translateY(-2px);
      }
      .empty-cart-demo {
        text-align: center;
        padding: 3rem;
        color: var(--text-gray);
      }
    `;
    document.head.appendChild(style);
  
    const renderProducts = () => {
      const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  
      const grid = document.getElementById('products-grid');
      grid.innerHTML = filtered.map(p => `
        <div class="product-card-demo">
          <div class="product-image-demo">${p.image}</div>
          <div class="product-category-demo">${p.category}</div>
          <h3 class="product-name-demo">${p.name}</h3>
          <div class="product-rating-demo">${'⭐'.repeat(Math.floor(p.rating))} ${p.rating}</div>
          <div class="product-footer-demo">
            <span class="product-price-demo">$${p.price}</span>
            <button class="add-to-cart-btn-demo" data-id="${p.id}">+ Agregar</button>
          </div>
        </div>
      `).join('');
  
      document.querySelectorAll('.add-to-cart-btn-demo').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          addToCart(id);
          e.target.textContent = '✓ Agregado';
          e.target.classList.add('added');
          setTimeout(() => {
            e.target.textContent = '+ Agregar';
            e.target.classList.remove('added');
          }, 1000);
        });
      });
    };
  
    const addToCart = (productId) => {
      const product = products.find(p => p.id === productId);
      const existingItem = cart.find(item => item.id === productId);
  
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
  
      updateCart();
    };
  
    const updateCart = () => {
      document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      
      const cartItems = document.getElementById('cart-items');
      if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart-demo">Tu carrito está vacío</div>';
      } else {
        cartItems.innerHTML = cart.map(item => `
          <div class="cart-item-demo">
            <div class="cart-item-image-demo">${item.image}</div>
            <div class="cart-item-info-demo">
              <h4>${item.name}</h4>
              <p>$${item.price}</p>
            </div>
            <div class="cart-item-quantity-demo">
              <button data-id="${item.id}" data-action="decrease">-</button>
              <span>${item.quantity}</span>
              <button data-id="${item.id}" data-action="increase">+</button>
            </div>
          </div>
        `).join('');
  
        document.querySelectorAll('.cart-item-quantity-demo button').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            const item = cart.find(i => i.id === id);
            
            if (action === 'increase') {
              item.quantity++;
            } else {
              item.quantity--;
              if (item.quantity === 0) {
                cart = cart.filter(i => i.id !== id);
              }
            }
            updateCart();
          });
        });
      }
  
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    };
  
    document.getElementById('search-input').addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderProducts();
    });
  
    document.getElementById('category-select').addEventListener('change', (e) => {
      selectedCategory = e.target.value;
      renderProducts();
    });
  
    document.getElementById('cart-btn-demo').addEventListener('click', () => {
      document.getElementById('cart-modal').style.display = 'flex';
    });
  
    document.getElementById('close-cart').addEventListener('click', () => {
      document.getElementById('cart-modal').style.display = 'none';
    });
  
    document.getElementById('cart-modal').addEventListener('click', (e) => {
      if (e.target.id === 'cart-modal') {
        document.getElementById('cart-modal').style.display = 'none';
      }
    });
  
    renderProducts();
    updateCart();
  });
  