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
    checkClickOutOfRange(pos)
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
    <button class="moveup-btn" onclick="onMoveLineUp()">Move Up Line</button>
    <button class="movedown-btn" onclick="onMoveLineDown()">Move Down Line</button>
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
        <select name="fonts" id="fonts" onchange="onSetFont(this.value)">
            <option value="impact">Impcat</option>
            <option value="arial">Arial</option>
        </select>
        <input type="color" id="fill" name="fill" value="#e66465" onchange="onChangeTxtColor(this)">
        <label for="fill"></label>
        <input type="color" id="stroke" name="stroke" value="#e66465" onchange="onChangeStrokeColor(this)">
        <label for="stroke"></label>
    </div>
        <div class="download-container flex justify-center">
        <a href="#" class="download-btn" onclick="downloadCanvas(this)" download="my-img.jpg">Download</a>
        <button class="upload-btn" onclick="uploadImg()">Upload</button>
        <a class="share-btn none" href="#" title="Share on Facebook" target="_blank">
        Share   
        </a>
    </div>
`
    {/* <button class="download-btn">Download</button> */ }
    document.querySelector('.control-box').innerHTML = strHTML;
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
function getImputTxt() {
    renderCanvas();
    var txt = document.querySelector('#txt').value;
    saveText(txt)
    renderText();
    markText();
}

function markText() {
    var lines = getLines()
    var selected = lines.selected;
    var second = lines.second;
    var framePos = getFramePos();
    drawRect(framePos[selected].x, framePos[selected].y, framePos[selected].width, framePos[selected].height);

}

function renderCanvas() {
    var currMemeId = getCurrMemeId();
    drawImg(currMemeId);
}
function renderText() {
    var lines = getLines()
    var selected = lines.selected;
    var second = lines.second;
    var meme = getgMeme();
    var currLine = meme.lines[selected]
    var secondLine = meme.lines[second]
    onDrawText(currLine.txt, meme.lines[selected].font, currLine.posX, currLine.posY, currLine.size, currLine.fill, currLine.stroke, currLine.align, lines.selected);
    onDrawText(secondLine.txt, meme.lines[second].font, secondLine.posX, secondLine.posY, secondLine.size, secondLine.fill, secondLine.stroke, secondLine.align, lines.second);
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

function onDrawText(text, font, x, y, size = 40, fill = 'white', stroke = 'black', align, idx,) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
    var txtLength = gCtx.measureText(text).width;
    console.log('txtLength', txtLength);
    updateTextLengths(txtLength, idx);
    // var meme = getgMeme();
    // console.log(meme);
    // drawRect(meme.lines[idx].posX, meme.lines[idx].posY - 40, txtLength, meme.lines[idx].size + 10);
}
function onMoveLineUp() {
    moveLineUp();
    renderCanvas();
    renderText();
    markText();
}
function onMoveLineDown() {
    moveLineDown();
    renderCanvas();
    renderText();
    markText();
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

function hideGallery() {
    document.querySelector('.main-content').style.display = 'none';
}

function showGallery() {
    document.querySelector('.main-content').style.display = 'flex';
    document.querySelector('.editor-container').style.display = 'none';
}


//CONTROL BOX BUTTONS FUNCTIONS:

function onAddLine() {
    console.log('hey');
    addLine();

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
    renderCanvas();
    renderText();
    markText();
    // getImputTxt();

}
function onAlignTxtRight() {
    var canvas = document.getElementById('my-canvas');
    var width = canvas.width;
    alignTxtRight(width);
    renderCanvas();
    renderText();
    markText();
    // getImputTxt();

}
function onAlignTxtCenter() {
    var canvas = document.getElementById('my-canvas');
    var width = canvas.width;
    alignTxtCenter(width / 2);
    renderCanvas();
    renderText();
    markText();
    // getImputTxt();
}
function onSetFont(val) {
    console.log(val);
    setFont(val);
    renderCanvas();
    renderText();
    markText();
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
