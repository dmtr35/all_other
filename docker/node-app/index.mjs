import fs from "fs"

fs.appendFile('my-file.txt', 'Файл создан node.js', (err) => {
    if (err) throw err
    console.log('Файл сохранен');
    
})


setTimeout (() => console.log('Конец'), 30000)