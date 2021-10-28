'use strict'
var gStartPos;
var gRowsCount = 0;
var gMemeId = 1;
var gCurrMemeId;
var gSelectedLine = 0;
var gSecondLine = 1;
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
var gMeme = { selectedImgId: 5, selectedLineIdx: 0, lines: [{ txt: 'Lets make MEMES!', size: 40, align: 'left', fill: 'white', stroke: 'black', posX: 100, posY: 100 }, { txt: 'Make one already', size: 40, align: 'left', fill: 'white', stroke: 'black', posX: 100, posY: 450 }] };

var gLines;
var gFirstLineTxtLength;
var gSecondLineTxtLength = 16;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function addLine() {
    // gMeme.lines.push()
}

function getImgs() {
    return gImgs;
}
function getCurrMemeId() {
    return gCurrMemeId;
}

function isTextClicked(clickedPos) {
    console.log(clickedPos);
    const textSize = gMeme.lines[0].size;

    const firstLinePosX = gMeme.lines[0].posX;
    const firstLinePosY = gMeme.lines[0].posY;
    const firstTextXLength = gFirstLineTxtLength * 25;
    const firstLineFieldX = firstTextXLength;
    const firstLineFiledY = firstLinePosY - textSize;


    const secondLinePosX = gMeme.lines[1].posX;
    const secondLinePosY = gMeme.lines[1].posY;
    const secondTextXLength = gSecondLineTxtLength * 20
    const secondLineFieldX = secondLinePosX + secondTextXLength;
    const secondLineFiledY = secondLinePosY - textSize;

    if (clickedPos.x < firstLineFieldX && clickedPos.x >= firstLinePosX && clickedPos.y >= firstLineFiledY && clickedPos.y <= firstLinePosY) {
        console.log('ON TEXT');
        gSelectedLine = 0;
        gSecondLine = 1;
        console.log(gSelectedLine);
        drawSelectedFrame(firstLinePosX - 20, firstLinePosY - textSize, firstLineFieldX - 50, firstLineFiledY);
        document.getElementsByName('input')[0].placeholder == gMeme.lines[gSelectedLine].txt;
        return true;
    } else if (clickedPos.x < secondLineFieldX && clickedPos.x >= secondLinePosX && clickedPos.y >= secondLineFiledY && clickedPos.y <= secondLinePosY) {
        console.log('ON SECOND TEXT');
        gSelectedLine = 1;
        gSecondLine = 0;
        drawSelectedFrame(secondLinePosX, secondLinePosY - textSize, secondLineFieldX, textSize)
        document.getElementsByName('input')[0].placeholder == gMeme.lines[gSelectedLine].txt;
        return true
    }
    else {
        return false;
    }
}

function saveText(txt) {
    gMeme.lines[gSelectedLine].txt = txt;

}

function getgMeme() {
    return gMeme;
}

function addLine() {
    if (gRowsCount < 1) {
        onDrawText(gMeme.lines[0].txt, 100, 100, gMeme.lines[0].size)
        gRowsCount++
    } else if (gRowsCount < 2) {
        onDrawText(gMeme.lines[1].txt, 100, 450, gMeme.lines[1].size)
        gRowsCount++;
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
    // gCircle.isDrag = isDrag;

}

