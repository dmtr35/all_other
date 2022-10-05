




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




