'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');

    // resizeCanvas()

}
function onDrawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = 'black';
    gCtx.font = '40px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function editPicture(count) {
    hideGallery();
    drawImg(count);
}

function drawImg(count) {
    var img = new Image();
    img.src = `imgs-square/${count}.jpg`
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function hideGallery() {
    document.querySelector('.main-content').style.display = 'none';
}