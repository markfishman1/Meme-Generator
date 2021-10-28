'use strict'
var gStartPos;
var gRowsCount = 0;
var gMemeId = 1;
var gCurrMemeId;
var gSelectedLine = 0;
var gSecondLine = 1;
var gMarkedLine;
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
var gMeme = { selectedImgId: 5, selectedLineIdx: 0, lines: [{ txt: 'Lets make MEMES!', size: 40, align: 'left', fill: 'white', stroke: 'black', posX: 100, posY: 100 }, { txt: '', size: 40, align: 'left', fill: 'white', stroke: 'black', posX: 100, posY: 450 }] };

var gLines;
var gFirstLineTxtLength;
var gSecondLineTxtLength = 16;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function getImgs() {
    return gImgs;
}
function getCurrMemeId() {
    return gCurrMemeId;
}

function isTextClicked(clickedPos) {
    console.log(clickedPos);
    // console.log(clickedPos);
    var firstTextSize = gMeme.lines[0].size;
    const firstLinePosX = gMeme.lines[0].posX;
    const firstLinePosY = gMeme.lines[0].posY;
    const firstTextLength = gMeme.lines[0].txtLength;
    const firstLineFieldX = firstTextLength;
    const firstLineFiledY = firstLinePosY - firstTextSize;

    var secondTextSize = gMeme.lines[1].size;
    const secondLinePosX = gMeme.lines[1].posX;
    const secondLinePosY = gMeme.lines[1].posY;
    const secondTextLength = gMeme.lines[1].txtLength;
    const secondLineFieldX = secondTextLength;
    const secondLineFiledY = secondLinePosY - secondTextSize;

    if (clickedPos.x < firstLineFieldX && clickedPos.x >= firstLinePosX && clickedPos.y >= firstLineFiledY && clickedPos.y <= firstLinePosY) {
        console.log('ON TEXT');
        gSelectedLine = 0;
        gMarkedLine = 0;
        gSecondLine = 1;
        console.log(gSelectedLine);
        setSelectedToTrue(gSelectedLine);
        drawRect(firstLinePosX, firstLinePosY - firstTextSize, firstLineFieldX, firstLineFiledY);
        // document.getElementsByName('input')[0].placeholder == gMeme.lines[gSelectedLine].txt;
        return true;
    } else if (clickedPos.x < secondLineFieldX && clickedPos.x >= secondLinePosX && clickedPos.y >= secondLineFiledY && clickedPos.y <= secondLinePosY) {
        console.log('ON SECOND TEXT');
        gSelectedLine = 1;
        gMarkedLine = 1;
        gSecondLine = 0;
        console.log(gSelectedLine);
        setSelectedToTrue(gSelectedLine);
        drawRect(secondLinePosX, secondLinePosY - secondTextSize, secondLineFieldX, secondTextSize)
        // document.getElementsByName('input')[0].placeholder == gMeme.lines[gSelectedLine].txt;
        return true
    }
    else {
        return false;
    }
}
function setSelectedToTrue(idx) {
    gMeme.lines[idx].isSelected = true;
    console.log(gMeme);
}
function checkClickOutOfRange(clickedPos) {
    var selectedLine = gMeme.lines.find(line => {
        if (line.isSelected === true) return line;
    })
    if (selectedLine) {
        console.log('SELECTED LINE');
        var linePosX = selectedLine.posX;
        var linePosY = selectedLine.posY;
        var lineLength = selectedLine.txtLength;
        var lineFieldY = linePosY + selectedLine.size
        if (clickedPos.x < linePosX || clickedPos.x > linePosX + lineLength && clickedPos.y < linePosY || clickedPos.y > lineFieldY) {
            console.log('unMARKED');
            gMeme.lines[gMarkedLine].isSelected = false;
        }
        // (clickedPos.x < firstLineFieldX && clickedPos.x >= firstLinePosX && clickedPos.y >= firstLineFiledY && clickedPos.y <= firstLinePosY)

    }
    console.log(selectedLine);
}

function updateTextLengths(length, idx) {
    gMeme.lines[idx]['txtLength'] = length;
    // console.log(length, idx);
    // console.log('gMeme', gMeme);
}

function saveText(txt) {
    gMeme.lines[gSelectedLine].txt = txt;

}
function getLines() {
    return {
        selected: gSelectedLine,
        second: gSecondLine
    }
}

function getgMeme() {
    return gMeme;
}

function addLine() {
    if (gRowsCount < 1) {
        gRowsCount++
        console.log('gRowsCount', gRowsCount);
        onDrawText(gMeme.lines[0].txt, 100, 100, gMeme.lines[0].size, 'white', 'black', 'left', 0);
    } else if (gRowsCount < 2) {
        gMeme.lines[1].txt = 'Lets make memes vol. 2'
        onDrawText(gMeme.lines[1].txt, 100, 450, gMeme.lines[1].size, 'white', 'black', 'left', 1);
        gRowsCount++;
        console.log('gRowsCount', gRowsCount);

    }
}

function switchLines() {
    if (gSelectedLine === 1) {
        gSelectedLine = 0;
        gSecondLine = 1;
        setImputValue()

    } else {
        gSelectedLine = 1;
        gSecondLine = 0
        setImputValue()
    }
    // console.log('gSelectedLine', gSelectedLine);
    // console.log('gSecondLine', gSecondLine);
}

function setImputValue() {
    document.querySelector('#txt').value = gMeme.lines[gSelectedLine].txt;
}



//EDIT BOX FUNCTIONS:
function increaseSize() {
    gMeme.lines[gSelectedLine].size += 1;
}
function decreaseSize() {
    gMeme.lines[gSelectedLine].size -= 1;
}
function changeTxtColor(color) {
    gMeme.lines[gSelectedLine].fill = color;
}
function changeStrokeColor(strokeColor) {
    gMeme.lines[gSelectedLine].stroke = strokeColor;
}
function alignTxtleft() {
    gMeme.lines[gSelectedLine].align = 'left';
}
function alignTxtRight() {
    gMeme.lines[gSelectedLine].align = 'right';
}
function alignTxtCenter() {
    gMeme.lines[gSelectedLine].align = 'center';
}


function setTextDrag(isDrag) {
    //לעשות משתנה של שורה נוכחית שנבחרה ולהוסיף לגי מימ קיי של איז דראג

}

