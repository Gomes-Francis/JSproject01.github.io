// Document Selection
let add = document.getElementsByClassName('btn');
add = Array.from(add);
let ulList = document.getElementById('ul_List');

add.map(item => {
    item.addEventListener('click', totalItems);
})
ulList.addEventListener('click', rItem)
document.addEventListener('DOMContentLoaded', getTasks);
document.addEventListener('DOMContentLoaded', blank);

function totalItems(event) {
    ulList.previousElementSibling.style.display = 'none';
    let price = event.target.parentElement.children[0].innerText;
    let product = event.target.parentElement.parentElement.children[1].innerText;
    let added = product + ' ' + price + ' .';
    let list = document.createElement('li');
    list.textContent = added + ' ';
    let anchorTag = document.createElement('a');
    anchorTag.setAttribute('href', '#');
    anchorTag.style.textDecoration = 'none';
    anchorTag.innerText = 'x';
    anchorTag.style.color = 'red';
    list.appendChild(anchorTag);
    ulList.appendChild(list);
    storeInLocalStorage(added);

}

function rItem(event) {
    if (event.target.parentElement.parentElement.children[1] == undefined && event.target.parentElement.parentElement.children[0] != undefined) {
        ulList.previousElementSibling.style.display = 'block';
    }
    
    if (event.target.hasAttribute('href')) {
        if (confirm("Remove Items? ")) {
            event.target.parentElement.remove();
            removeAll(event.target.parentElement);
        } else {
            ulList.previousElementSibling.style.display = 'none';
            console.log(event.target)
        }
    }
}

function storeInLocalStorage(item) {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(item);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.map(item => {
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerText = 'x';
        link.style.textDecoration = 'none';
        link.style.color = 'red';
        let list = document.createElement('li');
        list.textContent = item;
        list.appendChild(link);
        ulList.appendChild(list);
    })
}

function removeAll(task) {
    task.lastChild.remove()
    let innerText = task.textContent.trim();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let deleteItem = true;
    tasks.map((item, index) => {
        if (item == innerText && deleteItem == true) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            deleteItem = false;
        }
    })

}

function blank() {
    if (ulList.children[0] != undefined) {
        ulList.previousElementSibling.style.display = 'none';
    }
}
