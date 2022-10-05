





export function isValidForm(...fields) {
    let valid = true
    fields.forEach((field) => {
        if (!field.value) {
            valid = false
        }
    })
    return valid
}

















