const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');

// Fetch all todos and display them
function fetchTodos() {
  fetch('https://altcampus.xyz/todo-api/')
    .then((response) => response.json())
    .then((todos) => {
      todoList.innerHTML = '';
      todos.forEach((todo) => {
        displayTodo(todo);
      });
    })
    .catch((error) => {
      console.error('Error fetching todos:', error);
    });
}

// Display a todo in the list
function displayTodo(todo) {
  const todoItem = document.createElement('div');
  todoItem.innerHTML = `
    <input type="checkbox" ${
      todo.completed ? 'checked' : ''
    } onchange="toggleTodo(${todo.id}, this)">
    <span ${todo.completed ? 'style="text-decoration: line-through;"' : ''}>${
    todo.title
  }</span>
    <button onclick="deleteTodo(${todo.id})">❌</button>
  `;
  todoList.appendChild(todoItem);
}

// Add a new todo
newTodoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && newTodoInput.value.trim() !== '') {
    const newTodo = {
      title: newTodoInput.value.trim(),
      completed: false,
    };
    fetch('https://altcampus.xyz/todo-api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((todo) => {
        displayTodo(todo);
        newTodoInput.value = '';
      })
      .catch((error) => {
        console.error('Error adding new todo:', error);
      });
  }
});

// Toggle todo completion status
function toggleTodo(todoId, checkbox) {
  const completed = checkbox.checked;
  fetch(`https://altcampus.xyz/todo-api/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  })
    .then(() => {
      const span = checkbox.nextElementSibling;
      if (completed) {
        span.style.textDecoration = 'line-through';
      } else {
        span.style.textDecoration = 'none';
      }
    })
    .catch((error) => {
      console.error('Error toggling todo completion:', error);
    });
}

// Delete todo
function deleteTodo(todoId) {
  fetch(`https://altcampus.xyz/todo-api/${todoId}`, {
    method: 'DELETE',
  })
    .then(() => {
      const todoItem = document.querySelector(`[data-id="${todoId}"]`);
      todoItem.remove();
    })
    .catch((error) => {
      console.error('Error deleting todo:', error);
    });
}

// Initial fetch and display of todos
fetchTodos();
