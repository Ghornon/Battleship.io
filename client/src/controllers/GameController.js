class GameController {
	constructor(model, view) {
		this._model = model;
		this._view = view;
		
		this._view.on('startButtonClicked', event => this.start(event));
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

export default GameController;