import Ship from './Ship';

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

	const playerGrid = createBoard(selectors.playerGrid, boardWidth);

	console.log('asdaa');

	//Create ships

	const shipsArray = [];

	shipsArray.push(new Ship('carrier', 5));
	shipsArray.push(new Ship('battleship', 4));
	shipsArray.push(new Ship('cruiser', 3));
	shipsArray.push(new Ship('submarine', 3));
	shipsArray.push(new Ship('destroyer', 2));

	// Rotate ship

	selectors.rotateButton.addEventListener('click', event => {
		event.preventDefault();
		isHorizontal = !isHorizontal;
		selectors.ships.classList.toggle('battlefield--flex-row');
	});

	// Start game
	selectors.startButton.addEventListener('click', event => {
		event.preventDefault();
		if (selectors.ships.childElementCount != 0)
			return;

		startGame(selectors, boardWidth);
	});

	// Drag and drop

	let selectedShip;
	let draggedShip;

	shipsArray.forEach(ship => ship.createShip(selectors.ships));
	shipsArray.forEach(ship => ship.selector.addEventListener('mousedown', event => {
		selectedShip = event.target.id;
	}));

	shipsArray.forEach(ship => ship.selector.addEventListener('dragstart', event => {
		draggedShip = event.target;
	}));

	playerGrid.forEach(square => square.addEventListener('drop', event => {
		const shipClassName =  selectedShip.slice(0, -2);
		const shipLength = shipsArray.find(ship => ship.name == shipClassName).length;
		const selectedShipIndex = selectedShip.slice(-1);

		const x = parseInt(event.target.dataset.x);
		const y = parseInt(event.target.dataset.y);

		if (isHorizontal) {
			if ((x - selectedShipIndex) < 0 || (x - selectedShipIndex + shipLength - 1) > 9)
				return;

			const squares = [];

			for (let i = x - selectedShipIndex; i < (x - selectedShipIndex + shipLength); i++) {
				const square = playerGrid.find(square => square.dataset.x == i && square.dataset.y == y);
				squares.push(square);	
			}

			const taken = squares.find(square => square.classList.contains('taken'));

			if (taken !== undefined)
				return;

			squares.forEach(square => square.classList.add('taken', `${shipClassName}-container`));
		}

		if (!isHorizontal) {
			if ((y - selectedShipIndex) < 0 || (y - selectedShipIndex + shipLength - 1) > 9)
				return;

			const squares = [];

			for (let i = y - selectedShipIndex; i < (y - selectedShipIndex + shipLength); i++) {
				const square = playerGrid.find(square => square.dataset.x == x && square.dataset.y == i);
				squares.push(square)
			}

			const taken = squares.find(square => square.classList.contains('taken'));

			if (taken !== undefined)
				return;

			squares.forEach(square => square.classList.add('taken', `${shipClassName}-container`));
		}

		selectors.ships.removeChild(draggedShip);
	}));

	playerGrid.forEach(square => square.addEventListener('dragstart', event => event.preventDefault()));
	playerGrid.forEach(square => square.addEventListener('dragover', event => event.preventDefault()));
	playerGrid.forEach(square => square.addEventListener('dragenter', event => event.preventDefault()));
	playerGrid.forEach(square => square.addEventListener('drop', event => event.preventDefault()));
}

document.addEventListener("DOMContentLoaded", main);