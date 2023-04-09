import saveToStorage from './saveToStorage';

let draggedItem;
let currentItem;
let shiftX;
let shiftY;

function itemDrag(event) {
  if (!draggedItem) return;
  if (!currentItem) return;

  draggedItem.style.left = `${event.pageX - shiftX}px`;
  draggedItem.style.top = `${event.pageY - shiftY}px`;

  draggedItem.style.visibility = 'hidden';
  const closestTarget = document.elementFromPoint(event.clientX, event.clientY);
  draggedItem.style.visibility = '';

  if (!closestTarget) return;
  const targetDrop = closestTarget.closest('.items-task');
  const targetDropPanel = closestTarget.closest('.panel');

  if (!targetDropPanel) return;
  const targetDropPanelList = targetDropPanel.querySelector('.items');

  if (!targetDropPanelList.children.length) {
    targetDropPanelList.prepend(currentItem);
  }

  if (!targetDrop) return;

  if (targetDrop === currentItem) return;

  const { top } = targetDrop.getBoundingClientRect();
  if (event.pageY > window.scrollY + top + closestTarget.offsetHeight / 2) {
    closestTarget.after(currentItem);
  } else {
    closestTarget.before(currentItem);
  }
}

function itemDrop() {
  if (!draggedItem) return;
  if (!currentItem) return;

  draggedItem.classList.remove('dragged');
  document.body.removeChild(draggedItem);

  currentItem.classList.remove('droppable');
  currentItem.classList.remove('hidden');

  document.body.removeEventListener('mouseup', itemDrop);
  document.body.removeEventListener('mousemove', itemDrag);

  draggedItem = undefined;
  currentItem = undefined;
  shiftX = 0;
  shiftY = 0;

  saveToStorage();
}

export default function setDragAndDropHandlers(panelItemsListLastChild) {
  panelItemsListLastChild.addEventListener('mousedown', (event) => {
    event.preventDefault();

    currentItem = event.target;
    if (!currentItem.classList.contains('items-task')) return;

    draggedItem = event.target.cloneNode(true);
    draggedItem.classList.add('dragged');
    document.body.appendChild(draggedItem);
    currentItem.classList.add('droppable');
    const { left, top } = currentItem.getBoundingClientRect();
    shiftX = event.clientX - left;
    shiftY = event.clientY - top + 10; 

    document.body.addEventListener('mouseup', itemDrop);
    document.body.addEventListener('mousemove', itemDrag);
    itemDrag(event);
  });
}