const kiir = document.getElementById("kiir");
const page = document.getElementById("page");
const todo = document.getElementById("todo");
//kiir.innerHTML+="apple"
let Data;
let Todo;

// XMLHttpRequest létrehozása
var xhttp = new XMLHttpRequest();
var xhttp_todo = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText)
        console.log(res);
            Data = res;
            display(Data);
            return Data;
    }
}

xhttp_todo.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText)
        console.log(res);
            Todo = res;
            return Todo;
    }
}

xhttp.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
xhttp_todo.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);

xhttp.send();
xhttp_todo.send();


function display(Data) {
    let table_help = "<table><tbody>";
    table_help += "<th>Név</th><th>Felhasználónév</th><th>E-mail</th><th>Telefon</th><th>több</th><th>todo</th>";
    for (let i = 0; i < Data.length; i++) {
        const x = Data[i];
        table_help += `<tr>`;
        table_help += `<td class="out">
            <p id="out_name_${x.id}">${x.name}</p>
        </td>`;
        table_help += `<td class="out">
            <p id="out_username_${x.id}">${x.username}</p>
        </td>`;
        table_help += `<td class="out">
            <p id="out_email_${x.id}">${x.email}</p>
        </td>`;
        table_help += `<td class="out">
            <p id="out_phone_${x.id}">${x.phone}</p>
        </td>`;
        table_help += `<td>
            <input type="button" id="button_${x.id}" onclick="Open_Page(${x.id})" value="Több" class="button">
        </td>`;
        table_help += `<td>
            <input type="button" id="button_${x.id}" onclick="Open_Todo(${x.id})" value="Todo" class="button">
        </td>`;
        table_help += `</tr>`;

    }
    table_help += "</tbody></table>";
    kiir.insertAdjacentHTML('beforeend', table_help);
}


function Open_Page(num) {
    page.innerHTML="";
    num--;
    // will be called every time the user clicks on a game and will make a separate "webpage" what will only be an overlay on top of everything else

    let page_out = `<div class="full_page">`;
    page_out += `
        <p class="game_title">${Data[num].name}</p>
        <p>Email : ${Data[num].email}</p>
        <p>Telefon : ${Data[num].phone}</p>
        <p>Város : ${Data[num].address.city}</p>
        <p>Cím : ${Data[num].address.street}</p>
        <p>Ajtó : ${Data[num].address.suite}</p>
    `;
    page_out += `<input type="button" value="lap bezárása" onclick="Close_Page()">`;
    page_out += `</div>`;

    page.insertAdjacentHTML("afterbegin",page_out);
    page.style.visibility = "visible";
    
}

function Close_Page() {
    page.style.visibility = "hidden";
    page.innerHTML="";
}



function Open_Todo(num) {
    todo.innerHTML="";

    let todo_out = `<div class="full_todo">`;
    
    todo_out += `<table>`;
    
    todo_out += `<th>Todo</th><th>Progress</th>`;

    Todo.forEach(({userId,id,title,completed},i) => {
        if (num==userId) {
            todo_out += `<tr><td>${title}</td><td>${completed?"Completed":"Not yet finished"}<td></tr>`;
        }
    });
    
    todo_out += `</table>`;

    todo_out += `<input type="button" value="lap bezárása" onclick="Close_Todo()">`;
    todo_out += `</div>`;
    //console.log(todo_out);
    todo.insertAdjacentHTML("afterbegin",todo_out);
    todo.style.visibility = "visible";
}

function Close_Todo() {
    todo.style.visibility = "hidden";
    todo.innerHTML="";
}