
const savedTasks = localStorage.getItem("tasks");

const tasks = savedTasks ? JSON.parse(savedTasks) : [];

const addTaskButton = document.getElementById("addtask");
const inputField = document.getElementById("inputField");
const taskList = document.getElementById("taskList");


// Add task to array and LocalStorage
function addTask(taskname) {
    tasks.push(taskname);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display one task on the webpage
function displayTask(taskname) {

    const taskListItem = document.createElement("li");

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = taskname;

    taskListItem.appendChild(taskText);


    // DELETE BUTTON
    const clearButton = document.createElement("button");

    clearButton.textContent = "🗑️";

    taskListItem.appendChild(clearButton);


    clearButton.addEventListener("click", function () {

        taskList.removeChild(taskListItem);

        const index = tasks.indexOf(taskname);

        if (index !== -1) {
            tasks.splice(index, 1);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));

    });


    // COMPLETE BUTTON
    const completeButton = document.createElement("button");

    completeButton.textContent = "✔️";

    taskListItem.appendChild(completeButton);

    let isCompleted = false;

    completeButton.addEventListener("click", function () {

        if (isCompleted === false) {

            taskListItem.style.textDecoration = "line-through";
            taskListItem.style.color = "gray";

            isCompleted = true;

        } else {

            taskListItem.style.textDecoration = "none";
            taskListItem.style.color = "white";

            isCompleted = false;
        }

    });


    // EDIT BUTTON
    const editButton = document.createElement("button");

    editButton.textContent = "✏️";

    taskListItem.appendChild(editButton);


    editButton.addEventListener("click", function () {

        const newTaskName = prompt(
            "Enter the new task name:",
            taskText.textContent
        );

        if (newTaskName !== null && newTaskName.trim() !== "") {

            const index = tasks.indexOf(taskname);

            taskText.textContent = newTaskName;

            if (index !== -1) {
                tasks[index] = newTaskName;
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

    });


    // Put task inside <ul>
    taskList.appendChild(taskListItem);
}


// ADD BUTTON
addTaskButton.addEventListener("click", function () {

    const taskname = inputField.value;

    if (taskname.trim() === "") {
        alert("Please enter a task name.");
        return;
    }

    addTask(taskname);

    displayTask(taskname);

    inputField.value = "";

});


// DISPLAY SAVED TASKS WHEN PAGE LOADS
tasks.forEach(function(task) {
    displayTask(task);
});

