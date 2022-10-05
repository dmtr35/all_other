


export default async function login(email, password) {
    const response = await fetch('http://localhost:5000/api/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    console.log(response);
    
    const userData = await response.json()
    console.log(userData);
    
    saveToken(userData)
    return userData
}

export async function create(email, password) {
    const response = await fetch('http://localhost:5000/api/registration', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    console.log(response);
    const userDataReg = await response.json()
    console.log(userDataReg);
    
    return userDataReg
}





function saveToken(userData) {
    localStorage.setItem('accessToken', JSON.stringify(
        {
            accessToken: userData.accessToken,
            expiresIn: userData.expiresIn,
            userId: userData.user.id
            
        }))
}




