'use strict'

let gElCanvas
let gCtx
let gIdx = 1
let gId
let gImgId
let elImg
let firstLine = true
let secondLine = true
let gLines = []
let gLine



function canvas(image) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    createLine()
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

function increaseFont() {
    gLine.fontSize++
    setText(gLine.text)
}
function decreaseFont() {
    gLine.fontSize--
    setText(gLine.text)

}
function createLine() {
    gLines.push({
        id: gIdx++,
        text: '',
        fontSize: 40,
        textAlign: 'center',
        baseLine: 'middle',
        isDrag: false,
        direction: 30,
        stroke: 'black',
        color: 'white',
    })
    gLine = gLines[gLines.length - 1]
    console.log(gLines)
    console.log(gLine)
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
    gLine.text = val
    renderText()
    drawText()
}
function renderText() {
    clear()
    if (gLines) {
        gLines.map(line => drawText(line))
    }
}
function drawText(line = gLine) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gLine.stroke
    gCtx.fillStyle = gLine.color
    gCtx.font = `bold ${gLine.fontSize}px arial`;
    gCtx.textAlign = line.textAlign
    gCtx.textBaseline = line.baseLine

    if (line.id === 1 || !(gLines.some(line => line.id === 1))) {
        line.id = 1
        line.direction = 30
    }
    else if (line.id === 2 || !(gLines.some(line => line.id === 2))) {
        line.direction = gElCanvas.height - 30
        line.id = 2
    }
    else (line.direction = gElCanvas.height / 2)
    gCtx.fillText(line.text, (gElCanvas.width / 2) - (line.text.length), line.direction, gElCanvas.width - 20) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.text, (gElCanvas.width / 2) - (line.text.length), line.direction, gElCanvas.width - 20) // Draws (strokes) a given text at the given (x, y) position.
}

function newLine() {
    document.querySelector('.text-input').value = ''
    createLine()
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


function pervLine() {
    if (gLine.id === 1) return
    gLine = gLines.find(line => line.id === gLine.id - 1)
    document.querySelector('.text-input').value = gLine.text
}
function nextLine() {
    if (gLine.id === gLines.length) return
    gLine = gLines.find(line => line.id === gLine.id + 1)
    document.querySelector('.text-input').value = gLine.text
}

function deleteLine() {
    const index = gLines.findIndex(line => line === gLine)
    gLines.splice(index, 1)
    gLine = gLines[index - 1]
    if (gLine) document.querySelector('.text-input').value = gLine.text
    else {
        document.querySelector('.text-input').value = ''
        createLine()
    }
    renderText()
}

function switchBetween() {
    // console.log(gLines[0].direction)
    // var first = gLines[0].direction
    // var second = gLines[gLines.length-1].direction
    // gLines[0].direction = second
    // gLines[gLines.length-1].direction = first

    var first = gLines[0].text
    var second = gLines[gLines.length - 1].text
    gLines[0].text = second
    gLines[gLines.length - 1].text = first

    // [gLines[0].direction,gLines[gLines.length-1].direction] = [gLines[gLines.length-1].direction,gLines[0].direction] 
    // console.log(gLines)
    // console.log(gLines[0].direction)
    renderText()
}

function setAlign(direction) {
    gLine.textAlign = direction
    renderText()
}

function setColor(val,sel){
    if(sel === 'font') gLine.color = val
    else ( gLine.stroke = val)
    renderText()
}