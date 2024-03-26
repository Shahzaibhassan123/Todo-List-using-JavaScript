const taskinput = document.getElementById("TaskInput");
const addButton = document.getElementById("Addbutton");
const tasklist = document.getElementById("tasklist");
const filterall = document.getElementById("FilterAll");
const filterActive = document.getElementById("FilterActive");
const filterComplete = document.getElementById("FilterComplete");

let tasks = [];

addButton.addEventListener("click", addtask);




function addtask() {
    const tasktext = taskinput.value.trim();
    if (tasktext !== "") {
        tasks.push({ text: tasktext, completed: false });
        rendertasks();
        taskinput.value = "";
    }
}

function rendertasks() {
    tasklist.innerHTML = ""
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button class="deleteButton">Delete</button>`;
        const checkbox = listItem.querySelector("input");
        const deleteButton = listItem.querySelector(".deleteButton"); // Change this line
        checkbox.addEventListener("change", toggleTaskComplete.bind(null, index));
        deleteButton.addEventListener("click", () => deleteTask(index)); // Change this line
        tasklist.appendChild(listItem);
    })
}

function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    rendertasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    rendertasks();
}

function FilterTasks(FilterType) {
    let FilterTasks = tasks
    if (FilterType === "active") {
        FilterTasks = tasks.filter(task => !task.completed);
    } else if (FilterType === "completed") {
        FilterTasks = tasks.filter(task => task.completed);
    }
    renderFilteredTasks(FilterTasks);

}

function renderFilteredTasks(FilterTasks) {
    tasklist.innerHTML = "";
    FilterTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button class="deleteButton">Delete</button>
        `;
        const checkbox = listItem.querySelector("input");
        const deleteButton = listItem.querySelector(".deleteButton");
        checkbox.addEventListener("change", toggleTaskComplete.bind(null, index));
        deleteButton.addEventListener("click", deleteTask.bind(null, index));
        tasklist.appendChild(listItem);
    });
}
filterall.addEventListener("click", FilterTasks.bind(null, "all"));
filterActive.addEventListener("click", FilterTasks.bind(null, "active"));
filterComplete.addEventListener("click", FilterTasks.bind(null, "completed"));
rendertasks();