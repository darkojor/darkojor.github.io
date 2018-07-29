
function searchKeyPress(e)
{
    e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('addT').click();
        return false;
    }
    return true;
}

if (!localStorage.getItem("task")) {
    taskNiz = [];
} else {
    taskNiz = localStorage.getItem("task").split(",");
}

function taskAdd() {
    let todo = document.addingTasks.newTaskText;
    if (todo.value !== "") {
        taskNiz.push(todo.value);
        localStorage.setItem("task", taskNiz);
        writeTasks();
        todo.value = "";
    } else {
        alert("Please, write a task.");
    }
}

function writeTasks() {
    document.getElementById("incompleteTasks").innerHTML = "";

    if (typeof(Storage) !== "undefined") {
        for (let i = 0; i < taskNiz.length; i++) {
            let incompleteT = document.createElement("div");
            incompleteT.className = "oneTask";
            let taskSpan = document.createElement("span");
            let taskSadr = document.createTextNode(taskNiz[i]);
            taskSpan.appendChild(taskSadr);
            incompleteT.appendChild(taskSpan);
            let taskClose = document.createElement("clearOneTask");
            taskClose.className = "fas fa-times";
            taskClose.title = "Delete this task";
            taskClose.setAttribute("onclick", "deleteOneTask(event)");
            incompleteT.appendChild(taskClose);
            document.getElementById("incompleteTasks").appendChild(incompleteT);
            document.addingTasks.newTaskText.value = "";
        }
    } else {
        alert("Your browser does not support Web Storage.");
    }
}

function filterTasks() {
    let filterText = document.listOfTasks.filterTasksText.value.toUpperCase();
    let tasksAll = document.getElementById("incompleteTasks").getElementsByTagName("div");
    for (let i = 0; i < tasksAll.length; i++) {
        let info = tasksAll[i].getElementsByTagName("span")[0];
        if (info.innerHTML.toUpperCase().indexOf(filterText) > -1) {
            tasksAll[i].style.display = "flex";
        } else {
            tasksAll[i].style.display = "none";
        }        
    }
}

function deleteAll() {
    let incompleteT = document.getElementById("incompleteTasks");

    if (incompleteT.innerHTML !== "" && confirm("Do you want to delete all of the tasks?")) {
        localStorage.removeItem("task");
        taskNiz = [];
        incompleteT.innerHTML = "";
        document.listOfTasks.filterTasksText.value = "";
    }
}

function deleteOneTask(event) {
    if (confirm("Do you want to delete this task?")) {
        let taskParent = event.target.parentElement;

        for (let i = 0; i < taskNiz.length; i++) {
            if (taskParent.getElementsByTagName("span")[0].innerHTML === taskNiz[i]) {
                taskNiz.splice(i, 1);
                localStorage.setItem("task", taskNiz);
            }
        }
        taskParent.remove();
        writeTasks();
    }
}

window.onload = writeTasks;