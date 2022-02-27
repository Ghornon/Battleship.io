class GameController {
	constructor(model, view) {
		this._model = model;
		this._view = view;
		
		this._view.on('startButtonClicked', event => this.start(event));

		this._model._shipsModel.on('shipRemoved', () => this.unlockStartButton());
	}

	unlockStartButton() {
		const shipCount = this._model._shipsModel.getShipsCount();

		if (shipCount != 0)
			return;

		this._view.unlockStartButton();
	}

	start(event) {
		event.preventDefault();
		console.log('Start game');
	}
}

export default GameController;