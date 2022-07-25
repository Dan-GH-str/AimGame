const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeInput = timeList.querySelector('input')
const board = document.querySelector('#board')
const $time = document.querySelector('#time')
const colors = ['#58c34c', '#de9424', '#e33a32', '#3dcba4', '#3d70cc', '#6d1db8', '#e234cc', '#e1e4c2']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

// Обработка input
timeList.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const span = timeInput.nextElementSibling
        if (parseInt(timeInput.value) > 60 || parseInt(timeInput.value) < 0) {
            show(span)
        } else {
            hide(span)
            time = parseInt(timeInput.value)
            screens[1].classList.add('up')
            startGame()
        }
    }
})

function show(el) {
    el.classList.remove('hide')
    el.classList.add('show')
}

function hide(el) {
    el.classList.remove('show')
    el.classList.add('hide')
}

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn') && event.target.nodeName != 'INPUT') {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(time) {
    $time.innerHTML = time === 60 ? `01:00` : `00:${time}`
}

function finishGame() {
    $time.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const {height, width} = board.getBoundingClientRect()
    const color = getRandomColor()
    const size = getRamdomNumber(10, 60)
    const x = getRamdomNumber(0, width - size)
    const y = getRamdomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.background = `${color}`
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    circle.style.height = `${size}px`
    circle.style.width = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomColor() {
    const i = Math.floor(Math.random() * colors.length)     // От 0 до какого-либо числа(невключительно)
    return colors[i]
}

function getRamdomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}