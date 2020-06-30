//получил инпут и кнопку
let addMessage = document.querySelector(".message"),
  addButton = document.querySelector(".add");
todo = document.querySelector(".todo__wrap"); // через  ul будем выводить добавленные задачи

//обработчик события - по нажатию кнопки добавить выполняются определенные действия
// addEventListener - методБ отслеживающий клик по кнопке

let todoList = []; //массив, чтобы хранить каждое дело

//ддобавил возможность, при которой добавленные задачи не исчезают при закрытии браузера или обновлении страницы
if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

addButton.addEventListener("click", function () {
  //каждое новое дело в объект, объект в массив
  let newTodo = {
    todo: addMessage.value,
    checked: false, //выолнено или нет, по умолчанию false
    important: false,
  };
  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList)); // этот метод вернет строку в json формате
});

function displayMessages() {
  // перебор массива todoList и каждый обхект выводим на страницу в виде тега li
  let displayMessage = "";
  todoList.forEach(function (item, i) {
    displayMessage += `
        <li>
          <input type='checkbox' id='item_${i}' ${
      item.checked ? "checked" : ""
    }>
          <label for='item_${i}'>${item.todo}</label>
        </li>
        `;
    todo.innerHTML = displayMessage;
  });
}
