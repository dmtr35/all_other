export function cleanForm(...fields) {
    fields.forEach((field) => {
        field.value = ''
    })
}