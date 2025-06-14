const form = document.getElementById('todo-form');
const input = document.getElementById('new-todo');
const list = document.getElementById('todo-list');

let todos = [];

window.api.getTodos().then(data => {
  todos = data;
  render();
});

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;
    const btn = document.createElement('button');
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
    todos.push(input.value.trim());
    input.value = '';
    saveAndRender();
  }
};

function saveAndRender() {
  window.api.saveTodos(todos).then(render);
}

