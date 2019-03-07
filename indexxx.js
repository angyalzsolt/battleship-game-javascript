
// Array for the board

let board;
let ships = [];
let counter = 0;
 
const guessRowEl = document.getElementById('guessRow');
const guessColEl = document.getElementById('guessCol');
// let board;
function startGame(boardSize, shipsNum){
	resetBoard(board)
	if(isNaN(boardSize) || boardSize > 6 || isNaN(shipsNum) || shipsNum > boardSize){
		return sendMsg('Maximum battlfield size is 7 and you can set only less ships.');
	} 
	board = getBoard(boardSize);
	// console.log('Board', board.length);
	getShips(shipsNum);
	console.log(ships)
	// console.log('Ship', ship1_row, ship1_col)
	showBoard(board);
	sendMsg('Let\'s start!', `There are ${ships.length - counter} ships left.`);
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

function getShips(num){
	let x = true;
	let row;
	let col;
	let pos;
	for(let i = 0; i < num; i++){
		x = true;
		while(x){
			row = randomPos(board);
			col = randomPos(board);
			pos = [row, col];
			if(!JSON.stringify([ships]).includes(JSON.stringify([pos]))){
				ships.push([pos]);
				x = false;
			} 
		}
	}
}



const makeGuess = (row, col)=>{
	if(row === '' || col === ''){
		return sendMsg('Give both parameter');
	}
	let guess_row = parseInt(row) - 1;
	let guess_col = parseInt(col) - 1;
	let guess = [guess_row, guess_col];
	// console.log('Board length: ', board.length);
	// console.log('Row', guess_row, 'Col', guess_col);

	try{

		if(JSON.stringify(ships).includes(JSON.stringify(guess))){
			counter += 1;
				if(ships.length == counter){
					alert('Congratulations, destroyed everything');
					return resetBoard();
				};
			sendMsg('Nice job, you destroyed a ship', `There are ${ships.length - counter} ships left`);

			// alert(`Nice job, the ship was on row: ${row}, and column: ${col}`);
			board[guess[0]][guess[1]] = '@';
			showBoard(board);
		} else {
			if(guess[0] >= board.length || guess[1] >= board.length){
				sendMsg('That\s not even in the ocean.');
				return;
			} else if(board[guess[0]][guess[1]] == 'X'){
				sendMsg('You have already guessed it.');
				return;
			} else {
				sendMsg('You missed it, try again');
				board[guess[0]][guess[1]] = 'X';
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
	sendMsg('Set up your game.', 'The ships are ready.')
	board = [];
	ships = [];
	counter = 0;
}

function sendMsg(msg, count = 'Keep going'){
	const msgEl = document.getElementById('msg');
	const countEl = document.getElementById('counter');
	msgEl.innerHTML = msg;
	countEl.innerHTML = count;
}


document.querySelector('#start').addEventListener('submit', (e)=>{
	e.preventDefault();
	let size = e.target.elements.boardSize.value;
	let num  = e.target.elements.shipsNum.value;
	let g = parseInt(num); 
	let f = parseInt(size);
	startGame(f, g);
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

