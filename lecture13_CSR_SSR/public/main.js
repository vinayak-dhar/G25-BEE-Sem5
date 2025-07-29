const container = document.getElementById("container");


async function getUser() {
    let res = await axios.get("http://localhost:4000/user"); // -> sending a get request to this '/user' API path
    let user = res.data.result; // res.data.result -> is a object in the '/user' API

    const h2 = document.createElement("h2");
    h2.innerText = `${user.name}`;

    // overwrite all the html inside "div" with "id" -> container
    container.innerHTML = `<p>${user.email}</p> <p>${user.age}</p>`;
    // container.append(h2); // push at the last 
    container.prepend(h2); // push at the top
}

getUser();