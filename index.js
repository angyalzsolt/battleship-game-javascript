
let row = [];
let board= []
for(let i = 0; i < 5; i++){
	row.push('O');
	board.push(row);
}
// Board
function showBoard(board){
	board.forEach((row)=>{
		// console.log(row);
		console.log(row.join(' '));
	})
}


//ship position
function randomRow(board){
	return Math.floor(Math.random() * Math.floor(board[0].length - 1));
}
function randomCol(board){
	return Math.floor(Math.random() * Math.floor(board[0].length - 1));
}

// console.log(board[0].length);
// console.log(randomRow(board));

let ship1_row = randomRow(board);
let ship1_col = randomCol(board);

let ship2_row;
let ship2_col;


let x  = true;
while(x){
	ship2_row = randomRow(board);
	ship2_col = randomCol(board);
	if(ship2_row != ship1_row && ship2_col != ship1_col){
		x = false;
	}else {
		continue
	}
}

console.log('First ship');
console.log(ship1_row);
console.log(ship1_col)

console.log('Second ship');
console.log(ship2_row);
console.log(ship2_col);

showBoard(board);

let count = 0;







// console.log(row);
// console.log(field);










// const generateBox = ()=>{
// 	let boxEl = document.createElement('div');
// 	boxEl.classList.add('box');
// 	return boxEl;
// }

// for(let i = 0; i < 20; i++){
// 	document.querySelector('.container').appendChild(generateBox());
// }