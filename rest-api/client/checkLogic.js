




export function isValidForm(...fields) {
    console.log(fields)
    let valid = true
    fields.forEach(field => {
        console.log(field)
        if (!field.value || field.value.length < 4) {
            console.log(field)
            field.setAttribute('required', 'required')
            setTimeout(() => {
                field.removeAttribute('required')
            }, 2000)
            valid = false
        }
    })
    return valid
}






// export function checkInputUpdate(value1, value2) {
//     if (value1 === '' && value2 === '') {
//         const value1 = document.querySelector('.label__text_name')
//         const value2 = document.querySelector('.label__text_value')
//         value1.classList.add('red1')
//         value2.classList.add('red2')
//         setTimeout(() => {
//             value1.classList.remove('red1')
//             value2.classList.remove('red2')
//         }, 1500)
//         return false
//     }
//     if (value1 === '') {
//         const value1 = document.querySelector('.label__text_name')
//         value1.classList.add('red1')
//         setTimeout(() => {
//             value1.classList.remove('red1')
//         }, 1500)
//         return false
//     }
//     if (value2 === '') {
//         const value2 = document.querySelector('.label__text_value')
//         value2.classList.add('red2')
//         setTimeout(() => {
//             value2.classList.remove('red2')
//         }, 1500)
//         return false
//     }
//     return true
// }



