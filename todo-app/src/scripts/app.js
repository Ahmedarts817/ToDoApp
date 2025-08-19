// This file contains the JavaScript code for the Todo application.
// It handles the functionality such as adding, removing, and displaying todo items.

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const removeAllButton = document.getElementById('remove-all');

    // Load todos from localStorage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todoText => {
            createTodoItem(todoText);
        });
    }

    // Save todos to localStorage
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            todos.push(item.firstChild.textContent);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function createTodoItem(todoText) {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.textContent = todoText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
            saveTodos();
        });

        todoItem.appendChild(removeButton);
        todoList.appendChild(todoItem);
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            createTodoItem(todoText);
            todoInput.value = '';
            saveTodos();
        }
    }

    addButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    removeAllButton.addEventListener('click', () => {
        todoList.innerHTML = '';
        saveTodos();
    });

    // Initial load of todos
    loadTodos();
});