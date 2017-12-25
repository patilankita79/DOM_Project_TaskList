# DOM Project - TaskList
The purpose of this project is to explore the DOM, localStorage, event delegation in JavaScript(ES6)

<hr>

<table>
        <tr>
            <td>
                   <strong> DOM Project</strong> 
            </td>
            <td>
                    Task List
            </td>
        </tr>
        <tr>
                <td>
                  <strong>Objective</strong>
                  </td>
                    <td>
                            To explore document object model, localStorage, event delegation in JavaScript
                    </td>
        </tr>
        <tr>
                <td> <strong>Description</strong>   
                </td>
                <td>Add a task, list the tasks, filter through them as we type, delete them,  Also persist the tasks to localStorage so that they don't disappear when we reload the page, levae the page and come back.
     </td>
            </tr>
    </table>
<br>
<hr>

### Approach

1. UI (used Materialize CSS) and add task items (restricted to DOM)
2. Delete and filter the tasks (restricted to DOM)
3. Persist the task to localStorage, so that application stays in same state even if reload the page, leave and come back. Remove the task from localStorage, clearing all the tasks in localStorage

<hr>

### Important Points:

1. <strong>Event Delegation:</strong> Event delegation allows you to avoid adding event listeners to specific nodes; instead, the event listener is added to one parent. That event listener analyzes bubbled events to find a match on child elements. So basically, inside event handler we put logic to target the element that we actually want (for that particular event) 
  <strong>Example in the project:</strong> I have used event delegation in the function which deals with <strong>deleting/removing the task</strong> from the list of tasks.
  If we look at the UI code, then we have all the tasks which will be inside <strong>ul tag</strong> as <strong>li tag</strong>. Now, if I want to remove the item, I will click on x icon (the <strong>i tag</strong> has the class of delete-item) and since the tasks are dynamic and multiple (as more tasks will be added), we need to use event delegation.
  
2. <strong>innerHTML vs removeChild:</strong>
  removeChild() is relatively faster than innerHTML. It is used in order to clear the tasks from DOM.
  
3. I have used <strong>keyup event</strong> in order to provide the functionality of filtering the tasks as you type. The keyup event occurs when a keyboard key is released.

<br>
<hr>

### Reference

1. <a href="http://materializecss.com/">Materialize CSS </a>
2. <a href="https://jsperf.com/innerhtml-vs-removechild">innerHTML vs removeChild</a>
