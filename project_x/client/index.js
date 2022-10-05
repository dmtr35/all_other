const tableBody = document.querySelector('.table-body')
const container = document.querySelector('.container')


function redirectToEdit(id) {
    document.location.href = `http://127.0.0.1:5500/client/edit_post.html?post=${id}`
  }


async function fechPosts() {
    const response = await fetch("http://localhost:5000/api/posts")            // делаем запрос на сервер, вытаскиваем posts
    const posts = await response.json() 
                                       
    posts.forEach((post, index) => {                                           // 
        const template = `<tr>
                <th scope="row">${++index}</th>
                <td>${post.author.firstName} ${post.author.lastName}</td>
                <td>${post.title}</td>
                <td>${post.content}</td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="deletePosts('${post._id}')">delete</button>
                <button type="button" class="btn btn-warning btn-sm" onclick="redirectToEdit('${post._id}')">edit</button></td>
            </tr>`
        tableBody.innerHTML += template
        
    });
    
}

fechPosts()

async function deletePosts(id) {
    await fetch(`http://localhost:5000/api/posts/${id}/delete`, {
        method: 'DELETE'
    })
    tableBody.innerHTML = ""
    fechPosts()
}
















