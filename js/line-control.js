'use strict'

function isLineClicked(clickedPos) {
    console.log(clickedPos)
    var clickedLine = gLines.find(line => line.distance + 10 > clickedPos.y && line.distance - 10 < clickedPos.y)
    return clickedLine
}   
