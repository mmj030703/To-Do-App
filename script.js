//! This code is been modified by me after completion of project according to ChatGPT which tries to follow best javascript practices.

const taskInput = document.querySelector('#todo-input');
const addTaskBtn = document.querySelector('.addTask');
const taskList = document.querySelector('.todo-list');
const taskContentList = [];

const addTask = () => {
    const taskInputValue = taskInput.value.trim();
    //* Corner Case if user clicks without writing task in input.
    if (taskInputValue === '') {
        alert("Please add a task.");
    }
    //* Corner Case if user enters duplicate task.
    else if ((taskContentList.length !== 0) && (checkDuplicateTask(taskInputValue))) {
        alert("Task Already Added.");
        taskInput.value = '';
    }
    else {
        taskContentList.push(taskInputValue);
        const task = createTaskElement(taskInputValue);
        taskList.append(task);
        taskInput.value = '';
    }
}

//* checks if the current input value is already present in the list or not. 
const checkDuplicateTask = (taskInputValue) => {
    return taskContentList.includes(taskInputValue);
}

//* create task element
const createTaskElement = (taskInputValue) => {
    const task = document.createElement("div");
    task.classList.add('task');
    task.innerHTML = `
                    <div class="taskContent">${taskInputValue}</div>
                    <div class="task-buttons">
                      <button class="checkBtn"><i class="fa-sharp fa-solid fa-check"></i></button>
                      <button class="deleteBtn"><i class="fa fa-trash"></i></button>
                    </div>
                `;
    return task;
}

//* delete taskContent from the list as user deletes this task.
const deleteTextContent = (toDeleteContent) => {
    //
    const index = taskContentList.indexOf(toDeleteContent);
    taskContentList.splice(index, 1);
}

//* make changes to task container if users clicks check btn or delete btn.
const doneOrDeleteTask = (eventObj) => {
    const clickedItem = eventObj.target;
    const task = clickedItem.closest('.task');
    const taskName = task.firstElementChild;

    if (clickedItem.matches(".checkBtn") || clickedItem.matches(".fa-check")) {
        task.classList.toggle("checked");
        taskName.classList.toggle("line-through");
    }
    else if (clickedItem.matches(".deleteBtn") || clickedItem.matches(".fa-trash")) {
        task.classList.add("slide");
        setTimeout(() => {
            task.remove();
        }, 500);
        deleteTextContent(taskName.textContent);
    }
}

// oncliking or pressing enter add task button
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (eventObj) => {
    if (eventObj.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener('click', doneOrDeleteTask);