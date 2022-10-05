const selectAuthor = document.querySelector('.select')


export async function fetchUsers() {
    const response = await fetch('http://localhost:5000/api/user')
    const users = await response.json()
    users.forEach( (user) => {
        const template = `<option class="alloption" value = '${user._id}'>${user.firstName} ${user.lastName}</option>`
        selectAuthor.innerHTML += template
    })
}