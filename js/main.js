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
    // document.body.style.cursor = 'grabbing'
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
    var strHTML = `      <input name="input" type="text" id="txt" placeholder="${gMeme.lines[0].txt}" class="line-input">
    <div class="line-generator flex justify-center">
        <button class="switch-btn" onclick="onSwitchLines()">switch lines</button>
        <button class="add-btn" onclick=onAddLine()>ADD LINE</button>
        <button class="delete-btn">delete Line</button>
    </div>
    <div class="line-editor-grid justify-center">
        <button onclick="onIncreaseSize()">A+</button>
        <button onclick="onDecreaseSize()">A-</button>
        <button onclick="onAlignTxtLeft()">L</button>
        <button onclick="onAlignTxtCenter()">C</button>
        <button onclick="onAlignTxtRight()">R</button>
        <select name="fonts" id="fonts">
            <option value="impact">Impcat</option>
            <option value="arial">Arial</option>
        </select>
        <input type="color" id="fill" name="fill" value="#e66465" onchange="onChangeTxtColor(this)">
        <label for="fill"></label>
        <input type="color" id="stroke" name="stroke" value="#e66465" onchange="onChangeStrokeColor(this)">
        <label for="stroke"></label>
    </div>
        <div class="download-container flex justify-center">
        <button class="download-btn">Download</button>
        <button class="share-btn">Share</button>
    </div>
`
    document.querySelector('.control-box').innerHTML = strHTML;
}

function getImputTxt() {

    renderCanvas();

    var txt = document.querySelector('#txt').value;
    gFirstLineTxtLength = txt.length
    saveText(txt)
    var meme = getgMeme();
    var currLine = meme.lines[gSelectedLine]
    var secondLine = meme.lines[gSecondLine]
    onDrawText(currLine.txt, currLine.posX, currLine.posY, currLine.size, currLine.fill, currLine.stroke, currLine.align);
    onDrawText(secondLine.txt, secondLine.posX, secondLine.posY, secondLine.size, secondLine.fill, secondLine.stroke, secondLine.align);
    // }
    console.log(gFirstLineTxtLength);
}

function renderCanvas() {
    var currMemeId = getCurrMemeId();
    drawImg(currMemeId);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function onDrawText(text, x, y, size = 40, fill = 'white', stroke = 'black', align) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.font = `${size}px impcat`
    gCtx.textAlign = align
    var txtLength = gCtx.measureText(text).width;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawSelectedFrame(x, y, width, height) {
    gCtx.beginPath();
    gCtx.lineWidth = 3;
    gCtx.rect(x, y, width, height);
    gCtx.fillStyle = 'rgba(225,225,225,0)';
    gCtx.fillRect(x, y, width, height);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function editPicture(count) {
    document.querySelector('.editor-container').style.display = 'flex';
    gCurrMemeId = count;
    gMeme.selectedImgId = count;
    // changeFont()
    hideGallery();
    drawImg(count);
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

function onAddLine() {
    console.log('hey');
    addLine();

}
function hideGallery() {
    document.querySelector('.main-content').style.display = 'none';
}

function showGallery() {
    document.querySelector('.main-content').style.display = 'flex';
    document.querySelector('.editor-container').style.display = 'none';
}

function onSwitchLines() {
    switchLines();
}

function onIncreaseSize() {
    increaseSize();
    getImputTxt();

}

function onDecreaseSize() {
    decreaseSize();
    getImputTxt();

}

function onChangeTxtColor(ev) {
    var color = ev.value;
    console.log(color);
    changeTxtColor(color);
    getImputTxt();
}
function onChangeStrokeColor(ev) {
    var strokeColor = ev.value;
    console.log(strokeColor);
    changeStrokeColor(strokeColor);
    getImputTxt();
}

function onAlignTxtLeft() {
    alignTxtleft();
    getImputTxt();

}
function onAlignTxtRight() {
    alignTxtRight();
    getImputTxt();

}
function onAlignTxtCenter() {
    alignTxtCenter();
    getImputTxt();
}
