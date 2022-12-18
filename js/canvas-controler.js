'use strict'

let gElCanvas
let gCtx
let gIdx = 1
let gImgId
let elImg
let gLines = []
let gLine
let KEYW = 'MYMEMES'


function canvas(image) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    createLine()
    drawImage(image)
    // addListeners()
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}


function createLine() {
    var id
    if (!gLines.some(line => line.id === 1)) id = 1
    else if(!(gLines.some(line => line.id === 2))) id = 2
    else id = gIdx ++
    if(gIdx === 1) gIdx++
    if(gIdx === 2) gIdx++

    gLines.push({
        id: id,
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

    if (line.id === 1) {
        line.id = 1
        line.direction = 30
    }
    else if (line.id === 2) {
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
}

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
function increaseFont() {
    gLine.fontSize++
    renderText()
}
function decreaseFont() {
    gLine.fontSize--
    renderText()
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
    var second = gLines[1].text
    gLines[0].text = second
    gLines[1].text = first

    // [gLines[0].direction,gLines[gLines.length-1].direction] = [gLines[gLines.length-1].direction,gLines[0].direction] 
    // console.log(gLines)
    // console.log(gLines[0].direction)
    renderText()
}

function setAlign(direction) {
    gLine.textAlign = direction
    renderText()
}

function setColor(val, sel) {
    if (sel === 'font') gLine.color = val
    else (gLine.stroke = val)
    renderText()
}

function onSave() {
    gLines.push(gLine)
    saveToStorage(KEYW, { img: elImg, lines: gLines })
}