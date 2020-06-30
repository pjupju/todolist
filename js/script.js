//получил инпут и кнопку
let addMessage = document.querySelector(".message"),
  addButton = document.querySelector(".add");
todo = document.querySelector(".todo__wrap"); // через  ul будем выводить добавленные задачи

//обработчик события - по нажатию кнопки добавить выполняются определенные действия
// addEventListener - методБ отслеживающий клик по кнопке

let todoList = []; //массив, чтобы хранить каждое дело

//добавил возможность, при которой добавленные задачи не исчезают при закрытии браузера или обновлении страницы
if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

addButton.addEventListener("click", function () {
  if(!addMessage.value) return;  // убрал возможность добавлять пустую строку
  //каждое новое дело в объект, объект в массив
  let newTodo = {
    todo: addMessage.value,
    checked: false, //выолнено или нет, по умолчанию false
    important: false,
  };
  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList)); // этот метод вернет строку в json формате
  addMessage.value = '';
});

function displayMessages() {
  // перебор массива todoList и каждый обхект выводим на страницу в виде тега li
  let displayMessage = "";
  if(todoList.length === 0) {  //здесь удаляет и последнюю (единственную) задачу, оставшуются в todo
    todo.innerHTML = ''; // нажимаем кнопку - очищается инпут
  }
  todoList.forEach(function (item, i) {
    displayMessage += `
        <li>
          <input type='checkbox' id='item_${i}' ${item.checked ? "checked" : ''} >
          <label for='item_${i}' class="${item.important ? 'important' : ''}" > ${item.todo}</label>
        </li>
        `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener('change', function (event) {

  //детально расписано
  //let idInput = event.target.getAttribute('id');
  //let forLabel = todo.querySelector('[for='+ idInput +']');
  //let valueLabel = forLabel.innerHTML;

  //объединил все под одну переменную:

  let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
  console.log('valueLabel: ', valueLabel);

  //поиск значения среди значений наших объектов внутри todolist 
  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(todoList)); // этот метод вернет строку в json формате
    }
  });
});

//отлючил клик правой кнопкой мыши по задаче (стандартного меню при нажатии правой кнопкной мыши в браузере)
//addEventListener('contextmenu') - обозначаю событие
todo.addEventListener('contextmenu', function (event){
  event.preventDefault(); //метод, который отменяет стандартное поведение браузера
  todoList.forEach(function (item, i) {
    if (item.todo === event.target.innerHTML) {
      if(event.ctrlKey || event.metaKey){ //удаление задач с помощью зажатой правой кнопки мыши + кнопки для винды и мака
        todoList.splice(i, 1);  // сколько удалить элементов из массива
      } else {
        item.important = !item.important;
      }
      item.important = !item.important;
      displayMessages();
      localStorage.setItem("todo", JSON.stringify(todoList)); // этот метод вернет строку в json формате
    }
  });

});

