import {fetchUsers} from './utils.js'
const title = document.querySelector('.title')
const content = document.querySelector('.content')
const button = document. querySelector('.btn')
const select = document. querySelector('.select')

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

let post = null
window.onload = async() => {
    post = await fetchPost(params.post)
    await fetchUsers()
    insertPost()

}


button.onclick = () => updatePost(params.post)

function findPostAuthor() {
    const allAuthors = document.querySelectorAll('.alloption')
    const authorArray = Array.from(allAuthors)
    const selectedAuthorIndex = authorArray.findIndex(option => post.author._id === option.value)

    return {
        authorArray,
        selectedAuthor: authorArray[selectedAuthorIndex]
    }
}

function findSelectedAuthor() {
    const allAuthors = document.querySelectorAll('.alloption')
    const authorArray = Array.from(allAuthors)
    const selectedAuthorIndex = authorArray.findIndex(option => option.selected)
    return authorArray[selectedAuthorIndex]
}

async function fetchPost (id) {
    
    const response = await fetch(`http://localhost:5000/api/posts/${id}`)
    const post = await response.json()
    return post
    
}

function insertPost () {
    const {selectedAuthor, authorArray} = findPostAuthor()
    title.value = post.title
    content.value = post.content
    authorArray[0].selected = false
    selectedAuthor.selected = true
}

async function updatePost(id) {
    const selectedAuthor = findSelectedAuthor()
    
    await fetch(`http://localhost:5000/api/posts/${id}/update`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: title.value,
        content: content.value,
        author: selectedAuthor.value
    })
})

post = await fetchPost(id)
insertPost()
}

















