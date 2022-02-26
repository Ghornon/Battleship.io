import { GameModel, BoardModel, ShipsModel } from './models';
import { GameView, BoardView, ShipsView } from './views';
import { GameController, BoardController, ShipsController } from './controllers';
import Ship from './Ship';
// import Ship from './Ship';

const createBoard = (fieldSelector, width) => {
	const grid = [];

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < width; j++) {
			const square = document.createElement('div');
			square.dataset.x= j;
			square.dataset.y= i;
			fieldSelector.appendChild(square);
			grid.push(square);
		}
	}

	return grid;
}

const createComputerShips = (grid, boardWidth) => {
	let isDone = false;
	const shipsArray = [];
	let shipIndex = 0;

	shipsArray.push(new Ship('carrier', 5));
	shipsArray.push(new Ship('battleship', 4));
	shipsArray.push(new Ship('cruiser', 3));
	shipsArray.push(new Ship('submarine', 3));
	shipsArray.push(new Ship('destroyer', 2));

	while(!isDone) {
		const isHorizontal = Math.floor(Math.random() * 2);
		const x = Math.floor(Math.random() * boardWidth);
		const y = Math.floor(Math.random() * boardWidth);

		const shipLength = shipsArray[shipIndex].length;

		if (isHorizontal) {
			if (x >= 0 && (x + shipLength - 1) <= 9) {
				const squares = [];

				for (let i = x; i < (x + shipLength); i++) {
					const square = grid.find(square => square.dataset.x == i && square.dataset.y == y);
					squares.push(square);	
				}

				const taken = squares.find(square => square.classList.contains('taken'));

				if (taken === undefined) {
					squares.forEach(square => square.classList.add('taken', `${shipsArray[shipIndex].name}-container`));
					shipIndex++;
				}
			}
		}

		if (!isHorizontal) {
			if (y >= 0 && (y + shipLength - 1) <= 9) {

				const squares = [];

				for (let i = y; i < (y + shipLength); i++) {
					const square = grid.find(square => square.dataset.x == x && square.dataset.y == i);
					squares.push(square)
				}

				const taken = squares.find(square => square.classList.contains('taken'));

				if (taken === undefined) {
					squares.forEach(square => square.classList.add('taken', `${shipsArray[shipIndex].name}-container`));
					shipIndex++;
				}

			}
		}

		if (shipIndex >= shipsArray.length)
			isDone = true;

	}
}

class GameControl {
	constructor() {
		this.width = 10;
		this.selectedShip;
		this.isHorizontal;
	}
}

const startGame = (selectors, boardWidth) => {
	let currentPlayer = 'player';

	const enemyGrid = createBoard(selectors.enemyGrid, boardWidth);
	createComputerShips(enemyGrid, boardWidth);
};

const main = () => {
	const selectors = {
		playerGrid: document.querySelector('#battlefield--player'),
		enemyGrid: document.querySelector('#battlefield--enemy'),
		status: document.querySelector('#status'),
		info: document.querySelector('#info'),
		ships: document.querySelector('#ships'),
		startButton: document.querySelector('#start'),
		rotateButton: document.querySelector('#rotate')
	};

	let isHorizontal = true;

	//Create boards

	const boardWidth = 10;

	// Rotate ship

	/* selectors.rotateButton.addEventListener('click', event => {
		event.preventDefault();
		isHorizontal = !isHorizontal;
		selectors.ships.classList.toggle('battlefield--flex-row');
	}); */

	// Game

	const gameModel = new GameModel(10, 'player');
    const gameView = new GameView(gameModel, {
		startButton: document.querySelector('#start'),
		info: document.querySelector('#info'),
		status: document.querySelector('#status')
	});
    const gameController = new GameController(gameModel, gameView);

	// Ships

	const shipsModel = new ShipsModel();
	const shipsView = new ShipsView(shipsModel, {
		querySelector: document.querySelector('#ships'),
		rotateButton: document.querySelector('#rotate')
	});
	const shipsController = new ShipsController(shipsModel, shipsView);

	// Boards

	const playerBoardModel = new BoardModel(boardWidth, shipsModel);
    const playerBoardView = new BoardView(playerBoardModel, {
		querySelector: document.querySelector('#battlefield--player')
	});
    const playerBoardController = new BoardController(playerBoardModel, playerBoardView);

	// Ships
	
	/* 
	const shipsArray = [];
	shipsArray.push(new Ship('carrier', 5));
	shipsArray.push(new Ship('battleship', 4));
	shipsArray.push(new Ship('cruiser', 3));
	shipsArray.push(new Ship('submarine', 3));
	shipsArray.push(new Ship('destroyer', 2));

	shipsArray.forEach(ship => ship.createShip(selectors.ships));

	shipsArray.forEach(ship => ship.selector.addEventListener('mousedown', event => {
		playerBoardController.shipsArray = shipsArray;
		playerBoardController.selectedShipName = event.target.id;
		console.log(event.target.id);
	}));

	shipsArray.forEach(ship => ship.selector.addEventListener('dragstart', event => {
		playerBoardController.shipsArray = shipsArray;
		playerBoardController.draggedShip = event.target;
		console.log('target', event.target);
	})); */

}

document.addEventListener("DOMContentLoaded", main);