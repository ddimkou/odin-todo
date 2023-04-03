window.addEventListener("load", () => {
  // global
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  // check name in local storage
  const nameInput = document.querySelector("#name");
  const username = localStorage.getItem("username") || "";

  // save name to local storage
  nameInput.value = username;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  // todo item handle/create new todo object
  const newTodoForm = document.querySelector("#new-todo-form");
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    // save todo to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Reset the form
    e.target.reset();

    DisplayTodos();
  });

  DisplayTodos();
});

// display of todo items
const DisplayTodos = () => {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  // loop to create new elements
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    // done status
    input.type = "checkbox";
    input.checked = todo.done;

    // manipulate the span for the item;s category
    span.classList.add("bubble");
    if (todo.category == "long-term") {
      span.classList.add("long-term");
    } else {
      span.classList.add("short-term");
    }
    // content-> text
    content.classList.add("todo-content");
    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    // edit/delete option
    actions.classList.add("actions");
    edit.classList.add("edit");
    edit.innerHTML = "Edit";
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "Delete";

    // append childs to todo item
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }
    // update the todo status
    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });
    // edit button
    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });
    // delete button
    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
};
