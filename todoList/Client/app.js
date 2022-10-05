const themes = {
  default: {
    '--base-text-color': '#212529',
    '--header-bg': '#007bff',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#007bff',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#0069d9',
    '--default-btn-border-color': '#0069d9',
    '--danger-btn-bg': '#dc3545',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#bd2130',
    '--danger-btn-border-color': '#dc3545',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#80bdff',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  },
  dark: {
    '--base-text-color': '#212529',
    '--header-bg': '#343a40',
    '--header-text-color': '#fff',
    '--default-btn-bg': '#58616b',
    '--default-btn-text-color': '#fff',
    '--default-btn-hover-bg': '#292d31',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#b52d3a',
    '--danger-btn-text-color': '#fff',
    '--danger-btn-hover-bg': '#88222c',
    '--danger-btn-border-color': '#88222c',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
  },
  light: {
    '--base-text-color': '#212529',
    '--header-bg': '#fff',
    '--header-text-color': '#212529',
    '--default-btn-bg': '#fff',
    '--default-btn-text-color': '#212529',
    '--default-btn-hover-bg': '#e8e7e7',
    '--default-btn-border-color': '#343a40',
    '--default-btn-focus-box-shadow':
      '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    '--danger-btn-bg': '#f1b5bb',
    '--danger-btn-text-color': '#212529',
    '--danger-btn-hover-bg': '#ef808a',
    '--danger-btn-border-color': '#e2818a',
    '--input-border-color': '#ced4da',
    '--input-bg-color': '#fff',
    '--input-text-color': '#495057',
    '--input-focus-bg-color': '#fff',
    '--input-focus-text-color': '#495057',
    '--input-focus-border-color': '#78818a',
    '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
  },
};

let lastSelectedTheme = localStorage.getItem('app_them') || 'default'
const listContainer = document.querySelector(
    '.tasks-list-section .list-group',                                     // указываем родительский и куда кинуть(ul)
)


function listItemTemplate({ _id, taskTitle, taskBody }) {
  const li = document.createElement("li")
  li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2')      // добавляем классы
  li.setAttribute('data-task-id', _id)                                                          // добавляем атрибут в li с id 

  const span = document.createElement('span')                   // добавляем span
  span.textContent = taskTitle                                     // заголовок
  span.style.fontWeight = 'bold'                              // жирность заголовку

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Delete task'
  // 'btn' - отвечает что это кнопка, 'btn-danger' - она будет красной, 'ml-auto' - она прижмется к правому краю, 'delete-btn' - наш специфичный класс, понадобится в будушем.
  deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn')
  deleteBtn.onclick = () => deletePost(li.dataset.taskId)    

  const article = document.createElement('p')                             // создаем параграф
  article.textContent = taskBody
  article.classList.add('mt-2', 'w-100')                      // 'w-100' - ширина 100%

  // эти три элемента нужно их добавить в 'li'
  li.appendChild(span)
  li.appendChild(deleteBtn)
  li.appendChild(article)


  return li
}

function renderAllTasks(tasksList) {
  listContainer.innerHTML = ''
  if (!tasksList) {                                                       // проверяем или передается tasksList
    console.error('Передайте список задач!')
    return
  }
  const fragment = document.createDocumentFragment()
  tasksList.forEach((task) => {                             // обьект в массив и перебираем forEach
    const li = listItemTemplate(task)
    fragment.appendChild(li)
  })
  listContainer.appendChild(fragment)
}


async function test(arrOfTasks, thema_default) {
  const ObjOfTasks = await getPosts()
  

  // Elements UI
  
  const form = document.forms['addTask']                   // спец свойство .forms, в нем хранится колекция всех форм которое есть на странице.['получить доступ по ее имени']
  const inputTitle = form.elements['title']               // спец свойство .elements, в котором по name или id элемента формы мы можем получить доступ к этому элементу
  const inputBody = form.elements['body']
  const themeSelect = document.getElementById('themeSelect');


  // Events 
  setTheme(lastSelectedTheme)
  renderAllTasks(ObjOfTasks)

  form.addEventListener("submit", onFormSubmitHandler)
  themeSelect.addEventListener('change', onThemeSelectHendler)

  

  

  async function onFormSubmitHandler(e) {                               // обработчик события формы
    e.preventDefault()                                           // Submit форма вызывает перезагрузку страници при отправке формы, делаем e.preventDefault() для того чтобы прекратить стандартное действие 
    // у каждого элемента форм(imput и ...) в свойствах .value хранится текущее значение которое записанно в этом input
    const titleValue = inputTitle.value              // то что вводится в форме
    const bodyValue = inputBody.value

    if (!titleValue || !bodyValue) {
      alert('Введите title и body');
      return
    }
    await createPost(titleValue, bodyValue)

    const posts = await getPosts()
    renderAllTasks(posts)

    form.reset()                                                      // у формы специальный метод reset (для очистки полей)
  }

  function onThemeSelectHendler(e) {                                      // обработчик события изменения Select
    const selectedTheme = themeSelect.value                               // в value хранится выбраное значение селекта

    const isConfirmed = confirm(`вы действительно хотите изменить тему: ${selectedTheme}?`)
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme
      return
    }
    setTheme(selectedTheme)
    lastSelectedTheme = selectedTheme
    localStorage.setItem('app_them', selectedTheme)
  }

  function setTheme(name) {                                             // функц. будет устанавливать тему(например тему из сервера)
    const selectedThemObj = themes[name]
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)

    })



  }

}

test()



async function getPosts() {
  const response = await fetch('http://localhost:5000/')
  const posts = await response.json()
  return posts
}



async function createPost(title, body) {
  await fetch('http://localhost:5000/create', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      taskTitle: title,
      taskBody: body,
    })
  })
}


async function deletePost(id) {
  await fetch(`http://localhost:5000/${id}`, {
    method: 'delete'
  })
  const posts = await getPosts()
  renderAllTasks(posts)
}










