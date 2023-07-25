//! This code is been modified by me after completion of project according to ChatGPT which tries to follow best javascript practices.

const taskInput = document.querySelector('#todo-input');
const addTaskBtn = document.querySelector('.addTask');
const taskList = document.querySelector('.todo-list');

const taskContentList = JSON.parse(localStorage.getItem('todos')) || [];

const addTask = (e) => {
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
        taskContentList.push({
            taskInputValue: taskInputValue,
            taskChecked: false              // keeps the status of whether the task is checked or not
        });

        //* Updating the localStorage with current taskContentList
        localStorage.setItem('todos', JSON.stringify(taskContentList));

        createTaskElement(taskInputValue);
        taskInput.value = '';
    }
}

//* Appends the task into the DOM
const appendTask = (task) => {
    taskList.append(task);
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
    appendTask(task);
    return task;
}

//* delete taskContent from the list as user deletes this task.
const deleteTextContent = (toDeleteContent) => {
    //
    let indexVal;

    //* Finding the index which is to be deleted.
    for (let index in taskContentList) {
        if (taskContentList[index].taskInputValue === toDeleteContent) {
            indexVal = index;
            break;
        }
    }

    taskContentList.splice(indexVal, 1);

    //* Updating the localStorage with the current taskContentList.
    localStorage.setItem('todos', JSON.stringify(taskContentList));
}

//* make changes to task container if users clicks check btn or delete btn.
const doneOrDeleteTask = (eventObj) => {
    const clickedItem = eventObj.target;
    const task = clickedItem.closest('.task');
    const taskName = task.firstElementChild;

    if (clickedItem.matches(".checkBtn") || clickedItem.matches(".fa-check")) {
        task.classList.toggle("checked");
        taskName.classList.toggle("line-through");

        //* Updating the taskChecked value of the task on which the user has clicked.
        taskContentList.forEach(taskObj => {
            if (taskObj.taskInputValue === taskName.textContent) {
                if (taskObj.taskChecked) {
                    taskObj.taskChecked = false;
                }
                else {
                    taskObj.taskChecked = true;
                }
                //* Updating the localStorage with the current taskContentList.
                localStorage.setItem('todos', JSON.stringify(taskContentList));
            }
        });
    }
    else if (clickedItem.matches(".deleteBtn") || clickedItem.matches(".fa-trash")) {
        task.classList.add("slide");
        setTimeout(() => {
            task.remove();
        }, 500);
        deleteTextContent(taskName.textContent);
    }
}

//* Function for appending the task at start when user reloads the Page.
const appendAtStart = (task) => {
    const taskElement = createTaskElement(task);
    const taskName = taskElement.firstElementChild;

    //* As page is reloaded then every task is appended as new so making them checked if they were before loading as per the localStorage.
    taskContentList.forEach(taskObj => {
        if (taskObj.taskInputValue === taskName.textContent) {
            if (taskObj.taskChecked) {
                taskElement.classList.toggle("checked");
                taskName.classList.toggle("line-through");
            }
        }
    });
}

//* At start calling this function for every object so that the user can see all the task which were present before reload.
taskContentList.forEach(taskObj => {
    appendAtStart(taskObj.taskInputValue);
});

// oncliking or pressing enter add task button
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (eventObj) => {
    if (eventObj.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener('click', doneOrDeleteTask);