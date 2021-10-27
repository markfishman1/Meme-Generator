'use strict'
var gMemeId = 1;
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
var gMeme = { selectedImgId: 5, selectedLineIdx: 0, lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }] };

function getImgs() {
    return gImgs;
}