// const selectAuthor = document.querySelector('.select')
const button = document.querySelector('.btn')
const title = document.querySelector('.title')
const content = document.querySelector('.content')
button.onclick = createPost
const titleError = document.querySelector('.title-error')
const contentError = document.querySelector('.content-error')
const authorError = document.querySelector('.author-error')
import {fetchUsers} from './utils.js'
 

    

    function resetErrors (...fields) {
        fields.forEach(field => field.textContent = '')
    }

async function createPost() {

    resetErrors(titleError, contentError, authorError)
    let hasError = false

    const allAuthors = document.querySelectorAll('.alloption')
    const authorArray = Array.from(allAuthors)
    const selectedAuthor = authorArray.find((author) => author.selected === true)



if (title.value.length < 5) {
    titleError.textContent = `Title should be greater than 5 symbols`
    hasError = true
}
if (content.value.length < 5) {
    contentError.textContent = `Content should be greater than 5 symbols`
    hasError = true
}
if (allAuthors[0].selected) {
    authorError.textContent = 'Select author'
    hasError = true
}

if(hasError) {
    return
}
    
await fetch('http://localhost:5000/api/posts', {
        method: 'post',
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
    title.value = ''
    content.value = ''
    selectedAuthor.selected = false
    allAuthors[0].selected = true
}


fetchUsers()



















