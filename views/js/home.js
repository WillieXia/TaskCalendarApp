const newTaskText = $('#newTaskText')
const newTaskClassSelect = $('#classSelect')
const addTaskBtn = $('#addTaskBtn')
const newClassName = $('#newClassName')
const addClassBtn = $('#addClassBtn')

const classList = $('#classList')
const classPages = $('#classPages')

newClassForm = $('#newClassForm')
newTaskForm = $('#newTaskForm')

newClassForm.submit(function(e) { e.preventDefault() })
newTaskForm.submit(function(e) { e.preventDefault() })

let allClassesWithTasks = []

function getTaskHTML(task, _class) {
  return `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${task.text}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${_class.name}</h6>
    </div>
  </div>
  <br>
  `
}

function resetContent() {
  newTaskClassSelect.empty()
  classList.empty()
  classList.append(`
    <a class="list-group-item list-group-item-action active" id="list-allClasses-list" data-toggle="list" href="#allClasses" role="tab">All Classes</a>
  `)
  classPages.empty()
  classPages.append(`
    <div class="tab-pane fade show active" id="allClasses" role="tabpanel">
      <h2>All Classes</h2>
      <br>
    </div>
  `)
}

function updateContent(classes) {
  if (classes.length > 0) {
    const allClassesPage = $('#allClasses')
    let allClassHTML = ''
    for (let i = 0; i < classes.length; i++) {
      const _class = classes[i]
      classList.append(`
        <a class="list-group-item list-group-item-action" id="list-${_class._id}-list" data-toggle="list" href="#list-${_class._id}" role="tab">${_class.name}</a>
      `)
      classPages.append(`
        <div class="tab-pane fade" id="list-${_class._id}" role="tabpanel">
          <h2>${_class.name}</h2>
          <br>
        </div>`
      )
      allClassHTML += `
        <h4>${_class.name}</h4>
        <br>
      `
      if (_class.tasks.length > 0) {
        for (let j = 0; j < _class.tasks.length; j++) {
          const task = _class.tasks[j]
          const taskHTML = getTaskHTML(task, _class)
          allClassHTML += taskHTML
          $(`#list-${_class._id}`).append(taskHTML)
        }
      } else {
        const noTasksHTML = `<p>${_class.name} has no tasks! Click "Add Tasks" to continue.</p>`
        allClassHTML += noTasksHTML
        $(`#list-${_class._id}`).append(noTasksHTML)
      }
      // TODO: Load tasks
      newTaskClassSelect.append(`
        <option value=${_class._id}>${_class.name}</option>
      `)
    }
    allClassesPage.append(allClassHTML)
  } else {
    $('#allClasses').append(`
      <p>You have not created any classes! Click "Add Class" to continue.</p>
    `)
  }
}

function updateAllClassesWithTasks() {
  fetch('/api/allClassesWithTasks')
  .then(res => res.json())
  .then(classes => {
    resetContent()
    updateContent(classes)
    allClassesWithTasks = classes
  })
}

addClassBtn.click(() => {
  const body = {
    name: newClassName.val()
  }
  fetch('/api/class', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => {
    if (res.status == 201) {
      // TODO: Close modal
      updateAllClassesWithTasks()
    } else {
      console.log(err)
      // TODO: show error
    }
  })
})

addTaskBtn.click(() => {
  const body = {
    text: newTaskText.val(),
    class_id: newTaskClassSelect.val()
  }
  fetch('/api/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => {
    if (res.status == 201) {
      // TODO: Close modal
      updateAllClassesWithTasks()
    } else {
      console.log(err)
      // TODO: show error
    }
  })
})

updateAllClassesWithTasks()