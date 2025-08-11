const form = document.getElementById('task-form');
const filterButtons = document.getElementById('filter');


// e -> event reference
// event.target -> stores event origin element (for .target it will store the form)
form.addEventListener("submit", async(e) => {
    e.preventDefault(); // stops page from refreshing when submitted
    // const list = form.children; // return list of child elements
    const input = form.children[0];
    const task = input.value; // input value of what user have writen 
    // const res = await axios.post('http://localhost:4000/todo/create',{task:task}); // or
    const res = await axios.post('http://localhost:4000/todo/create',{task});
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