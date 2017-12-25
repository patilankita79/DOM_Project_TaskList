// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Function to load all event listeners
function loadEventListeners() {

    // DOM load event
    // DOMContentLoaded is called right after the DOM is loaded
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add/submit the task event
    form.addEventListener('submit', addTask);

    // Remove the task event
    taskList.addEventListener('click', removeTask);

    // Clear the task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

// Function to get tasks from localStorage
function getTasks(e) {
    let tasks;

    // Check if there are any tasks present in localStorage
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // set the tasks to whatever is in localStorage 
        //(localStorage only stores strings, therefore we need to do parsing)
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    // loop through the tasks that are there
    tasks.forEach(function(task) {

        // Create the DOM element
        // Create li element
        const li = document.createElement('li');

        // Add a class 'collection-item' because in materialize css, li has 'collection-item' class
        li.className = 'collection-item';

        // Create a text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create a new link element
        const link = document.createElement('a');

        // Add class to link
        link.className = 'delete-item secondary-content';

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to li
        li.appendChild(link);

        // console.log(li);

        //Append li to ul (taskList is collection of ul)
        taskList.appendChild(li);

    })
}


// Function to add a task
function addTask(e) {
    // console.log(e);

    // Check if there is actually any value
    if(taskInput.value === '') {
        alert('Task field is empty! Please, add a task.');
    }

    // If there is a value, we want to add the task to the list

    // Create li element
    const li = document.createElement('li');

    // Add a class 'collection-item' because in materialize css, li has 'collection-item' class
    li.className = 'collection-item';

    // Create a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a new link element
    const link = document.createElement('a');

    // Add class to link
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);

    // console.log(li);

    //Append li to ul (taskList is collection of ul)
    taskList.appendChild(li);

    // Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = '';

    e.preventDefault();
}

// Function to store/persist the task in localStorage
function storeTaskInLocalStorage(task) {
    let tasks;

    // Check if there are any tasks present in localStorage
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // set the tasks to whatever is in localStorage 
        //(localStorage only stores strings, therefore we need to do parsing)
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    // Push the task to tasks[]
    tasks.push(task);

    // Set back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Function to remove the task
function removeTask(e) {

    console.log(e.target);

    /*Now, if we click on the x icon of the task, it takes the icon class wrapped in <i></i>, 
     but we want to select the parent of <i> tag which is <a> anchor tag, therefore we need
     to put condition to check the class of parent element of <i> tag
    */
    if(e.target.parentElement.classList.contains('delete-item')) {
        
        // Now, we want to remove the entire li, not the x icon or <a> tag
        // So if we are clicking on x icon, its parent is <a> tag and parent of <a> tag is <li> tag

        // Ask user for confirmation
        if(confirm('Are you sure, you want to delete this task?')) {
            // Remove from DOM
            e.target.parentElement.parentElement.remove();

            // Remove from localStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }

        
    }

    e.preventDefault();
}

// Function to remove the task from localStorage
function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);

    // Check localStorage
    let tasks;

    // Check if there are any tasks present in localStorage
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // set the tasks to whatever is in localStorage 
        //(localStorage only stores strings, therefore we need to do parsing)
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    

    tasks.forEach(function(task, index) {

        // Check if the content of taskItem equals the current task in the iteration
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    // Set the localStorage again
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Function to clear the tasks
function clearTasks() {

    // One way to clear all the tasks
    // taskList.innerHTML = '';

    // Other way to clear all the tasks (Faster way)
    while(taskList.firstChild) { // That means there is still something in the list

        // Remove the li of taskList
        taskList.removeChild(taskList.firstChild);
    }

    // Clear/Remove the tasks from localStorage
    clearTasksFromLocalStorage();

}

// Function to clear all the tasks from localStorage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Function to filter the tasks
function filterTasks(e) {
    // console.log(e);

    // Applying toLowerCase() so that no matter if the the letters of a word in capital case, they will be converted to lower case and match the tasks correctly
    const typedValueOfText = e.target.value.toLowerCase();
    // console.log(typedValueOfText); 

    // We have to select all the lis
    // querySelectorAll returns node-list therefore we can loop through
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;

            // If there is no match, it will equal to -1
            if(item.toLowerCase().indexOf(typedValueOfText) != -1) {
                
                // We want to display the text
                task.style.display = 'block';
            } else {

                // We want to hide the text, if there is match
                task.style.display = 'none';
            }
    });

}
