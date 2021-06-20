const months=[
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
const days=[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
    
]
let day=document.querySelector('.day')
let date=document.querySelector('.date')
let month=document.querySelector('.month')
let year=document.querySelector('.year')
let today= new Date()
day.innerHTML=days[today.getDay()]
date.innerHTML=today.getDate()
month.innerHTML=months[today.getMonth()]
year.innerHTML=today.getFullYear()
let form=document.querySelector('.form')
let submit=document.querySelector('.submit-btn')
let alert=document.querySelector('.alert')
let container=document.querySelector('.list-container')
let toDo=document.getElementById('to-do')
let list=document.querySelector('.to-do-list')
let clrBtn=document.querySelector('.clr-btn')

let editElement
let editFlag=false
let editID=''
// to add my event listeners
form.addEventListener('submit', addItems)
clrBtn.addEventListener('click', clearItems)
window.addEventListener('DOMContentLoaded', loadLocalstorage)


// add-items function
function addItems(e){
    e.preventDefault()
    value=toDo.value
    let id= new Date().getTime().toString()
    // value and editflag is false
    if (value && !editFlag){
        //create a new article element
        setUpItems(id, value)
        displayAlert('todo event succesfully added!','success')
        setDefault()
        addToLocalStorage(id, value)
        
    }
    // value and editing
    else if (value && editFlag){
        editElement.innerHTML=value
        id=editID
        displayAlert('todo event edited','success')
        setDefault()
        editLocalStorage(id, editElement.innerHTML)
    }
    // when there is no value entered
    else{
        displayAlert('to do event cannot be empty!', 'danger')
        setDefault()
    }
}

// alert function for actions taking place
function displayAlert(text, action){
    alert.innerHTML=text
    alert.classList.add(`alert-${action}`)


// display alert timeout
    setTimeout(function(){
        alert.innerHTML=''
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}
// set parameters back to default
function setDefault(){
    toDo.value=''
    editFlag=false
    editID=''
    submit.innerHTML='submit'
}
//clear items in to-do list
function clearItems(){
    let items=document.querySelectorAll('.list')
    items.forEach(function(item){
        list.removeChild(item)
    })
    container.classList.remove('show-list')
    displayAlert('todo list cleared!','danger')
    clearLocalStorage()
}
// delete item from todo list
function deleteItems(e){
    let target= e.currentTarget.parentElement.parentElement
    let id=target.dataset.id
    list.removeChild(target)
    if (list.children.length===0){
        container.classList.remove('show-list')

    }
    displayAlert('todo event deleted!','danger')
    setDefault()
    deleteFromlocalstorage(id)
}
// edit item in list
function editItems(e){
    editFlag=true
    let target=e.currentTarget.parentElement.parentElement
    editID=target.dataset.id
    editElement=e.currentTarget.parentElement.previousElementSibling
    toDo.value=editElement.innerHTML
    submit.innerHTML='edit'
    
}
// add to Local Storage
function addToLocalStorage(id,value){
    let toDo= {id, value}
    let items= getLocalStorage()
    items.push(toDo)

    localStorage.setItem('mylist', JSON.stringify(items))
}
// get items from local storage
function getLocalStorage(){
    return localStorage.getItem('mylist') ? JSON.parse(localStorage.getItem('mylist')):[]
}
// clear local storage
function clearLocalStorage(){
    let items=getLocalStorage()
    localStorage.clear(items)
}
// delete from local storage
function deleteFromlocalstorage(id){
    let items=getLocalStorage()
    items=items.filter(function(item){
        if(item.id !== id){
            return item
        }
    })
    localStorage.setItem('mylist', JSON.stringify(items))
}
//edit Localstorage
function editLocalStorage(id, value){
    let items=getLocalStorage()
    items=items.map(function(item){
        if(item.id==id){
            item.value=value
        }
        return item
    })
    localStorage.setItem('mylist', JSON.stringify(items))
}
//load DOM content from local storage
function loadLocalstorage(){
    let items=getLocalStorage()
    items.forEach(function(item){
        setUpItems(item.id, item.value)
    })
}
// set up items
function setUpItems(id, value){
    let article=document.createElement('article')
        article.classList.add('list')
        let artId=document.createAttribute('data-id')
        artId.value=id
        article.setAttributeNode(artId)
        article.innerHTML= ` <p>${value}</p>
        <div class="btn-container">
        <button class="edit-btn">edit</button>
    <button class="delete-btn">delete</button>
    </div>`
        //set event listeners for my edit and delete button
        let delBtn=article.querySelector('.delete-btn')
        let editBtn=article.querySelector('.edit-btn')

        delBtn.addEventListener('click', deleteItems)
        editBtn.addEventListener('click', editItems)
        list.appendChild(article)
        container.classList.add('show-list')
}