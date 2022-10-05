import {openModalHandler} from '../frontend.js'
import {deletePost} from './endpoint.js'



export async function createDomElements({ _id, taskName, taskValue }) {
    const divCartBody = document.querySelector('#one')

    const div = document.createElement('div')
    div.classList.add('card-body')
    div.setAttribute('data-id', _id)
    div.style = "border: thin solid black"
    divCartBody.prepend(div)

    const h5 = document.createElement('h5')
    h5.classList.add('card-title')
    h5.textContent = taskName

    const p = document.createElement('p')
    p.classList.add('card-text')
    p.textContent = taskValue


    const btnEdit = document.createElement('button')
    btnEdit.classList.add('btn2', 'btn-primary')
    btnEdit.textContent = 'Изменить'
    btnEdit.onclick = () => openModalHandler(div.dataset.id, taskName, taskValue)


    const btnDelete = document.createElement('button')
    btnDelete.classList.add('btn3', 'btn-danger')
    btnDelete.textContent = 'Удалить'
    btnDelete.onclick = () => deletePost(div.dataset.id)


    div.appendChild(h5)
    div.appendChild(p)
    div.appendChild(btnEdit)
    div.appendChild(btnDelete)
}