import login from './endpointsLog.js'
// import login from '../logic/endpoint.js'


const email = document.querySelector('.input-email')
const password = document.querySelector('.input-pass')
const btnSignIn = document.querySelector('.btn-sign-in')


// console.log(email.value);
// console.log(password.value);
btnSignIn.addEventListener('click', singIn)
// btnSignUpNow.addEventListener('click', btnSignUpNowHandler)

export async function singIn() {
    event.preventDefault()

    const userData = await login(email.value, password.value)
    console.log(userData);

    if (userData.message) {
        alert(userData.message)
        return
    }
    location.href = 'http://localhost:5501/client/index.html'
}










