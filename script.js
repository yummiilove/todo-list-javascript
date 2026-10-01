
// GET SAVED TASKS FROM LOCAL STORAGE

const savedTasks = localStorage.getItem("tasks");

let tasks = savedTasks ? JSON.parse(savedTasks) : [];


// CONVERT OLD STRING TASKS INTO OBJECTS

tasks = tasks.map(function(task, index) {

    // If old task is a string
    if (typeof task === "string") {

        return {
            id: Date.now() + index,
            name: task,
            completed: false
        };

    }

    // If task is already an object
    return task;

});


// SAVE THE UPDATED DATA

localStorage.setItem("tasks", JSON.stringify(tasks));


// GET HTML ELEMENTS

const addTaskButton = document.getElementById("addtask");
const inputField = document.getElementById("inputField");
const taskList = document.getElementById("taskList");


// GET FILTER BUTTONS

const allTasksButton = document.getElementById("allTasks");
const activeTasksButton = document.getElementById("activeTasks");
const completedTasksButton = document.getElementById("completedTasks");


// CURRENT FILTER

let currentFilter = "all";


// ADD TASK

function addTask(taskname) {

    const task = {
        id: Date.now(),
        name: taskname,
        completed: false
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return task;
}


// DISPLAY ONE TASK

function displayTask(task) {

    const taskListItem = document.createElement("li");


    // TASK TEXT

    const taskText = document.createElement("span");

    taskText.textContent = task.name;

    taskListItem.appendChild(taskText);


    // DELETE BUTTON

    const clearButton = document.createElement("button");

    clearButton.textContent = "🗑️";

    taskListItem.appendChild(clearButton);


    clearButton.addEventListener("click", function() {

        const index = tasks.findIndex(function(item) {

            return item.id === task.id;

        });


        if (index !== -1) {

            tasks.splice(index, 1);

        }


        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks();

    });


    // COMPLETE BUTTON

    const completeButton = document.createElement("button");

    completeButton.textContent = "✔️";

    taskListItem.appendChild(completeButton);


    // SHOW COMPLETED STYLE

    if (task.completed === true) {

        taskListItem.style.textDecoration = "line-through";

        taskListItem.style.color = "gray";

    }


    completeButton.addEventListener("click", function() {

        task.completed = !task.completed;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks();

    });


    // EDIT BUTTON

    const editButton = document.createElement("button");

    editButton.textContent = "✏️";

    taskListItem.appendChild(editButton);


    editButton.addEventListener("click", function() {

        const newTaskName = prompt(
            "Enter the new task name:",
            task.name
        );


        if (newTaskName !== null && newTaskName.trim() !== "") {

            task.name = newTaskName.trim();

            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();

        }

    });


    // ADD TASK TO PAGE

    taskList.appendChild(taskListItem);

}


// GET FILTERED TASKS

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(function(task) {

            return task.completed === false;

        });

    }


    if (currentFilter === "completed") {

        return tasks.filter(function(task) {

            return task.completed === true;

        });

    }


    return tasks;

}


// RENDER TASKS

function renderTasks() {

    // CLEAR CURRENT LIST

    taskList.innerHTML = "";


    // GET THE CORRECT TASKS

    const filteredTasks = getFilteredTasks();


    // DISPLAY THEM

    filteredTasks.forEach(function(task) {

        displayTask(task);

    });

}


// ADD TASK BUTTON

addTaskButton.addEventListener("click", function() {

    const taskname = inputField.value.trim();


    if (taskname === "") {

        alert("Please enter a task name.");

        return;

    }


    addTask(taskname);

    inputField.value = "";

    renderTasks();

});


// ALL FILTER

allTasksButton.addEventListener("click", function() {

    currentFilter = "all";

    renderTasks();

});


// ACTIVE FILTER

activeTasksButton.addEventListener("click", function() {

    currentFilter = "active";

    renderTasks();

});


// COMPLETED FILTER

completedTasksButton.addEventListener("click", function() {

    currentFilter = "completed";

    renderTasks();

});


// INITIAL DISPLAY

renderTasks();
