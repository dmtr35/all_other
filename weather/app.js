const url = `http://api.openweathermap.org/data/2.5/weather?id=703448&appid=07703ece03a272c5157c826000f590ec`
async function weath() {
    const response = await fetch(url)
    const content = await response.json()
    console.log(content);

    document.querySelector('.package-name').textContent = content.name
    document.querySelector('.price').innerHTML = Math.round(content.main.temp - 273) + '&deg;'
    document.querySelector('.disclaimer').textContent = content.weather[0]['description']
    
    document.querySelector('.features li').innerHTML = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOsonZGKhInYEHlkDpUSAmLnhy-7Z9F5tU_g&usqp=CAU">`
}





weath()











