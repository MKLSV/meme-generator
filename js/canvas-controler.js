'use strict'

let gElCanvas
let gCtx
let gImgId
let elImg



function canvas(image) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImage(image)
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

function onClear() {
    // drawImage(gImgId)
    draw()
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
function setText(val) {
    onClear()
    drawText(val)
}
function drawText(val) {
    // const { offsetX, offsetY } = ev
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = "40px arial";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(val, (gElCanvas.width / 2) - (val.length), 20, gElCanvas.width - 20) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(val, (gElCanvas.width / 2) - (val.length), 20, gElCanvas.width - 20) // Draws (strokes) a given text at the given (x, y) position.
}

function newLine() {
    // drawRext(x,y)
}
// function drawRect(){
gCtx.beginPath()
//     gCtx.fillStyle = 'rgba(8, 8, 8, 0.171)'
//     gCtx.fillRect(20, 20, 510, 60)
//     gCtx.strokeStyle = 'white'
//     gCtx.strokeRect(20, 20, 510, 60)
// }
function onDownload(elLink) {
    const data = gElCanvas.toDataURL('image.img')
    elLink.href = data
}

function resizeCanvas() {
    // const elContainer = document.querySelector('.control-box')
    const elPanel = document.querySelector('.canvaspanel')
    gElCanvas.width = elContainer.offsetWidth - 540
    gElCanvas.height = elContainer.offsetHeight - 170
}
