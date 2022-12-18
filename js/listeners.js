'use strict'

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}
function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log(pos)
    var line = isLineClicked(pos)
    console.log(line)
    if (!line) return
    gLine = line
    document.querySelector('.text-input').value = gLine.text
    setLineDrag(true)
    //Save the pos we start from
    line.direction = pos
    document.body.style.cursor = 'grabbing'
}
function onMove(ev) {
    if (!gLine.isDrag) return
    const pos = getEvPos(ev)
    var newPos = pos.y + gLine.direction
    gLine.direction = newPos
    console.log(gLine.direction)
    console.log(gLine)
    renderText()
    // moveLine(dy)

}
function moveLine(dy) {
    gLine.direction += dy
    console.log(gLine.direction)
}
function onUp() {

}
function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev

    // if (TOUCH_EVS.includes(ev.type)) {
    //     console.log('ev:', ev)
    //     //soo we will not trigger the mouse ev
    //     ev.preventDefault()
    //     //Gets the first touch point
    //     ev = ev.changedTouches[0]
    //     //Calc the right pos according to the touch screen
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    //     }
    // }
    return pos
}
