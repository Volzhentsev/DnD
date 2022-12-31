const boards = document.querySelector('.boards');

boards.querySelectorAll('.boards__item').forEach((board) => addTask(board));

function addTask(board) {
  const btn = board.querySelector('.add__btn');
  const addBtn = board.querySelector('.add__item-btn');
  const cancelBtn = board.querySelector('.cancel__item-btn');
  const textarea = board.querySelector('.textarea');
  const form = board.querySelector('.form');

  let value;

  // Добавить карточку
  btn.addEventListener('click', () => {
    form.classList.add('active');
    btn.classList.add('hidden');
    addBtn.classList.add('hidden');

    textarea.addEventListener('input', (e) => {
      value = e.target.value;
      if (value) {
        addBtn.classList.remove('hidden');
      } else {
        addBtn.classList.add('hidden');
      }
    });
  });

  // Закрыть карточку
  cancelBtn.addEventListener('click', clearForm);

  // Очистить данные
  function clearForm() {
    value = '';
    textarea.value = '';
    form.classList.remove('active');
    btn.classList.remove('hidden');
  }

  //

  // Добавляем карточку с текстом
  addBtn.addEventListener('click', addListItem);

  function addListItem() {
    const item = createListItem();
    board.querySelector('.list').append(item);
    dragNdrop();
    clearForm();
    operationsTask();
  }

  // Создаем карточку
  function createListItem() {
    const item = document.createElement('div');
    item.classList.add('list__item');
    item.draggable = true;
    item.innerHTML = `
        <span class="list__item-text">${value}</span>
            <span class="change">✎</span>
            <span class="save">✔</span>
            <span class="delete">✖</span>
        </div>`;

    return item;
  }

  // Операции с карточками
  function operationsTask() {
    const listItem = board.querySelectorAll('.list__item');
    listItem.forEach((item) => {
      // const text = item.querySelector('.list__item-text');
      item.querySelector('.delete').addEventListener('click', (e) => {
        e.target.parentElement.remove();
      });
      // item.querySelector('.change').addEventListener('click', (e) => {
      //   item.classList.add('change');
      //   text.setAttribute('contenteditable', true);
      // });
      // item.querySelector('.save').addEventListener('click', (e) => {
      //   item.classList.remove('change');
      //   text.removeAttribute('contenteditable');
      // });
    });
  }

  // Перетаскивание карточек

  let draggedItem = '';

  function dragNdrop() {
    const lists = document.querySelectorAll('.list');
    const listItems = document.querySelectorAll('.list__item');

    listItems.forEach((item) => {
      item.addEventListener('dragstart', () => {
        draggedItem = item;
        setTimeout(() => {
          item.classList.add('hidden');
        }, 0);
      });

      item.addEventListener('dragend', () => {
        draggedItem = '';
        setTimeout(() => {
          item.classList.remove('hidden');
        }, 0);
      });

      lists.forEach((list) => {
        list.addEventListener('dragover', (e) => e.preventDefault());

        list.addEventListener('dragenter', function (e) {
          e.preventDefault();
          this.style.backgroundColor = 'rgba(0,0,0, 0.3)';
        });

        list.addEventListener('dragleave', function (e) {
          e.preventDefault();
          this.style.backgroundColor = 'rgba(0,0,0, 0)';
        });

        list.addEventListener('drop', function (e) {
          e.preventDefault();
          this.style.backgroundColor = 'rgba(0,0,0,0)';
          this.append(draggedItem);
        });
      });
    });
  }
  operationsTask();
  dragNdrop();
}

window.addEventListener('beforeunload', () => {
  const data = {
    todo: [],
    inProgress: [],
    done: [],
  };
  const boardTodo = document.querySelector('.todo');
  const boardInprogress = document.querySelector('.inprogress');
  const boardDone = document.querySelector('.done');

  const cardsTodo = Array.from(boardTodo.querySelectorAll('.list__item-text'));
  if (cardsTodo) {
    cardsTodo.forEach((item) => {
      data.todo.push(item.textContent);
    });
  }

  const cardsInprogress = Array.from(boardInprogress.querySelectorAll('.list__item-text'));
  if (cardsInprogress) {
    cardsInprogress.forEach((item) => {
      data.inProgress.push(item.textContent);
    });
  }

  const cardsDone = Array.from(boardDone.querySelectorAll('.list__item-text'));
  if (cardsDone) {
    cardsDone.forEach((item) => {
      data.done.push(item.textContent);
    });
  }

  localStorage.setItem('data', JSON.stringify(data));
});

document.addEventListener('DOMContentLoaded', () => {
  const json = localStorage.getItem('data');
  const boardTodo = document.querySelector('.todo');
  const boardInprogress = document.querySelector('.inprogress');
  const boardDone = document.querySelector('.done');

  let formData;

  try {
    formData = JSON.parse(json);
  } catch (error) {
    console.log(error);
  }
  if (formData) {
    const val = formData.todo;
    val.forEach((el) => {
      const item = document.createElement('div');
      item.classList.add('list__item');
      item.draggable = true;
      item.innerHTML = `
                <span class="list__item-text">${el}</span>
                    <span class="change">✎</span>
                    <span class="save">✔</span>
                    <span class="delete">✖</span>
                </div>`;
      boardTodo.querySelector('.list').append(item);
    });

    const val2 = formData.inProgress;
    val2.forEach((el) => {
      const item = document.createElement('div');
      item.classList.add('list__item');
      item.draggable = true;
      item.innerHTML = `
            <span class="list__item-text">${el}</span>
            <span class="change">✎</span>
            <span class="save">✔</span>
            <span class="delete">✖</span>
            </div>`;
      boardInprogress.querySelector('.list').append(item);
    });

    const val3 = formData.inProgress;
    val3.forEach((el) => {
      const item = document.createElement('div');
      item.classList.add('list__item');
      item.draggable = true;
      item.innerHTML = `
            <span class="list__item-text">${el}</span>
            <span class="change">✎</span>
            <span class="save">✔</span>
            <span class="delete">✖</span>
            </div>`;
      boardDone.querySelector('.list').append(item);
    });
    boardTodo.querySelector('.delete').addEventListener('click', (e) => {
      e.target.parentElement.remove();
    });
    // dragNdrop();
    // clearForm();
    // operationsTask();
  }
});
// localStorage.removeItem(data);
