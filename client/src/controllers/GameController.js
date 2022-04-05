class GameController {
	constructor(model, view) {
		this._model = model;
		this._view = view;
		this._availableStartview = false;
		this._view.on('startButtonClicked', (event) => this.start(event));

		this._model._shipsModel.on('shipRemoved', () => this.toggleStartButton());
		this._model.on('nextTurn', (event) => this.changeStatus(event));
		this._model.on('shipDestroyed', ({ player, target }) =>
			this.changeInfo(
				`${player == 'player' ? 'Enemy' : 'Your'} ${target} ship has been destroyed!`
			)
		);
	}

	toggleStartButton() {
		const shipCount = this._model._shipsModel.getShipsCount();

		if (shipCount != 0) return;

		this._model.toggleStartButton();
		this._availableStart = true;
	}

	start(event) {
		event.preventDefault();

		if (!this._availableStart) return;

		console.log('Start game');

		this._model.setStatusText('Start game');
		this._model.nextTurn();

		this._model.toggleStartButton();
		this._availableStart = false;
	}

	stop() {
		this._availableStart = false;
	}

	isPlayerTurn() {
		if (this._model.getPlayer() == 'player') return true;
		return false;
	}

	changeStatus(statusText) {
		console.log('Status updated');
		if (!this._availableStart) return;

		if (this.isPlayerTurn()) this._model.setStatusText(statusText ? statusText : 'Your turn!');
		else this._model.setStatusText(statusText ? statusText : 'Enemy turn');
	}

	changeInfo(infoText) {
		this._model.setInfoText(infoText);
	}

	nextTurn(event) {
		console.log('Next turn');
		this._model.nextTurn();
	}

	updateScore(player, target) {
		this._model.updateScore(player, target);
	}

	shipDestroyed(event) {
		const { player, target } = event;

		this.changeInfo(
			`${player == 'player' ? 'Enemy' : 'Your'} ${target} ship has been destroyed!`
		);

		let playerScore = 0;
		let enemyScore = 0;

		this._model._playerScore.forEach(({ length }) => {
			playerScore += length;
		});

		this._model._enemyScore.forEach(({ length }) => {
			enemyScore += length;
		});

		if (!playerScore) {
			this.changeStatus('You lost!');
			this.stop();
		}
		if (!enemyScore) {
			this.changeStatus('You won!');
			this.stop();
		}
	}
}

export default GameController;
