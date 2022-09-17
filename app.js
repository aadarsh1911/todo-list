"use strict";
//Initializing DOM elements and creating todos array
const list = document.querySelector(".list");
const toDoInput = document.querySelector("#to-do-input");
const inputBtn = document.querySelector(".input-btn");
let todos = [];

//Function to update todos to DOM
const updateUI = (todos) => {
  list.innerHTML = "";
  todos.forEach((todo) => {
    list.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <div>
          <input type="checkbox" onchange={toggleTodo(${todo.id})}>
          <span class="title ${todo.checked}">${todo.title}</span>
        </div>
        <i class="fa-solid fa-trash" class="delete" onclick={deleteTodo(${todo.id})}></i>
      </div>
      `
    );
  });
};

//Function to add todos
const addTodo = (title) => {
  const todo = {
    id: Date.now(),
    title,
    checked: false,
  };
  todos.push(todo);
  return todos;
};

//Function to delete todo
const deleteTodo = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  updateUI(newTodos);
};

//Function to toggle todo for complete or incomplete
const toggleTodo = (id) => {
  const targetIndex = todos.findIndex((todo) => todo.id === id);
  todos[targetIndex].checked = !todos[targetIndex].checked;
  updateUI(todos);
};

//Adding event listener to button to get todo title
inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (toDoInput.value.length === 0) {
    alert("Please enter valid to-do");
    return;
  }
  updateUI(addTodo(toDoInput.value));
  toDoInput.value = "";
});
