import {isValidForm} from './logic/validForm.js'
import {cleanForm} from './logic/cleanForm.js'
import {overwritingPosts} from './logic/overwritingPosts.js'
import {createDomElements} from './logic/createDomElements.js'
import {createPost, updateData} from './logic/endpoint.js'

// import 'dotenv/config'

// console.log(process.env);

(async () => {
    overwritingPosts()
})();


const btnCreate = document.querySelector('.btn')
const btnClosePopupBg = document.querySelector('.popup__bg');
const popup = document.querySelector('.popup'); // Само окно
const btnCloseModal = document.querySelector('.close-popup'); // Кнопка для скрытия окна
const btnUpdateDate = document.querySelector('.btnUpdete')




btnCreate.addEventListener("click", btnCreateHandler)
btnCloseModal.addEventListener("click", closeModalHandlerCross)
btnClosePopupBg.addEventListener("click", closeModalHandlerBg)




async function btnCreateHandler() {
    event.preventDefault()
    const value1 = document.querySelector('.form-control-1')
    const value2 = document.querySelector('.form-control-2')

    if (!isValidForm(value1, value2)) {
        return
    }

    await createPost(value1.value, value2.value)
    cleanForm(value1, value2)
    overwritingPosts()
}

async function updateDataHandler(idUp) {
    event.preventDefault()
    const value1 = document.querySelector('.form-update-1')
    const value2 = document.querySelector('.form-update-2')

    if (!isValidForm(value1, value2)) {
        return
    }

    await updateData(idUp, value1.value, value2.value)
    setTimeout(() => {
        btnClosePopupBg.classList.remove('active')
        popup.classList.remove('active')
    }, 300)
    cleanForm(value1, value2)
    overwritingPosts()
}


export function openModalHandler(idUp, value1, value2) {
    btnClosePopupBg.classList.add('active')
    popup.classList.add('active')
    document.querySelector('.form-update-1').value = value1
    document.querySelector('.form-update-2').value = value2
    btnUpdateDate.onclick = () => updateDataHandler(idUp)
}

function closeModalHandlerCross(event) {
    btnClosePopupBg.classList.remove('active')
    popup.classList.remove('active')
}
function closeModalHandlerBg(event) {
    if (event.target.className === "popup__bg active") {
        btnClosePopupBg.classList.remove('active')
        popup.classList.remove('active')
    }
}




export async function renderAllTasks(posts) {
    if (posts.length === 0) {
        return
    }
    Object.values(posts).forEach((post) => {
        createDomElements(post)
    })
}




