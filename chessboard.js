const boardSection = document.getElementById('board-section');
const chessboard = document.createElement('div');
chessboard.setAttribute('id', 'chessboard');
const knight = document.createElement('div');
knight.setAttribute('id', 'knight-div');
knight.classList.add('default-field');
knight.setAttribute('draggable', 'true');
knight.addEventListener('dragstart', () => {
    draggedEl = event.target;
})
knight.addEventListener('dragend', () => {
    draggedEl = null;
})

const flag = document.createElement('div');
flag.setAttribute('id', 'flag-div');
flag.classList.add('default-field');
flag.setAttribute('draggable', 'true');
flag.addEventListener('dragstart', (event) => {
    draggedEl = event.target;
})
flag.addEventListener('dragend', () => {
    draggedEl = null;
})
let field;
let draggedEl = null;


for(let y = 7; y >= 0; y--){
    for (let x = 0; x < 8; x ++){
        field = document.createElement('div');
        field.classList.add('default-field');
        field.setAttribute('x-cord', `${x}`);
        field.setAttribute('y-cord', `${y}`);

        if(y === 7 && x === 7){
            field.appendChild(flag);
        }

        field.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        field.addEventListener('drop', (event) => {
            // const knight = document.getElementById('knight-div');
            event.preventDefault();
            event.target.appendChild(draggedEl);
            console.log(`X coordinate is: ${event.target.getAttribute('x-cord')}`);
            console.log(`Y coordinate it: ${event.target.getAttribute('y-cord')}`);
        });

        if ((x + y) % 2 === 0){
            field.classList.add('white-field');
        } else {
            field.classList.add('black-field');
        }

        chessboard.appendChild(field);
    }
}


chessboard.appendChild(knight);

boardSection.appendChild(chessboard);

