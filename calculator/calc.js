import { oneHendler, otwoneHendler, threeHendler, fourHendler, fiveHendler, sixHendler, sevenHendler, eightHendler, nineHendler, null_0Hendler, plusHendler, minusHendler, multiplyHendler, divisionHendler, equalsHendler, dotHendler, clearHendler } from './hendlers.js'
// import { oneHendler } from './hendlers.js'


const one = document.querySelector('#one')
const otwone = document.querySelector('#two')
const three = document.querySelector('#three')
const four = document.querySelector('#four')
const five = document.querySelector('#five')
const six = document.querySelector('#six')
const seven = document.querySelector('#seven')
const eight = document.querySelector('#eight')
const nine = document.querySelector('#nine')
const null_0 = document.querySelector('#null')

const plus = document.querySelector('#plus')
const minus = document.querySelector('#minus')
const multiply = document.querySelector('#multiply')
const division = document.querySelector('#division')

const equals = document.querySelector('#equals')
const dot = document.querySelector('#dot')
const clear = document.querySelector('#clear')
const screen = document.querySelector('#screen')


one.addEventListener('click', oneHendler)
otwone.addEventListener('click', otwoneHendler)
three.addEventListener('click', threeHendler)
four.addEventListener('click', fourHendler)
five.addEventListener('click', fiveHendler)
six.addEventListener('click', sixHendler)
seven.addEventListener('click', sevenHendler)
eight.addEventListener('click', eightHendler)
nine.addEventListener('click', nineHendler)
null_0.addEventListener('click', null_0Hendler)

plus.addEventListener('click', plusHendler)
minus.addEventListener('click', minusHendler)
multiply.addEventListener('click', multiplyHendler)
division.addEventListener('click', divisionHendler)

equals.addEventListener('click', equalsHendler)
dot.addEventListener('click', dotHendler)
clear.addEventListener('click', clearHendler)





// function sum(x, y) {
//     return x + y
// }


// console.log(sum(oneHendler(), otwoneHendler()))


// console.log(oneHendler());






















