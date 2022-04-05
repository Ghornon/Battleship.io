import EventEmitter from '../EventEmitter';

class GameModel extends EventEmitter {
	constructor(width = 10, shipsModel, player = null) {
		super();
		this._width = width;
		this._infoText = '';
		this._statusText = '';
		this._player = player;
		this._startButtonDisabled = true;
		this._shipsModel = shipsModel;

		const shipsScore = this._shipsModel.getShipsArray();

		this._playerScore = shipsScore;
		this._enemyScore = shipsScore;
	}

	getWidth() {
		return this._width;
	}

	getInfoText() {
		return this._infoText;
	}

	setInfoText(text) {
		this._infoText = text;
		this.emit('infoTextSet', this._infoText);
	}

	getStatusText() {
		return this._statusText;
	}

	setStatusText(text) {
		this._statusText = text;
		this.emit('statusTextSet', this._statusText);
	}

	getPlayer() {
		return this._player;
	}

	nextTurn() {
		if (this._player == 'player') this._player = 'enemy';
		else this._player = 'player';

		this.emit('nextTurn');
	}

	toggleStartButton() {
		this._startButtonDisabled = !this._startButtonDisabled;
		this.emit('toggleStartButton');
	}

	updateScore(player, target) {
		let score = [];
		if (player == 'player') score = this._playerScore;
		else score = this._enemyScore;

		const newScore = score.map(({ name, length }) => {
			console.log(name == target, name, target, length);
			if (name == target) {
				if (length - 1 <= 0) {
					console.log('shipDestroyed', { player, target });
					this.emit('shipDestroyed', { player, target });
				}
				return { name, length: length - 1 };
			}

			return { name, length };
		});

		if (player == 'player') this._playerScore = newScore;
		else this._enemyScore = newScore;

		this.emit('scoreUpdated');
	}
}

export default GameModel;
