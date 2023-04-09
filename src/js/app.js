import loadFromStorage from './loadFromStorage';
import {
  setItemRemoveHandlers,
  setAddTaskButtonHandlers,
  setCancelAddTaskButtonHandlers,
  setAddTaskSubmitHandlers,
} from './setHandlers';
import setDragAndDropHandlers from './setDragAndDropHandlers';

document.addEventListener('DOMContentLoaded', () => {
  const loadedState = loadFromStorage();
  if (loadedState) {
    const taskBoardElement = document.body.querySelector('.board-wrapper');
    taskBoardElement.innerHTML = loadedState;
    const taskItems = taskBoardElement.querySelectorAll('.items-task');
    taskItems.forEach((item) => {
      setItemRemoveHandlers(item);
      setDragAndDropHandlers(item);
    });
  }

  const board = document.body.querySelector('.board-wrapper');
  const panels = board.querySelectorAll('.panel');

  panels.forEach((panel) => {
    const addTasksContainer = panel.querySelector('.add-tasks-container');
    const panelItemsList = panel.querySelector('.items');
    const addTasksForm = addTasksContainer.querySelector('.add-tasks-control');
    const newTaskTitle = addTasksForm.querySelector('.add-tasks-input');

    const cancelTasksBtn = addTasksForm.querySelector('.add-tasks-cancel');
    const addTasksItem = panel.querySelector('.add-tasks-item');

    setAddTaskButtonHandlers(
      addTasksItem,
      addTasksForm,
      newTaskTitle,
    );

    setCancelAddTaskButtonHandlers(
      addTasksItem,
      addTasksForm,
      cancelTasksBtn,
    );

    setAddTaskSubmitHandlers(
      addTasksItem,
      addTasksForm,
      panelItemsList,
      newTaskTitle,
    );
  }); 
}); 
