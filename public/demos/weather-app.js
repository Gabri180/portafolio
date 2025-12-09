document.addEventListener('DOMContentLoaded', () => {
    const demoContainer = document.getElementById('todo-app-demo');
    if (!demoContainer) return;
  
    demoContainer.innerHTML = `
      <div class="todo-app-demo">
        <h2>📝 Todo App</h2>
        <div class="input-group">
          <input type="text" id="demo-todo-input" placeholder="Nueva tarea..." />
          <button id="demo-add-btn" class="btn-demo">Agregar</button>
        </div>
        
        <div class="filters-demo">
          <button class="filter-btn active" data-filter="all">Todas</button>
          <button class="filter-btn" data-filter="active">Activas</button>
          <button class="filter-btn" data-filter="completed">Completadas</button>
        </div>
        
        <div id="demo-todo-list" class="todo-list-demo"></div>
        <div id="demo-stats" class="stats-demo"></div>
      </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .todo-app-demo {
        max-width: 600px;
        margin: 0 auto;
      }
      .todo-app-demo h2 {
        color: var(--text-light);
        text-align: center;
        margin-bottom: 2rem;
      }
      .input-group {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      .input-group input {
        flex: 1;
        padding: 0.875rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
        color: var(--text-light);
        font-size: 1rem;
      }
      .input-group input:focus {
        outline: none;
        border-color: #667eea;
      }
      .btn-demo {
        padding: 0.875rem 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s;
      }
      .btn-demo:hover {
        transform: translateY(-2px);
      }
      .filters-demo {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        justify-content: center;
      }
      .filter-btn {
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-light);
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s;
      }
      .filter-btn.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .todo-list-demo {
        margin-bottom: 1.5rem;
        min-height: 200px;
      }
      .todo-item-demo {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        transition: transform 0.3s;
        animation: slideIn 0.3s ease;
      }
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .todo-item-demo:hover {
        transform: translateX(5px);
      }
      .todo-item-demo.completed {
        opacity: 0.6;
      }
      .todo-item-demo.completed .todo-text-demo {
        text-decoration: line-through;
      }
      .todo-checkbox-demo {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      .todo-text-demo {
        flex: 1;
        color: var(--text-light);
      }
      .delete-btn-demo {
        padding: 0.5rem 1rem;
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background 0.3s;
      }
      .delete-btn-demo:hover {
        background: rgba(239, 68, 68, 0.4);
      }
      .stats-demo {
        text-align: center;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0.5rem;
        color: var(--text-gray);
        font-size: 0.875rem;
      }
      .empty-state {
        text-align: center;
        padding: 3rem;
        color: var(--text-gray);
      }
    `;
    document.head.appendChild(style);
  
    let todos = JSON.parse(localStorage.getItem('demo-todos')) || [];
    let currentFilter = 'all';
  
    const render = () => {
      const todoList = document.getElementById('demo-todo-list');
      const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
      });
  
      if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No hay tareas</div>';
      } else {
        todoList.innerHTML = filteredTodos.map(todo => `
          <div class="todo-item-demo ${todo.completed ? 'completed' : ''}">
            <input 
              type="checkbox" 
              class="todo-checkbox-demo" 
              ${todo.completed ? 'checked' : ''}
              data-id="${todo.id}"
            >
            <span class="todo-text-demo">${todo.text}</span>
            <button class="delete-btn-demo" data-id="${todo.id}">🗑️</button>
          </div>
        `).join('');
      }
  
      const total = todos.length;
      const completed = todos.filter(t => t.completed).length;
      document.getElementById('demo-stats').innerHTML = `
        Total: ${total} | Completadas: ${completed} | Pendientes: ${total - completed}
      `;
  
      document.querySelectorAll('.todo-checkbox-demo').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const id = parseInt(e.target.dataset.id);
          const todo = todos.find(t => t.id === id);
          if (todo) todo.completed = !todo.completed;
          save();
          render();
        });
      });
  
      document.querySelectorAll('.delete-btn-demo').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          todos = todos.filter(t => t.id !== id);
          save();
          render();
        });
      });
    };
  
    const save = () => {
      localStorage.setItem('demo-todos', JSON.stringify(todos));
    };
  
    document.getElementById('demo-add-btn').addEventListener('click', () => {
      const input = document.getElementById('demo-todo-input');
      const text = input.value.trim();
      if (text) {
        todos.push({ id: Date.now(), text, completed: false });
        input.value = '';
        save();
        render();
      }
    });
  
    document.getElementById('demo-todo-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('demo-add-btn').click();
      }
    });
  
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
      });
    });
  
    render();
  });
  