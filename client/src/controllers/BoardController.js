class BoardController {
	constructor(model, view, isPlayerGrid = true, gameController) {
		this._model = model;
		this._view = view;
		this._isPlayerGrid = isPlayerGrid;
		this._gameController = gameController;

		if (this._isPlayerGrid)
			this._view.on('droppedOnBoard', event => this.droppedOnBoard(event));

		if (!this._isPlayerGrid)
			this._view.on('clickedOnSquare', event => this.clickedOnSquare(event));
	}
  
	droppedOnBoard(event) {
		const shipClassName =  this._model._shipsModel.getSelectedShip().slice(0, -2);
		const shipLength = this._model._shipsModel.getShipsArray().find(ship => ship.name == shipClassName).length;
		const selectedShipIndex = this._model._shipsModel.getSelectedShip().slice(-1);
		const isHorizontal = this._model._shipsModel.getShipsDirection();

		const x = parseInt(event.target.dataset.x);
		const y = parseInt(event.target.dataset.y);

		if (isHorizontal) {
			
			if ((x - selectedShipIndex) < 0 || (x - selectedShipIndex + shipLength - 1) > 9)
				return;
			
			const squares = [];
			
			for (let i = x - selectedShipIndex; i < (x - selectedShipIndex + shipLength); i++) {
				const square = this._model.getBoard().find(square => square.x == i && square.y == y);

				if (square.isTaken)
					return;

				squares.push(square);	
			}

			squares.forEach(square => {
				const classList = square.classList;
				classList.push('taken', `${shipClassName}-container`);
				this._model.updateBoard({ x: square.x, y: square.y, isTaken: true, classList });
			});
		}

		if (!isHorizontal) {
			if ((y - selectedShipIndex) < 0 || (y - selectedShipIndex + shipLength - 1) > 9)
				return;

			const squares = [];

			for (let i = y - selectedShipIndex; i < (y - selectedShipIndex + shipLength); i++) {
				const square = this._model.getBoard().find(square => square.x == x && square.y == i);
				squares.push(square)
			}

			const taken = squares.find(square => square.isTaken == true);

			if (taken !== undefined)
				return;

			squares.forEach(square => {
				const classList = square.classList;
				classList.push('taken', `${shipClassName}-container`);
				this._model.updateBoard({ ...square, isTaken: true, classList });
			});
		}

		this._model._shipsModel.removeShip(shipClassName);
	}

	setComputerShips() {
		if (this._isPlayerGrid) 
			return;

		let isDone = false;
		const shipsArray = this._model._shipsModel.getShipsArray();
		let shipIndex = 0;
	
		while(!isDone) {
			const isHorizontal = Math.floor(Math.random() * 2);
			const x = Math.floor(Math.random() * this._model.boardWidth);
			const y = Math.floor(Math.random() * this._model.boardWidth);
	
			const shipLength = shipsArray[shipIndex].length;
	
			if (isHorizontal) {
				if (x >= 0 && (x + shipLength - 1) <= 9) {
					const squares = [];

					for (let i = x; i < (x + shipLength); i++) {
						const square = this._model.getBoard().find(square => square.x == i && square.y == y);

						squares.push(square);
					}
	
					const taken = squares.find(square => square.isTaken == true);
	
					if (taken === undefined) {
						squares.forEach(square => {
							const classList = square.classList;
							classList.push('taken', `${shipsArray[shipIndex].name}-container`);
							this._model.updateBoard({ ...square, isTaken: true, classList });
						});
						shipIndex++;
					}
				}
			}
	
			if (!isHorizontal) {
				if (y >= 0 && (y + shipLength - 1) <= 9) {
	
					const squares = [];
	
					for (let i = y; i < (y + shipLength); i++) {
						const square = this._model.getBoard().find(square => square.x == x && square.y == i);
						squares.push(square);
					}
	
					const taken = squares.find(square => square.isTaken == true);
	
					if (taken === undefined) {
						squares.forEach(square => {
							const classList = square.classList;
							classList.push('taken', `${shipsArray[shipIndex].name}-container`);
							this._model.updateBoard({ ...square, isTaken: true, classList });
						});
						shipIndex++;
					}
	
				}
			}
	
			if (shipIndex >= shipsArray.length)
				isDone = true;
	
		}
	}

	clickedOnSquare(event) {
		if (!this._gameController.isPlayerTurn())
			return;

		const isShooted = event.target.dataset.isShooted;

		if (!isShooted)
			return;

		const x = parseInt(event.target.dataset.x);
		const y = parseInt(event.target.dataset.y);

		const square = this._model.getBoard().find(square => square.x == x && square.y == y);

		const classList = square.classList;

		if (square.isTaken)
			classList.push('hit');
		else
			classList.push('miss');

		this._model.updateBoard({ ...square, isTaken: true, classList, isShooted: true })

		this._gameController.nextTurn();
	}
}

export default BoardController;