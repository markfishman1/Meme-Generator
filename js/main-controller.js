'use strict'

//main-controller
var gElCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    // renderControlBox();
    // resizeCanvas()
    addListeners();
}

function renderGallery() {
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
    //oninput attribute
    document.getElementById('txt').addEventListener('input', getInputTxt);
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchend', onUp)
}
//Event Listener Functions:
function onDown(ev) {
    const pos = getEvPos(ev)
    checkClickOutOfRange(pos)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    // document.body.style.cursor = 'grabbing';
}
function onUp() {
    setTextDrag(false);
    // document.body.style.cursor = 'pointer';

}

function onMove() {
    // console.log('hey');
    // var meme = getMeme();
    // if (meme.lines[meme.selectedLineIdx].isDrag) {
    //     const pos = getEvPos();
    //     const dx = pos.x - gStartPos.x
    //     const dy = pos.y - gStartPos.y
    //     gStartPos = pos;
    //     onMoveText(dx, dy);
    //     renderCanvas();
    // }

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

function drawRect(x, y, width, height) {
    gCtx.beginPath();
    gCtx.lineWidth = 3;
    gCtx.rect(x, y, width, height);
    gCtx.fillStyle = 'rgba(225,225,225,0)';
    gCtx.fillRect(x, y, width, height);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    // console.log(x, y, width, height);
}
function getInputTxt() {
    var txt = document.querySelector('#txt').value;
    saveText(txt)
    renderCanvas();

}

function markText() {
    var meme = getMeme();
    var selectedLine = meme.selectedLineIdx;
    drawRect(gMeme.lines[selectedLine].posX - 5, gMeme.lines[selectedLine].posY - gMeme.lines[selectedLine].size, gMeme.lines[selectedLine].txtLength + 10, gMeme.lines[selectedLine].size + 15);
}

function renderCanvas() {
    var currMemeId = getCurrMemeId();
    drawImg(currMemeId);
    renderText();
    markText();
}

function renderText() {
    var meme = getMeme();
    meme.lines.forEach(function (line, idx) {
        onDrawText(line.txt, line.font, line.posX, line.posY, line.size, line.fill, line.stroke, line.align, idx)
    })

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

function onDrawText(text, font, x, y, size = 40, fill = 'white', stroke = 'black', align, idx) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
    console.log('text', text);
    console.log(idx);
    var txtLength = gCtx.measureText(text).width;
    console.log('txtLength', txtLength);
    updateTextLengths(txtLength, idx);
}



//onSelectImg
function editPicture(selectedImgId) {
    document.querySelector('.editor-container').style.display = 'flex';
    gCurrMemeId = selectedImgId;
    gMeme.selectedImgId = selectedImgId;
    hideGallery();
    drawImg(selectedImgId);
}

function changeFont() {
    //לשנות את הFONT במודל נתונים ולרנדר את הקנבאס
    console.log('hello');
    var elContainer = document.getElementById('editor-container');
    elContainer.classList.add('impact');
}

function drawImg(count) {
    var img = new Image();
    img.src = `imgs-square/${count}.jpg`
    // img.onload = () => {
    //     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    //     renderCanvas();
    //     renderText();
    //     markText();
    // };
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function hideGallery() {
    document.querySelector('.main-content').style.display = 'none';
}

function showGallery() {
    document.querySelector('.main-content').style.display = 'flex';
    document.querySelector('.editor-container').style.display = 'none';
}


//CONTROL BOX BUTTONS FUNCTIONS:
//לשלב בין הפונקציות
function onMoveLine(val) {
    moveLine(val);
    renderCanvas();
}

function onAddLine() {
    console.log('hey');
    addLine();
    renderText();

}
function onSwitchLines() {
    switchLines();
}
//COMBINE TO ONE FUNCTION
function onChangeTextSize(val) {
    changeTextSize(val);
    renderCanvas();
}

function onChangeTxtColor(ev) {
    var color = ev.value;
    console.log(color);
    changeTxtColor(color);
    renderCanvas();

}

function onChangeStrokeColor(ev) {
    var strokeColor = ev.value;
    console.log(strokeColor);
    changeStrokeColor(strokeColor);
    renderCanvas();
}

function onAlignText(val) {
    var canvas = document.getElementById('my-canvas');
    var width = canvas.width;
    alignText(val, width, width / 2);
    renderCanvas();
}

function onChangeFont(val) {
    console.log(val);
    changeFont(val);
    renderCanvas();
}

function onDeleteLine() {
    console.log('hey');
    deleteLine();
    renderCanvas();
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    console.log(data);
    elLink.href = data;
    elLink.download = 'meme'
}

function toggleMenu() {
    console.log('hey');

    document.body.classList.toggle('menu-open');
}
