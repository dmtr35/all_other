import {isValidForm} from './logic/validForm.js'
import {cleanForm} from './logic/cleanForm.js'
import {overwritingPosts} from './logic/overwritingPosts.js'
import {createDomElements} from './logic/createDomElements.js'
import {createPost, updateData} from './logic/endpoint.js'


// import {login} from './login/endpointsLog'



(async () => {
    checkIfLogged()
    overwritingPosts()
})();

function checkIfLogged() {
    const data = JSON.parse(localStorage.getItem('accessToken'))
    if(!data) {
        // return location.href = 'http://127.0.0.1:5501/client/login/login.html'  
        // geter()
    }
    
    if(Date.now() > data.expiresIn) {
        return location.href = 'http://127.0.0.1:5501/client/login/login.html' 
        // geter()
        }
}


const btnCreate = document.querySelector('.btn')
console.log(btnCreate);

const btnClosePopupBg = document.querySelector('.popup__bg');
const popup = document.querySelector('.popup'); // Само окно
const btnCloseModal = document.querySelector('.close-popup'); // Кнопка для скрытия окна
const btnUpdateDate = document.querySelector('.btnUpdete')
const btnOut = document.querySelector('.btn-out')



btnCreate.addEventListener("click", btnCreateHandler)
btnCloseModal.addEventListener("click", closeModalHandlerCross)
btnClosePopupBg.addEventListener("click", closeModalHandlerBg)
btnOut.addEventListener('click', btnOutHandler)



async function btnCreateHandler() {
    event.preventDefault()
    const value1 = document.querySelector('.form-control-1')
    const value2 = document.querySelector('.form-control-2')
    const userData = JSON.parse(localStorage.getItem('accessToken'))
    
    if (!isValidForm(value1, value2)) {
        return
    }
    
    await createPost(value1.value, value2.value, userData.userId)
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

async function btnOutHandler() {
    const response = await fetch('http://localhost:5000/api/logout')
    console.log(response);
    
    localStorage.removeItem('accessToken')
}


export async function renderAllTasks(posts) {
    if (posts.length === 0) {
        return
    }
    Object.values(posts).forEach((post) => {
        createDomElements(post)
    })
}













// async function geter() {
//     const response = await fetch('http://localhost:5000/api/users')
//     console.log(response);
//     console.log(response.status);

//     if (response.status === 401) {
//         return refresh()
//     }
//     return
// }



// export async function refresh() {
//     const response = await fetch('http://localhost:5000/api/refresh')
//     console.log(response);
    
//     const userData = await response.json()
//     console.log(userData);
//     saveToken2(userData)
// }


// function saveToken2(userData) {
//     localStorage.setItem('accessToken', JSON.stringify(
//         {
//             accessToken: userData.accessToken,
//             expiresIn: userData.expiresIn
//         }))
// }