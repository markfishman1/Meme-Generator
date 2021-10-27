'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMemes();
    renderControlBox();
    // resizeCanvas()
    addListeners();
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

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
    document.getElementById('txt').addEventListener('input', getImputTxt);
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}
function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove')
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup')
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove')
    // gElCanvas.addEventListener('touchstart')
    // gElCanvas.addEventListener('touchend')
}
//Event Listener Functions:
function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function renderControlBox() {
    var strHTML = `   <input type="text" id="txt" placeholder="${gMeme.lines[0].txt}" class="line-input">
    <button class="switch-btn">switch lines</button>
    <button class="add-btn">ADD LINE</button>
    <button class="delete-btn">delete Line</button>`
    document.querySelector('.control-box').innerHTML = strHTML;
}

function getImputTxt() {

    renderCanvas();
    var txt = document.querySelector('#txt').value;
    gTextLength = txt.length
    gMeme.lines[gSelectedLine].txt = txt;
    var currMemeTxt = gMeme.lines[gSelectedLine].txt
    onDrawText(currMemeTxt, 100, 100, 40);
    console.log(gTextLength);
}

function renderCanvas() {
    drawImg(gCurrMemeId);
}

function onDrawText(text, x, y, size) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px Impcat`
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function editPicture(count) {
    gCurrMemeId = count;
    gMeme.selectedImgId = count;
    hideGallery();
    drawImg(count);
    changeFont()
    onDrawText(gMeme.lines[0].txt, 100, 100, gMeme.lines[0].size)

}

function changeFont() {
    console.log('hello');
    var elContainer = document.getElementById('editor-container');
    elContainer.classList.add('impact');
}

function drawImg(count) {
    var img = new Image();
    img.src = `imgs-square/${count}.jpg`
    // img.onload = () => {
    //     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    // };
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function hideGallery() {
    document.querySelector('.main-content').style.display = 'none';
}
