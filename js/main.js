'use stirct'

function onInit(){
    renderGallery()
}

function renderGallery(){
    const images = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg']
    var strHTML = images.map(image => ` <img class="image-preview" id = ${image} onclick="onCanvas(this)" src="meme-imgs (square)/${image}">`)
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function onCanvas(image) {
    document.querySelector('.image-gallery').style.display = "none"
    document.querySelector('.canvas-container').style.display = "flex"
    canvas(image)
}

function onClear() {
    document.querySelector('.text-input').value = ''
    clear()
}

function onDownload(elLink) {
    const data = gElCanvas.toDataURL('image.img')
    elLink.href = data
}
