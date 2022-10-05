import {overwritingPosts} from './overwritingPosts.js'



export async function getPosts() {
    const response = await fetch('http://localhost:5000/get/')
    const posts = await response.json()
    return posts
}


export async function createPost(value1, value2) {
    await fetch('http://localhost:5000/create', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskName: value1,
            taskValue: value2
        })
    })
}


export async function deletePost(id) {
    await fetch(`http://localhost:5000/delete/${id}`, {
        method: 'delete'
    })
    // event.preventDefault()

    overwritingPosts()
}


export async function updateData(idUp, value1, value2) {
    await fetch('http://localhost:5000/update', {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: idUp,
            taskName: value1,
            taskValue: value2
        })
    })
    
}