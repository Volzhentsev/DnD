import saveToStorage from './saveToStorage';
import setDragAndDropHandlers from './setDragAndDropHandlers';

export function setItemRemoveHandlers(item) {
  if (!item || !item.classList.contains('items-task')) return;

  item.querySelector('.item-remove').addEventListener('click', (event) => {
    event.currentTarget.closest('.items-task').remove();
    saveToStorage();
  });

  item.addEventListener('mouseenter', (event) => {
    event.currentTarget.querySelector('.item-remove').classList.remove('hidden');
  });

  item.addEventListener('mouseleave', (event) => {
    event.currentTarget.querySelector('.item-remove').classList.add('hidden');
  });
}

export function setAddTaskButtonHandlers(addTasksItem, addTasksForm, newTaskTitle) {
  addTasksItem.addEventListener('click', () => {
    addTasksForm.classList.remove('hidden');
    addTasksItem.classList.add('hidden');
    newTaskTitle.focus();
  });
}

export function setCancelAddTaskButtonHandlers(addTasksItem, addTasksForm, cancelTasksBtn) {
  cancelTasksBtn.addEventListener('click', () => {
    addTasksForm.classList.add('hidden');
    addTasksItem.classList.remove('hidden');
  });
}

export function setAddTaskSubmitHandlers(
  addTasksItem,
  addTasksForm,
  panelItemsList,
  newTaskTitle,
) {
  addTasksForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputText = newTaskTitle.value.trim();
    if (inputText === '') return;
    panelItemsList.insertAdjacentHTML('beforeEnd', `<li class="items-task">
        ${inputText}
          <div class="item-remove hidden">
            &times;
          </div>            
      </li>`);
    addTasksForm.classList.add('hidden');
    addTasksItem.classList.remove('hidden');

    setItemRemoveHandlers(panelItemsList.lastChild);

    setDragAndDropHandlers(panelItemsList.lastChild);

    saveToStorage();
  });
}