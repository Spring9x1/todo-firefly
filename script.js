document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (task === '') {
    alert('Please enter a task.');
    return;
  }

  const taskList = document.getElementById('taskList');
  const li = createTaskElement(task, false);
  taskList.appendChild(li);

  saveTaskToStorage(task, false);
  input.value = '';
  checkAllCompleted();

 sortListItems();
}

function sortListItems() {
  const list = document.getElementById('taskList');
  const items = Array.from(list.children);

  items.sort((a, b) => a.textContent.localeCompare(b.textContent));

  items.forEach(item => list.appendChild(item));
}

function createTaskElement(taskText, isCompleted) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.textContent = taskText;
  if (isCompleted) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";
  }

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  // Icon checklist toggle isComplete
  const checkBtn = document.createElement('img');
  checkBtn.src = isCompleted ? './assets/firefly_approve.png' : './assets/firefly_think.jpeg';
  checkBtn.className = 'icon-btn';
  checkBtn.title = 'Mark as complete';
  checkBtn.onclick = () => {
    isCompleted = !isCompleted;
    span.style.textDecoration = isCompleted ? "line-through" : "none";
    span.style.opacity = isCompleted ? "0.6" : "1";
    checkBtn.src = isCompleted ? './assets/firefly_approve.png' : './assets/firefly_think.jpeg';
    updateTaskStatus(taskText, isCompleted);
    checkAllCompleted();
  };
  actions.appendChild(checkBtn);

  // Icon delete
  const deleteBtn = document.createElement('img');
  deleteBtn.src = './assets/firefly_duar.jpg';
  deleteBtn.className = 'icon-btn';
  deleteBtn.title = 'Delete task';
  deleteBtn.onclick = () => {
    li.remove();
    deleteTaskFromStorage(taskText);
    checkAllCompleted();
  };
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  return li;
}

function saveTaskToStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, done: isCompleted });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updated = tasks.map(task => {
    if (task.text === taskText) task.done = isCompleted;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(updated));
}

function loadTasks() {

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  tasks.forEach(task => {
    const li = createTaskElement(task.text, task.done);
    taskList.appendChild(li);
  });

  checkAllCompleted();
}

function checkAllCompleted() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const allDone = tasks.length > 0 && tasks.every(task => task.done === true);
  const popup = document.getElementById('firefly-popup');

  popup.style.display = allDone ? 'block' : 'none';
}



document.getElementById('checkAll').addEventListener('click', () => {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  Array.from(taskList.children).forEach(li => {
    const span = li.querySelector('span');
    const text = span.textContent;
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";

    const checkBtn = li.querySelector('.icon-btn');
    if (checkBtn) checkBtn.src = './assets/firefly_approve.png';

    tasks.push({ text, done: true });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  checkAllCompleted();
});

document.getElementById('uncheckAll').addEventListener('click', () => {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  Array.from(taskList.children).forEach(li => {
    const span = li.querySelector('span');
    const text = span.textContent;
    span.style.textDecoration = "none";
    span.style.opacity = "1";

    const checkBtn = li.querySelector('.icon-btn');
    if (checkBtn) checkBtn.src = './assets/firefly_think.jpeg';

    tasks.push({ text, done: false });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  checkAllCompleted();
});

document.addEventListener("DOMContentLoaded", function () {
  const popupImage = document.getElementById("popupImage");
  const checkBtn = document.getElementById("checkAll");
  const uncheckBtn = document.getElementById("uncheckAll");
  const clearBtn = document.getElementById("clearAll");
  const confirmPopup = document.getElementById("confirmPopup");
  const confirmPopupNoData = document.getElementById("confirmPopupNoData");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");
  const confirmOk = document.getElementById("confirmOk");

  checkBtn.addEventListener("mouseenter", () => {
    popupImage.src = "./assets/firefly_lick.gif";
    popupImage.style.display = "block";
  });
  checkBtn.addEventListener("mouseleave", () => {
    popupImage.style.display = "none";
  });

  uncheckBtn.addEventListener("mouseenter", () => {
    popupImage.src = "./assets/firefly_no.png";
    popupImage.style.display = "block";
  });
  uncheckBtn.addEventListener("mouseleave", () => {
    popupImage.style.display = "none";
  });

  clearBtn.addEventListener("mouseenter", () => {
    popupImage.src = "./assets/firefly_duar.jpg"; // Bisa diganti sesuai file kamu
    popupImage.style.display = "block";
  });
  clearBtn.addEventListener("mouseleave", () => {
    popupImage.style.display = "none";
  });

  clearBtn.addEventListener("click", () => {
    const taskListItems = document.querySelectorAll("#taskList li");
    if(taskListItems.length === 0 ){
      confirmPopupNoData.style.display = "flex";
      console.log("no data");
    } 
    if(taskListItems.length > 0 ) {
      console.log("ini terclick");
      confirmPopup.style.display = "flex";  
    }
  });

  confirmYes.addEventListener("click", () => {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
    confirmPopup.style.display = "none";
    checkAllCompleted();
  });

  confirmNo.addEventListener("click", () => {
    confirmPopup.style.display = "none";
  });

  confirmOk.addEventListener("click", () => {
    confirmPopupNoData.style.display = "none";
  });
});


// Jam real-time
setInterval(() => {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
}, 1000);

