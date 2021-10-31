'use strict'
//SERVICE MAIN-CONTROLLER
var gStartPos;
var gRowsCount = 0;
var gMemeId = 1;
var gCurrMemeId;
var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = [
    { id: gMemeId++, url: 'imgs-square/1.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/2.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/3.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/4.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/5.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/6.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/7.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/8.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/9.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/10.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/11.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/12.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/13.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/14.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/15.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/16.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/17.jpg', keywords: ['politics'] },
    { id: gMemeId++, url: 'imgs-square/18.jpg', keywords: ['politics'] },
];
var gMeme = { selectedImgId: 5, selectedLineIdx: 0, lines: [] };
// var gLineFramePos = [
//     {
//         x: gMeme.lines[0].posX,
//         y: gMeme.lines[0].posY - gMeme.lines[0].size,
//         height: gMeme.lines[0].size + 15,
//     },
//     {
//         x: gMeme.lines[1].posX,
//         y: gMeme.lines[1].posY - gMeme.lines[1].size,
//         height: gMeme.lines[1].size + 15,
//     }
// ]
//controller

function getImgs() {
    return gImgs;
}

function getCurrMemeId() {
    return gCurrMemeId;
}

//CONTROLLER
function isTextClicked(clickedPos) {
    // console.log(clickedPos);
    var isClicked = gMeme.lines.map(function (line, idx) {
        if (clickedPos.x >= line.posX && clickedPos.x <= line.posX + line.txtLength && clickedPos.y >= line.posY - line.size && clickedPos.y <= line.posY) {
            console.log('ON TEXT');
            gMeme.selectedLineIdx = idx
            setInputValue();
            markText();
            setSelectedToTrue(idx);
            return true
        } else return false
    })
    console.log('isClicked', isClicked);
    return isClicked;

}

function setSelectedToTrue(idx) {
    gMeme.lines[idx].isSelected = true;
}


function checkClickOutOfRange(clickedPos) {
    //CAN BE GMEME.SELECTEDLINEIDX -1 
    var selectedLine = gMeme.lines.find(line => {
        if (line.isSelected === true) return line;
    })
    if (selectedLine) {
        console.log('selectedLine', selectedLine);
        var linePosX = selectedLine.posX;
        var linePosY = selectedLine.posY;
        var lineLength = selectedLine.txtLength;
        var lineFieldY = 10 + selectedLine.size
        if (clickedPos.x < linePosX || clickedPos.x > linePosX + lineLength && clickedPos.y < linePosY || clickedPos.y > lineFieldY) {
            console.log('unMARKED');
            renderCanvas();
            renderText();
        }
    }
}

function updateTextLengths(length, idx) {
    gMeme.lines[idx]['txtLength'] = length;
    console.log(gMeme.lines[idx].txtLength);
}

function saveText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}
function getMeme() {
    return gMeme;
}

function addLine() {
    if (gMeme.lines.length < 1) {
        var posY = 100;
        _createLine(posY);

    } else if (gMeme.lines.length < 2 /* אפשר להוסיף תנאי  gMeme.lines[0].posY===100*/) {
        var posY = 450;
        _createLine(posY);

    } else if (gMeme.lines.length < 3) {
        var posY = 175;
        _createLine(posY);
    }
}
function _createLine(posY) {
    gMeme.lines.push({ txt: 'Add Text Here:', font: 'impact', size: 40, align: 'left', fill: 'white', stroke: 'black', posX: 50, posY: posY });
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    console.log(gMeme.selectedLineIdx);
    setInputValue();
}

function switchLines() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    setInputValue();
    renderCanvas();
    renderText();
    markText();
}

function setInputValue() {
    //input[name='txt'];
    console.log(gMeme.lines[gMeme.selectedLineIdx].txt);
    document.querySelector('#txt').value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function onMoveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].posX += dx;
    gMeme.lines[gMeme.selectedLineIdx].posY += dy;
}


//EDIT BOX FUNCTIONS:

function changeTextSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val;

}

function changeTxtColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color;
}
function changeStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor;
}

function alignText(val, width, middle) {
    switch (val) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].posX = 5;
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].posX = width - 5 - gMeme.lines[gMeme.selectedLineIdx].txtLength;
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].posX = middle - (gMeme.lines[gMeme.selectedLineIdx].txtLength / 2);
            break;
    }
}
function moveLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].posY += val;
}

function deleteLine() {
    var nextSelected = gMeme.selectedLineIdx - 1
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gRowsCount--;
    gMeme.selectedLineIdx = nextSelected;
    console.log(gMeme.lines);
}

function changeFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val;
}
function setTextDrag(isDrag) {
    // if (gMeme.lines[gMeme.selectedLineIdx]['isDrag']) {
    //     gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
    // } else gMeme.lines[gMeme.selectedLineIdx]['isDrag'] = isDrag;
    // console.log(gMeme.lines[gMeme.selectedLineIdx].isDrag);
}

