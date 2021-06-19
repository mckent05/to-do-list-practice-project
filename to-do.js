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

form.addEventListener('submit', addItems)
clrBtn.addEventListener('click', clearItems)

function addItems(e){
    e.preventDefault()
    value=toDo.value
    if(value && !editFlag){
        let article=document.createElement('article')
        article.classList.add('list')
        let id=new Date().getTime().toString()
        let dataID=document.createAttribute('data-id')
        dataID.value=id
        article.setAttributeNode(dataID)
        article.innerHTML=` <p>${value}</p>
        <div class="btn-container">
            <button class="edit-btn">edit</button>
            <button class="delete-btn">delete</button>
        </div>`
        let deleteBtn=article.querySelector('.delete-btn')
        let editBtn=article.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteItems)
        editBtn.addEventListener('click', editItems) 
        list.appendChild(article)
        container.classList.add('show-list')
        displayAlert('Event added!','success')
        toDefault()
        
        


    }
    else if(value && editFlag){
        editElement.innerHTML=value
        displayAlert('edited to-do event!','success')
        toDefault()
    }
    else{
        displayAlert('please enter an event!', 'danger')
    }
}
function displayAlert(text, action){
    alert.innerHTML=text
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.innerHTML=''
        alert.classList.remove(`alert-${action}`)
   }, 1000)
}
function toDefault(){
    toDo.value=""
    editFlag=false
    editID=''
    submit.innerHTML='submit'
}
function clearItems(){
    let events=document.querySelectorAll('.list')
    events.forEach(function(event){
        list.removeChild(event)
    })
    container.classList.remove('show-list')
    displayAlert('to-do list empty!','danger')
    toDefault()
}
function deleteItems(e){
    let target=e.currentTarget.parentElement.parentElement
    list.removeChild(target)
    if(list.children.length===0){
        container.classList.remove('show-list')
    }
    displayAlert('your to-do deleted!','danger')
}
function editItems(e){
    editFlag=true
    let target=e.currentTarget.parentElement.parentElement
    editElement=e.currentTarget.parentElement.previousElementSibling
    editID=target.dataset.id
    toDo.value=editElement.innerHTML
    submit.innerHTML='edit'
    
}

