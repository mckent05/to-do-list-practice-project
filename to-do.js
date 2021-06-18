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
let alert=document.querySelector('.alert')
let toDo=document.getElementById('to-do')
let clrBtn=document.querySelector('.clr-btn')

let editElement
let editFlag=true
let editID=''

form.addEventListener('submit', addItems)

function addItems(e){
    e.preventDefault()
    value=toDo.value
    if(value && !editFlag){
        console.log('add item')
    }else if(value && editFlag){
        console.log('editing')
    }
    else{
        displayAlert('please enter an event', 'failed')
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
