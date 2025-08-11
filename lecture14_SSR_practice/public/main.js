const form = document.getElementById('task-form');
const filterButtons = document.getElementById('filter');
const todoContainer = document.getElementById('todo-container');



getAllTodos(); // when script load this will run

// e -> event reference
// event.target -> stores event origin element (for .target it will store the form)
form.addEventListener("submit", async(e) => {
    e.preventDefault(); // stops page from refreshing when submitted
    // const list = form.children; // return list of child elements
    const input = form.children[0];
    const task = input.value; // input value of what user have writen 
    // const res = await axios.post('http://localhost:4000/todo/create',{task:task}); // or
    const res = await axios.post('http://localhost:4000/todo/create',{task});
    input.value = ""; // input will get empty after todo created
    getAllTodos();
})


filterButtons.addEventListener("click",(e) => {
    const button = e.target.id; // gives the id of the bottom which is clicked
    // console.log(button);

    if (!button) return;
    if (button == "all") {
        e.target.className = "active";
    }
    if (button == "active") {
        e.target.className = "active";
    }
    if (button == "completed") {
        e.target.className = "active";
    }

    const filterBtns = filterButtons.children;

    for (let btn of filterBtns) { // iterating from the childer of the filter container
        if (btn.id != button) { // if the id is not equal to the clicked button id 
            btn.className = ""; // we emptying the class of that button
        }
    }
})

async function getAllTodos() {
    let res = await axios.get("http://localhost:4000/todo/all");
    let todos = res.data.todos; // returns the array of all the data present in the database
    renderTodos(todos);
}


// API integeration and DOM
function renderTodos(todos) {
    todoContainer.innerHTML = ""; // will prevent duplicate data in the ui
    for (let todo of todos) {
        const div = document.createElement("div");
        div.className = "todo";
    
        // innerHTML -> we can use html tags in it , innerText -> we can only use text
        div.innerHTML = `<h4>${todo.task}</h4> 
        <div id=${todo._id}>
        <button class="status">${todo.status ? "Undo" : "Completed"}</button>
        <button class="delete">delete</button>
        </div>`;
        todoContainer.prepend(div);
    }
}


// dynamic elements can't be selected as they are not present at that time when JS file loads
// const todos = document.getElementsByClassName('todo'); // this will not work as todo is not present in html at time of JS loads

todoContainer.addEventListener("click",async(e) => {
    const btnClass = e.target.className;
    
    // if btnClass is not delete or status return from function
    if (btnClass != "delete" && btnClass != "status") return;

    const todoId = e.target.parentElement.id;

    if (btnClass == "delete") {
        await axios.delete(`http://localhost:4000/todo/delete/${todoId}`);
        
    }
    if (btnClass == "status") {
        await axios.put(`http://localhost:4000/todo/updateStatus/${todoId}`);

    }
    getAllTodos();
})

