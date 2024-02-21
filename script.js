// Function to load tasks from localStorage
function loadTasks() {
    var uncompletedList = document.getElementById('uncompletedList');
    var completedList = document.getElementById('completedList');

    // Load uncompleted tasks
    var uncompletedTasks = JSON.parse(localStorage.getItem('uncompletedTasks')) || [];
    uncompletedTasks.forEach(function (taskText) {
        addTaskItem(uncompletedList, taskText, false);
    });

    // Load completed tasks
    var completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    completedTasks.forEach(function (taskText) {
        addTaskItem(completedList, taskText, true);
    });
}

// Function to add a task item
function addTaskItem(list, taskText, isCompleted) {
    var taskItem = document.createElement('li');
    taskItem.className = isCompleted ? 'completedItem': 'taskItem';
    taskItem.innerHTML = `
    <span>${taskText}</span>
    ${isCompleted ? '<button onclick="deleteTask(this)">Delete</button>': '<button class="check" onclick="completeTask(this)"><i class="fa fa-check"></i></button><button class="trash" onclick="deleteTask(this)"><i class="fa fa-trash"></i></button>'}
    `;

    list.appendChild(taskItem);
}

// Function to add a new task
function addTask() {
    var taskInput = document.getElementById('taskInput');
    var uncompletedList = document.getElementById('uncompletedList');

    if (taskInput.value.trim() === "") {
        alert("Please enter a valid task!");
        return;
    }

    addTaskItem(uncompletedList, taskInput.value, false);

    // Save uncompleted tasks to localStorage
    saveTasks();

    taskInput.value = "";
}

// Function to complete a task
function completeTask(button) {
    var taskItem = button.parentNode;
    var completedList = document.getElementById('completedList');
    var uncompletedList = document.getElementById('uncompletedList');

    if (taskItem.classList.contains('completed')) {
        // Move back to uncompleted tasks
        taskItem.classList.remove('completed');
        uncompletedList.appendChild(taskItem);
        // Add complete button
        taskItem.innerHTML += '<button onclick="completeTask(this)">Complete</button><button onclick="deleteTask(this)">Delete</button>';
    } else {
        // Move to completed tasks
        taskItem.classList.add('completed');
        completedList.appendChild(taskItem);
        // Remove complete button
        taskItem.querySelector('button:first-child').remove();
    }

    // Save tasks to localStorage
    saveTasks();
}

// Function to delete a task
function deleteTask(button) {
    var taskItem = button.parentNode;
    taskItem.parentNode.removeChild(taskItem);

    // Save tasks to localStorage
    saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    var uncompletedList = document.getElementById('uncompletedList');
    var completedList = document.getElementById('completedList');

    // Save uncompleted tasks to localStorage
    var uncompletedTasks = Array.from(uncompletedList.children).map(function (taskItem) {
        return taskItem.querySelector('span').textContent;
    });
    localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks));

    // Save completed tasks to localStorage
    var completedTasks = Array.from(completedList.children).map(function (taskItem) {
        return taskItem.querySelector('span').textContent;
    });
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Load tasks when the page is ready
document.addEventListener('DOMContentLoaded', loadTasks);