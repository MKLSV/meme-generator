'use strict'

let gElCanvas
let gCtx
let gIdx = 1
let gImgId
let elImg
let firstLine = true
let secondLine = true
let gLines = []
let gLine



function canvas(image) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gLine = createLine()
    drawImage(image)
    addListeners()
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}
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
    if (!isLineClicked(pos)) return

    setCircleDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}
function onMove(){
    
}
function onUp(){

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
function createLine() {
    return {
        id: gIdx++,
        text: '',
        fontSize: 40,
        textAlign: 'center',
        baseLine: 'middle',
        moved: false,
        direction: 30
    }
}
function drawImage(image) {
    gImgId = image
    elImg = new Image()
    elImg.src = `meme-imgs (square)/${image.id}`
    elImg.onload = () => {
        draw()
    }
}
function draw() {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
function clear() {
    draw()
}
function setText(val) {
    clear()
    renderText()
    gLine.text = val
    drawText()
}
function renderText() {
    if (gLines) {
        gLines.map(line => drawText(line))
    }
}
function drawText(line = gLine) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `bold ${gLine.fontSize}px arial`;
    gCtx.textAlign = line.textAlign
    gCtx.textBaseline = line.baseLine

    if (line.id === 1) line.direction = 30
    else if (line.id === 2) line.direction = gElCanvas.height - 30
    else (line.direction = gElCanvas.height / 2)
    gCtx.fillText(line.text, (gElCanvas.width / 2) - (line.text.length), line.direction, gElCanvas.width - 20) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.text, (gElCanvas.width / 2) - (line.text.length), line.direction, gElCanvas.width - 20) // Draws (strokes) a given text at the given (x, y) position.
}

function newLine() {
    gLines.push(gLine)
    document.querySelector('.text-input').value = ''
    gLine = createLine()
    drawText()
    // drawRext(x,y)
}
// function drawRect(){
// gCtx.beginPath()
//     gCtx.fillStyle = 'rgba(8, 8, 8, 0.171)'
//     gCtx.fillRect(20, 20, 510, 60)
//     gCtx.strokeStyle = 'white'
//     gCtx.strokeRect(20, 20, 510, 60)
// }

function resizeCanvas() {
    // const elContainer = document.querySelector('.control-box')
    const elPanel = document.querySelector('.canvaspanel')
    gElCanvas.width = elContainer.offsetWidth - 540
    gElCanvas.height = elContainer.offsetHeight - 170
}
