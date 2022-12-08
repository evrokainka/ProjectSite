// Обработка появления панели добавления элементов
// Для начала обработка скрытия панели
const showAddMenuHandler = function (evt) {
  // Проверяем куда конкретно мы нажали (ищем родителя, а конкретно раздел сайта)
  const parentElement = evt.target.parentNode;
  // Забираем все элементы с классами choose-elem
  const addMenuElement = parentElement.querySelector('.choose-elem');
  // Добавляем класс hidden
  addMenuElement.classList.toggle('hidden');
};  
// Тпереь обработка нажатия и отображения панели
const addButtonElements = document.querySelectorAll('.add-btn');
addButtonElements.forEach(function (item) {
    // Если мы "нажали" на элемент то открывается меню добавления, после чего (после повторного нажатия) она скрывается
    return item.addEventListener('click', showAddMenuHandler);
  });

// Обработка переключения дизайнов сайта (лендинг, блог или магазин)
const changeLayoutHandler = function (evt) {
  // Ищем родителя (тот дизайн который мы хотим создать)
  const newLayout = evt.target.value;
  // Ищем все элементы дизайна
  const layoutElement = document.querySelector('.layout');
  // Снимаем все дизайны (ранее стоявшие)
  layoutElement.classList.remove('layout--landing');
  layoutElement.classList.remove('layout--blog');
  layoutElement.classList.remove('layout--shop');
  // Задаем необходимый нам дизайн
  layoutElement.classList.add('layout--' + newLayout);
  };
// Через классы "переключаем" отображение выбранного дизайна сайта
document.querySelector('.grid-select').addEventListener('change', changeLayoutHandler);

// Обработчик удаления элемента
  const buttonDeleteHandler = function (evt) {
  // Найти родителя кнопки (откуда удаляем элемент)
  const element = evt.target.parentNode;
  // Определяем wrapper элемент (куда добавили элемент)
  const wrapper = element.parentNode;
  // Также определяем часть сайта, где находится элемент
  const block = wrapper.parentNode;
  // Удаление элемента
  element.remove();
  // Проверяем количество элементов в "контейнере" wrapper
  const wrapperItems = wrapper.querySelectorAll('.element');
  // Если в wrapper нет элементов  
  // Добавляем класс empty его родителю
  if (wrapperItems.length === 0) {
    if (block.classList.contains('header')) {
      block.classList.add('header--empty');
    } 
    if (block.classList.contains('content')) {
      block.classList.add('content--empty');
    }
    if (block.classList.contains('footer')) {
      block.classList.add('footer--empty');
    }
  }
};

// Обработка изменения элемента 
const editContentHandler = function (evt) {
  // Ищем нажатый элемент
  const editedElement = evt.target;
  // Сохраняем текущее содержимое текста или адрес до картинки
  let currentValue;
  // Если нажатый элемент был картинкой то сохраняем данные из атрибута src
  if (editedElement.tagName === 'IMG') {
    currentValue = editedElement.src;
  } else {
  // Иначе из textContent
    currentValue = editedElement.textContent;
  }
  // Выводим окно промт для изменения
  const newValue = window.prompt('Вы хотите поменять значение?', currentValue);
  // Заполняем элемент новыми данными если они не пустые
  if (newValue) {
    // Если это картинка то заменяем элемент src
    if (editedElement.tagName === 'IMG') {
      editedElement.src = newValue;
    } else {
      editedElement.textContent = newValue;
    }
  }
};

// Непосредственное добавление элемента на страницу по клику на необходимый элемент
const addElementHandler = function (evt) {   
  // Ищем нажатую кнопку
  const clickedBtn = evt.target; 
  // Ищем ее родителя (панель элементов)
  const addMenuElement = clickedBtn.parentNode;  
  // Скрываем панель добавления  элементов
  addMenuElement.classList.add('hidden'); 
  // Определяем тип блока для подстановки
  const blockType = clickedBtn.dataset.type;
  // Собираем информацию о контейнере и класс куда добавляем элемент
  const blockContainer = clickedBtn.dataset.container;
  // Ищем и копируем шаблон
  const templateElement = document.querySelector('#' + blockType + '-template').content.cloneNode(true);
  const blockElement = templateElement.querySelector('.element');
  // Вставляем элемент в контейнер
  const containerWrapperElement = document.querySelector('.' + blockContainer + '__elements-wrapper');
  containerWrapperElement.append(blockElement);
  // Снимаем класс empty с родителя
  if (blockContainer.includes('content')) {
    containerWrapperElement.parentElement.classList.remove('content--empty');
  } else {
    containerWrapperElement.parentElement.classList.remove(blockContainer + '--empty');
  }
  // Если удаляем, то удаляем
  blockElement.querySelector('.delete-btn').addEventListener('click', buttonDeleteHandler);
  // Если изменяем, то изменяем
  blockElement.querySelector('.template-content').addEventListener('dblclick', editContentHandler);
};

// Обработка добавления элементов
const chooseButtonElements = document.querySelectorAll('.choose-elem__btn');
chooseButtonElements.forEach(function (item) {
  return item.addEventListener('click', addElementHandler);
});