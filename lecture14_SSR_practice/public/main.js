const filterButtons = document.getElementById('filter');

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