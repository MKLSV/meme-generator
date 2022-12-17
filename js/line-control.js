'use strict'

function isLineClicked(clickedPos) {
    return gLines.find(line => line.direction > clickedPos.y - 10 && line.direction < clickedPos.y + 10)
}   
function setLineDrag(isDrag) {
    gLine.isDrag = isDrag
    console.log(gLines)
}