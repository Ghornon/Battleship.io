class BoardController {
	constructor(model, view, isPlayerGrid = true) {
		this._model = model;
		this._view = view;
		this._isPlayerGrid = isPlayerGrid;

		if (this._isPlayerGrid)
			this._view.on('droppedOnBoard', event => this.droppedOnBoard(event));
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

				console.log(square);

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
}

export default BoardController;