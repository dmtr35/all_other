import {renderAllTasks} from '../frontend.js'
import {getPosts} from './endpoint.js'




export async function overwritingPosts() {
    const y = window.pageYOffset

    document.querySelector('.card').innerHTML = ''
    const posts = await getPosts()
    renderAllTasks(posts);

    window.scrollTo(0, y)
}










