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
  
    // Icon checklist toggle
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
    deleteBtn.src = './assets/firefly_tonjok.png';
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

function clearAllTasks() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    localStorage.removeItem('tasks');
    document.getElementById('taskList').innerHTML = '';
    checkAllCompleted();
  }
}
    // Jam real-time
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString();
      }, 1000);
  
