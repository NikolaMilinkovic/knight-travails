
import knightMoves from './knight-travails.js';

const boardSection = document.getElementById('board-section');
const chessboard = document.createElement('div');
chessboard.setAttribute('id', 'chessboard');
const knight = document.createElement('div');
knight.setAttribute('id', 'knight-div');
knight.classList.add('default-field');
knight.setAttribute('draggable', 'true');

let knightX = 0;
let knightY = 0;
let flagX = 7;
let flagY = 7;
let jumpCount = 0;

const flag = document.createElement('div');
flag.setAttribute('id', 'flag-div');
flag.classList.add('default-field');
flag.setAttribute('draggable', 'true');

// EVENT LISTENERS
flag.addEventListener('dragstart', getDragEl);
flag.addEventListener('dragend', dropEl);
knight.addEventListener('dragstart', getDragEl);
knight.addEventListener('dragend', dropEl);

function getDragEl(){
    draggedEl = event.target;
}
function dropEl(){
    draggedEl = null;
}

// MOBILE PHONE EVENT LISTENERS > Provided by good old pal chat gipity
// TO-DO: Go through the code, understand the logic and learn how to do
// drag and drop event listeners for mobile phone
let startX = 0;
let startY = 0;

flag.addEventListener('touchstart', onTouchStart);
knight.addEventListener('touchstart', onTouchStart);
document.addEventListener('touchmove', onTouchMove, { passive: false });
document.addEventListener('touchend', onTouchEnd);

function onTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    getDragEl(event);
}
function onTouchMove(event) {
    event.preventDefault();
    if (draggedEl) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        draggedEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
}
function onTouchEnd(event) {
    if (draggedEl) {
        draggedEl.style.transform = 'none';
        const touch = event.changedTouches[0];
        const targetField = document.elementFromPoint(touch.clientX, touch.clientY);
        if (targetField && targetField.classList.contains('default-field')) {
            targetField.appendChild(draggedEl);
            if (draggedEl === knight) {
                knightX = targetField.getAttribute('x-cord');
                knightY = targetField.getAttribute('y-cord');
            } else if (draggedEl === flag) {
                flagX = targetField.getAttribute('x-cord');
                flagY = targetField.getAttribute('y-cord');
            }
            getPath();
        }
    }
    draggedEl = null;
}
// \MOBILE PHONE EVENT LISTENERS



let field;
let draggedEl = null;
let path;

for(let y = 7; y >= 0; y--){
    for (let x = 0; x < 8; x ++){
        field = document.createElement('div');
        field.classList.add('default-field');
        field.setAttribute('x-cord', `${x}`);
        field.setAttribute('y-cord', `${y}`);

        if(y === 7 && x === 7){
            field.appendChild(flag);
        } 
        if (y === 0 && x === 0){
            field.appendChild(knight);
        }

        field.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        field.addEventListener('drop', (event) => {
            // const knight = document.getElementById('knight-div');
            event.preventDefault();
            if (draggedEl) {
                event.target.appendChild(draggedEl);
                if(draggedEl === knight){
                    knightX = event.target.getAttribute('x-cord');
                    knightY = event.target.getAttribute('y-cord');
                    getPath();
                }
                if(draggedEl === flag){
                    flagX = event.target.getAttribute('x-cord');
                    flagY = event.target.getAttribute('y-cord');
                    getPath();
                }
            }

        });

        if ((x + y) % 2 === 0){
            field.classList.add('white-field');
        } else {
            field.classList.add('black-field');
        }

        chessboard.appendChild(field);
    }
}

function getPath(){
    const fields = chessboard.querySelectorAll('div');
    fields.forEach(field => {
        field.classList.remove('jump-field');
        const paras = field.querySelectorAll('para');
        paras.forEach(para => {
            para.remove();
        });
    })
    jumpCount = 0;

    path = knightMoves([parseInt(knightX),parseInt(knightY)],[parseInt(flagX),parseInt(flagY)]);

    path.flat().forEach(cord => {
        if(cord[0] === parseInt(knightX) && cord[1] === parseInt(knightY)) return;
        if(cord[0] === parseInt(flagX) && cord[1] === parseInt(flagY)) return

        const field = document.querySelector(`[y-cord="${cord[1]}"][x-cord="${cord[0]}"]`);

        if (field) {
            field.classList.add('jump-field');
            const para = document.createElement('para');
            jumpCount++;
            para.innerHTML = `${jumpCount}`;
            field.appendChild(para);
        }
    });
}

boardSection.appendChild(chessboard);

