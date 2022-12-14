'use strict'

let gElCanvas
let gCtx


function canvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

function onClear() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSave(elLink) {
    const data = gElCanvas.toDataURL('image.img')
    elLink.href = data
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    const elPanel = document.querySelector('.canvaspanel')
    gElCanvas.width = elContainer.offsetWidth - 540
    gElCanvas.height = elContainer.offsetHeight - 170
}
