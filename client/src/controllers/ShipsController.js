class ShipsController {
	constructor(model, view) {
		this._model = model;
		this._view = view;
		
		this._view.on('rotateShips', (event) => this.rotateShips(event));
	}

	rotateShips(event) {
		this._view.updateBoardDirection(event);
		this._model.rotateShips();
	}

	unlockStartButton(shipsCount) {
		if (shipsCount == 0)
			this._model.unlockStartButton();
	}

	start(event) {
		event.preventDefault();
		console.log('Start game');
	}
}

export default ShipsController;