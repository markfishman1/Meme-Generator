'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMemes()

    // resizeCanvas()

}

function renderMemes() {
    var imgs = getImgs();
    var strHTML = imgs.map(img => {
        var str =
            `<card class="card">
            <img src="imgs-square/${img.id}.jpg" class="card" onclick="editPicture('${img.id}')">
            </card>`
        return str;
    })

    document.querySelector('.memes-container').innerHTML = strHTML.join('');
}

function renderControlBox(count) {
    var strHTML = `<input type="text" placeholder="${gMeme.lines[0].txt}" class="line-input">`
    document.querySelector('.control-box').innerHTML = strHTML;


}

function onDrawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function editPicture(count) {
    gMeme.selectedImgId = count;
    hideGallery();
    drawImg(count);
    renderControlBox(count);
    changeFont()
}

function changeFont() {
    console.log('hello');
    var elContainer = document.getElementById('editor-container');
    elContainer.classList.add('impact');
}

function drawImg(count) {
    var img = new Image();
    img.src = `imgs-square/${count}.jpg`
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function hideGallery() {
    document.querySelector('.main-content').style.display = 'none';
}