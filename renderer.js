const form = document.getElementById('todo-form');
const input = document.getElementById('new-todo');
const list = document.getElementById('todo-list');

let todos = [];

// Update: Each todo is now an object: { text: string, completed: boolean }
window.api.getTodos().then(data => {
  // Migrate old format if needed
  todos = data.map(todo => 
    typeof todo === 'string' ? { text: todo, completed: false } : todo
  );
  render();
});

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    
    // Checkbox for completion
    const checkbox = document.createElement('input');
    checkbox.className = 'checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onchange = () => {
      todos[index].completed = checkbox.checked;
      saveAndRender();
    };
    li.appendChild(checkbox);

    // Editable span for task text
    const span = document.createElement('span');
    span.textContent = todo.text;
    span.contentEditable = true;
    span.spellcheck = false;
    span.onblur = () => {
      const newText = span.textContent.trim();
      if (newText) {
        todos[index].text = newText;
        saveAndRender();
      } else {
        // Remove if empty
        todos.splice(index, 1);
        saveAndRender();
      }
    };
    li.appendChild(span);

    // Delete button
    const btn = document.createElement('button');
    btn.className = 'btn-delete';
    btn.textContent = '❌';
    btn.onclick = () => {
      todos.splice(index, 1);
      saveAndRender();
    };
    li.appendChild(btn);

    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    todos.push({ text: input.value.trim(), completed: false });
    input.value = '';
    saveAndRender();
  }
};

// Add clear completed button
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear Completed';
clearBtn.onclick = () => {
  todos = todos.filter(todo => !todo.completed);
  saveAndRender();
};
clearBtn.className = 'btn-clear';
document.body.appendChild(clearBtn);

function saveAndRender() {
  window.api.saveTodos(todos).then(render);
}

