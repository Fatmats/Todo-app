const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;


loadItems()
eventListener();

function eventListener() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteItemAll)

}

function loadItems() {
    items = getItemFromLS();
    items.forEach((item) => {
        creatItem(item);
    })

}

function getItemFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items

}

function setItemToLS(text) {
    items = getItemFromLS()
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));

}
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);   
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function creatItem(text) {

    //! Create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    //! Create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right'
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    //! add a to li
    li.appendChild(a)
    taskList.appendChild(li)

}


function addNewItem(e) {
    if (input.value === '') {
        alert('add New İtem');
    };
    // createItem
    creatItem(input.value);
    setItemToLS(input.value);


    //!clear input
    input.value = ''

    e.preventDefault();
}

function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
    }
}

function deleteItemAll(e) {
    // taskList.innerHTML=''

    if (confirm('are you sure ?')) {
        // taskList.innerHTML='';
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }

    e.preventDefault()
}