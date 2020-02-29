let todaysSchedule = document.querySelector('#app #todays-schedule')
let thingsRemember = document.querySelector('#app #things-remember')

let inputTodaysSched = document.querySelector('#app #ts-input')
let inputThingsRmr = document.querySelector('#app #tr-input')

let buttonTodaysSched = document.querySelector('#app .button-1')
let buttonThingsRmr = document.querySelector('#app .button-2')

let todosTodaysSched = JSON.parse(localStorage.getItem('list_todosTodaysSched')) || []
let todosThingsRmr = JSON.parse(localStorage.getItem('list_todosThingsRmr')) || []

function render(typeElement, todos) {
  let listTodo = whichNumTodo(todos)

  for (todo of todos) {
    let todoElement = document.createElement('li')
    let todoText = document.createTextNode(todo)
    todoElement.className = 'todos'

    let linkElement = document.createElement('img')
    linkElement.setAttribute('src', 'images/trash.png')
    linkElement.className = 'delButton'
    
    linkElement.setAttribute('href', '#')

    let pos = todos.indexOf(todo)
    linkElement.setAttribute('onclick', `deleteTodo(${pos}, ${listTodo})`)

    todoElement.appendChild(todoText)
    todoElement.appendChild(linkElement)

    typeElement.appendChild(todoElement)
  }
}

function renderTodos(typeElement, todos) {
  if (typeElement == null || todos == null) return
  
  typeElement.innerHTML = ''
  render(typeElement, todos)
}

function renderAllTodos() {
  renderTodos(todaysSchedule, todosTodaysSched)
  renderTodos(thingsRemember, todosThingsRmr)
}

renderAllTodos()

function whichInput() {
  if (inputTodaysSched.value != '') return [inputTodaysSched, todosTodaysSched, 'list_todosTodaysSched']
  else if (inputThingsRmr.value != '') return [inputThingsRmr, todosThingsRmr, 'list_todosThingsRmr']
}

function addTodo() {
  let [input, todos, list] = whichInput()
  let todoText = input.value

  todos.push(todoText)
  input.value = ''
  renderAllTodos()
  saveToStorage(list, todos)
}

buttonTodaysSched.onclick = addTodo
buttonThingsRmr.onclick = addTodo

document.querySelector('#app').addEventListener('keydown', function(e) {
  if(e.which == 13){
    addTodo();
  }
})

function whichList(todos) {
  if (todos === todosTodaysSched) return 'list_todosTodaysSched'
  else if (todos === todosThingsRmr) return 'list_todosThingsRmr'
  else console.log('todo não existe')
}

function whichTodo(num) {
  if (num == 1) return todosTodaysSched
  else if (num == 2) return todosThingsRmr
}

function whichNumTodo(todos) {
  if (todos == todosTodaysSched) return 1
  else if (todos == todosThingsRmr) return 2
}

function deleteTodo(pos, numTodo) {
  let todos = whichTodo(numTodo)
  let list = whichList(todos)
  todos.splice(pos, 1)
  renderAllTodos()
  saveToStorage(list, todos)
}

function saveToStorage(list, todos) {
  localStorage.setItem(list, JSON.stringify(todos))
}