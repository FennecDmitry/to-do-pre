let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const template = document.getElementById("to-do__item-template");

// Загрузка задач из localStorage или начального массива
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return items;
}

// Создание элемента задачи
function createItem(item) {
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  // Обработчик удаления задачи
  deleteButton.addEventListener("click", () => {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  // Обработчик копирования задачи
  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  // Обработчик редактирования задачи (дополнительное задание)
  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  // Обработчик завершения редактирования
  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  // Обработчик нажатия Enter при редактировании
  textElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      textElement.blur();
    }
  });

  return clone;
}

// Получение списка задач из DOM
function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  
  itemsNamesElements.forEach(element => {
    tasks.push(element.textContent);
  });
  
  return tasks;
}

// Сохранение задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Инициализация приложения
function init() {
  // Загружаем задачи
  items = loadTasks();
  
  // Очищаем список перед добавлением
  listElement.innerHTML = "";
  
  // Добавляем задачи на страницу
  items.forEach(item => {
    const itemElement = createItem(item);
    listElement.append(itemElement);
  });
}

// Обработчик отправки формы
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const taskText = inputElement.value.trim();
  
  if (taskText) {
    const itemElement = createItem(taskText);
    listElement.prepend(itemElement);
    
    // Обновляем и сохраняем задачи
    items = getTasksFromDOM();
    saveTasks(items);
    
    // Очищаем поле ввода
    inputElement.value = "";
  }
});

// Инициализируем приложение при загрузке страницы
document.addEventListener("DOMContentLoaded", init);