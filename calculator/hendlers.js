export function clearHendler() {
    document.querySelector('#screen').innerHTML = ''
}


export function oneHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 1
    console.log('1');
    // return 1
}
export function otwoneHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 2
    console.log('2');
    return 2
}
export function threeHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 3
    console.log('3');
}
export function fourHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 4
    console.log('4');
}
export function fiveHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 5
    console.log('5');
}
export function sixHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 6
    console.log('6');
}
export function sevenHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 7
    console.log('7');
}
export function eightHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 8
    console.log('8');
}
export function nineHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 9
    console.log('9');
}
export function null_0Hendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += 0
    console.log('0');
}


export function plusHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += '+'
    console.log('+');
}
export function minusHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += '-'
    console.log('-');
}
export function multiplyHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += '*'
    console.log('*');
}
export function divisionHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += '/'
    console.log('/');
}


export function dotHendler() {
    const q = document.querySelector('#screen')
    q.innerHTML += '.'
    console.log('.');
}



export function equalsHendler() {
    const q = document.querySelector('#screen').innerHTML
    const rezult = eval(q)
    console.log(rezult);
    document.querySelector('#screen').innerHTML = ''
    document.querySelector('#screen').innerHTML = rezult
}



















