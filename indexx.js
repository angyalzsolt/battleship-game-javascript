
// Array for the board

let board;
let ship1_row;
let ship1_col;

const guessRowEl = document.getElementById('guessRow');
const guessColEl = document.getElementById('guessCol');
// let board;
function startGame(size){
	if(isNaN(size) || size > 6){
		return sendMsg('Maximum battlfield size is 6.');
	} 
	board = getBoard(size);
	// console.log('Board', board.length);
	ship1_row = randomPos(board);
	ship1_col = randomPos(board);
	// console.log('Ship', ship1_row, ship1_col)
	showBoard(board);	
}	

function getBoard(num){
	return Array(num).fill('O').map(x=> Array(num).fill('O'));	
}

function showBoard(board){
	let boardEl = document.querySelector('#target');
	boardEl.innerHTML = '';
	board.forEach((row)=>{
		document.querySelector('#target').innerHTML += '<p class="field-row">'+row.join(' ')+'</p>';
	})
}

function randomPos(board){
	return Math.floor(Math.random() * Math.floor(board[0].length));
}


const makeGuess = (row, col)=>{
	if(row === '' || col === ''){
		return sendMsg('Give both parameter');
	}
	let guess_row = parseInt(row) - 1;
	let guess_col = parseInt(col) - 1;
	// console.log('Board length: ', board.length);
	// console.log('Row', guess_row, 'Col', guess_col);

	try{
		if(guess_row == ship1_row && guess_col == ship1_col){
		sendMsg('Congratulations, you destroyed the ship');
		alert(`Nice job, the ship was on row: ${row}, and column: ${col}`);
		resetBoard();
	} else {
		if(guess_row >= board.length || guess_col >= board.length){
			sendMsg('That\s not even in the ocean.');
			return
		} else if(board[guess_row][guess_col] == 'X'){
			sendMsg('You have already guessed it.');
		} else {
			sendMsg('You missed it, try again');
			board[guess_row][guess_col] = 'X';
			guessRowEl.value = '';
			guessColEl.value = '';
			guessRowEl.focus();
		}
		showBoard(board);
	}
} catch(e){
	sendMsg('Invalid input');
}

	

}

function resetBoard(){
	document.querySelector('#target').innerHTML = '<h2>Battlefield</h2>';
	guessRowEl.value = '';
	guessColEl.value = '';
	board = [];
	ship1_row = 0;
	ship1_col = 0;
}

function sendMsg(string){
	const msgEl = document.getElementById('msg');
	msgEl.innerHTML = string;
}


document.querySelector('#start').addEventListener('submit', (e)=>{
	e.preventDefault();
	let s = e.target.elements.boardSize.value;
	let f = parseInt(s)
	console.log('the type is ', typeof f, f)

	startGame(f);
})

document.querySelector('#reset').addEventListener('click', resetBoard)

document.querySelector('#guess').addEventListener('submit', (e)=>{
	e.preventDefault();
	row = e.target.elements.guessRow.value;
	col = e.target.elements.guessCol.value;
	makeGuess(row, col);
	// document.getElementById('guessRow').value = '';
	// document.getElementById('guessCol').value = '';
})


// console.log(board);
// startGame(5);
// console.log(board);
// console.log(`Ship position: ${ship1_row}, ${ship1_col}`);

