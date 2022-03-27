class GameController {
	constructor(model, view) {
		this._model = model;
		this._view = view;
		
		this._view.on('startButtonClicked', event => this.start(event));

		this._model._shipsModel.on('shipRemoved', () => this.unlockStartButton());
		this._model.on('nextTurn', event => this.changeStatus(event));
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
		this._model.setStatusText("Start game");

		this._model.nextTurn();
	}

	isPlayerTurn() {
		if (this._model.getPlayer() == 'player')
			return true;
		else 
			return false;
	}

	changeStatus() {
		console.log('Status updated');

		if (this.isPlayerTurn())
			this._model.setInfoText("Your turn!");
		else
			this._model.setInfoText("Enemy turn");
	}

	nextTurn(event) {
		console.log('Next turn');
		this._model.nextTurn();
	}
}

export default GameController;