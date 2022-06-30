window.onload = () => {
    document.querySelector('#addButton').addEventListener('click', addInputToList) //add to list button
    document.querySelector('#checklistInput').addEventListener('keydown', submitWithEnter)  //submit task with Enter
}

//Array of the checklist
let checklist = []

//Item number in list used for keeping track of entrys
let itemNum = 0

//appends task to main list and updates the checklist array
function addInputToList (){ 

    let text = document.getElementById('checklistInput')
    let textInput = document.getElementById('checklistInput').value

    if(textInput !== ''){

        const li = document.createElement('li')
        li.setAttribute('id',`task${itemNum}`)
        li.innerHTML=`${textInput}<div class=remove id=item${itemNum}></div>`

        const remove = document.createElement('div')
        remove.setAttribute('class','remove')

        document.getElementById('list').appendChild(li)

        document.querySelector(`#item${itemNum}`).addEventListener('click',deleteTask)
        document.querySelector(`#task${itemNum}`).addEventListener('click',complete)

        checklist.push(textInput)
        itemNum++

        document.querySelector('#checklistInput').value = ''
    }
    else console.log('No input')
}
// Hitting enter submits form
function submitWithEnter(e){
    if(e.key === 'Enter'){

            addInputToList()

            // const form = document.getElementById('form')
            // form.onsubmit = submit

            // function submit(event){
            //     event.preventDefault()
            // }
        }
 };

//removes task from list and checklist array
function deleteTask(e){
    const item=e.target.parentElement
    const itemText = e.target.parentElement.innerText
    let itemIndex = checklist.indexOf(itemText)
    
    checklist.splice(itemIndex,1)
    item.remove()
    itemNum--
}

//clicking on task toggles a strike through line
function complete(e){
    const task = e.target
    if(task.className !== 'strike'){
        task.setAttribute('class','strike')
    }else{
        task.removeAttribute('class','strike')
    }
}