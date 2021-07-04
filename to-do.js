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
// delcare all variables for my counter
let day=document.querySelector('.day')
let date=document.querySelector('.date')
let month=document.querySelector('.month')
let year=document.querySelector('.year')
let today= new Date()
day.innerHTML=days[today.getDay()]
date.innerHTML=today.getDate()
month.innerHTML=months[today.getMonth()]
year.innerHTML=today.getFullYear()
let countTime=new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes()+5,today.getSeconds())


//declare all my other variables for DOM
let form=document.querySelector('.form')
let submit=document.querySelector('.submit-btn')
let alert=document.querySelector('.alert')
let container=document.querySelector('.list-container')
let toDo=document.getElementById('to-do')
let list=document.querySelector('.to-do-list')
let clrBtn=document.querySelector('.clr-btn')

// declare variables for editing
let editElement
let editFlag=false
let editID=''

// Event listeners
submit.addEventListener('click', addItems)
clrBtn.addEventListener('click', clrItems)
window.addEventListener('DOMContentLoaded', loadItems)

// function to add items to to-do event
function addItems(e){
    e.preventDefault()
    let value=toDo.value
    let id=new Date().getTime().toString()
    if(value && !editFlag){
        setUpItems(id,value)
        displayAlert('to-do event added','success')
        setDefault()
        addToLocalStorage(id,value)
      
        


    }
    else if(value && editFlag){
        editElement.innerHTML=value
        id=editID
        setDefault()
        displayAlert('to-do event edited', 'success')
        editLocalStorage(id, value)
    }
    else{
        displayAlert('enter a to-do list', 'danger')
        setDefault()
    }
}

// function to display alert either success or failure
function displayAlert(text, action){
    alert.innerHTML=text
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.innerHTML=''
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

// function to set all my parematers back to default
function setDefault(){
    editFlag=false
    editID=''
    editElement=''
    toDo.value=''
    submit.innerHTML='submit'
}

// function to load items for local storage
function loadItems(){
    let items=getLocalStorage()
    items.forEach(function(item){
        setUpItems(item.id, item.value)
    })
}

//function used in adding items
function setUpItems(id,value){
    let article=document.createElement('article')
    article.classList.add('list')
    let articleId=document.createAttribute('data-id')
    articleId.value=id
    article.setAttributeNode(articleId)
    article.innerHTML=` <p>${value}</p>
    <div class="btn-container">
        <button class="edit-btn">edit</button>
        <button class="delete-btn">delete</button>
    </div>
    <div class="time-count">
        <div class='wrapper'>
            <div class='time days'>
                <p></p>
            </div>
            <div class='time hours'>
                <p></p>
            </div>
            <div class='time minutes'>
                <p></p>
            </div>
            <div class='time seconds'>
                <h3></h3>
            </div>
        </div>
    </div>`
    list.appendChild(article)
    container.classList.add('show-list')
    let editBtn=article.querySelector('.edit-btn')
    let delBtn=article.querySelector('.delete-btn')
    let times=article.querySelectorAll('.time')
    
    // function to calculate countdown
    function getExpiry(){
        let t1=today.getTime()
        let t2=countTime.getTime()
        let t=t2-t1
        let oneSec= 1000
        let oneDay= 24 * 60 * 60 * oneSec
        let oneHour= 60 * 60 * oneSec
        let oneMinute= 60 * oneSec
    
        let aDay= Math.floor(t/oneDay)
        let anHour= Math.floor((t % oneDay)/oneHour)
        let aMin= Math.floor((t % oneHour)/oneMinute)
        let aSec=Math.floor((t % oneMinute)/oneSec)
        let values=[aDay,anHour,aMin,aSec]
        function format(item){
            if(item<10){
                return `0${item}`
            }
            return item
        }
        times.forEach(function(time,index){
            time.innerHTML=format(values[index])
        })
        
    
    }
    setInterval(getExpiry, 1000 )
    getExpiry()
    
    
    editBtn.addEventListener('click', editItems)
    delBtn.addEventListener('click', deleteItems)
    
}

// function to clear items from to-do event
function clrItems(){
    let events=document.querySelectorAll('.list')
    events.forEach(function(event){
        list.removeChild(event)
    })
    container.classList.remove('show-list')
    setDefault()
    displayAlert('to-do list empty!','danger')
    clearLocalStorage()
}

//function to delete event.
function deleteItems(e){
    let target=e.currentTarget.parentElement.parentElement
    let id=target.dataset.id
    list.removeChild(target)
    if(list.children.length==0){
        container.classList.remove('show-list')
    }
    setDefault()
    displayAlert('to-do event deleted','danger')
    deleteStorage(id)
}

//function to edit items 
function editItems(e){
    editFlag=true
    let target=e.currentTarget.parentElement.parentElement
    editElement=e.currentTarget.parentElement.previousElementSibling
    toDo.value=editElement.innerHTML
    editID=target.dataset.id
    submit.innerHTML='edit'

}


// add to local storage function
function addToLocalStorage(id,value){
    let item={id,value}
    items=getLocalStorage()
    items.push(item)

    localStorage.setItem('myList', JSON.stringify(items))
}

//get from local stroage function
function getLocalStorage(){
    return localStorage.getItem('myList') ? JSON.parse(localStorage.getItem('myList')) : []
}

// clear local storage function
function clearLocalStorage(){
    localStorage.clear('myList')
}

// delete from local stroage function
function deleteStorage(id){
    let items=getLocalStorage()
    items=items.filter(function(item){
        if(id != item.id){
            return item
        }
    })
    localStorage.setItem('myList', JSON.stringify(items))
}

//edit local storage function
function editLocalStorage(id,value){
    let items=getLocalStorage()
    items=items.map(function(item){
        if(id == item.id){
            item.value = value
        }
        return item
    })
    localStorage.setItem('myList', JSON.stringify(items))

}

 
